import db from "../config/db.config.js";
import bcrypt from "bcrypt";

/**
 * Creates a new employee across multiple relational tables within a transaction.
 * @param {Object} employeeData - The raw registration payload.
 * @returns {Promise<Object>} The newly created employee ID.
 */
export const createEmployee = async (employeeData) => {
  // 1. Guard Clause: Validate required fields before opening database connections
  const {
    employee_email,
    employee_first_name,
    employee_last_name,
    employee_phone,
    employee_password,
    company_role_id,
  } = employeeData || {};

  if (!employee_email || !employee_password || !company_role_id) {
    throw new Error("Missing required registration fields");
  }

  // 2. Check for duplicate email upfront to prevent wasting transaction resources
  const [existing] = await db.query(
    "SELECT employee_id FROM employee WHERE employee_email = ? LIMIT 1",
    [employee_email],
  );
  if (existing.length > 0) {
    throw new Error("An account with this email already exists");
  }

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 3. Securely hash password (Work factor 10 is standard)
    const hashedPassword = await bcrypt.hash(employee_password, 10);

    // 4. Insert into 'employee' main table
    const [employeeResult] = await connection.query(
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)",
      [employee_email, 1],
    );

    const employeeId = employeeResult.insertId;

    // 5. Insert into 'employee_info' table
    await connection.query(
      `INSERT INTO employee_info 
        (employee_id, employee_first_name, employee_last_name, employee_phone) 
       VALUES (?, ?, ?, ?)`,
      [
        employeeId,
        employee_first_name || null,
        employee_last_name || null,
        employee_phone || null,
      ],
    );

    // 6. Insert into 'employee_pass' table
    await connection.query(
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)",
      [employeeId, hashedPassword],
    );

    // 7. Insert into 'employee_role' table
    await connection.query(
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)",
      [employeeId, company_role_id],
    );

    await connection.commit();

    return { employee_id: employeeId };
  } catch (error) {
    // Safely rollback changes if any query fails
    await connection.rollback();

    // Log the true system error internally for developers
    console.error("Employee creation failed:", error.message);

    // Abstract the error before sending it to the user
    throw new Error("Failed to create employee profile. Please try again.");
  } finally {
    // Always return the connection back to the pool
    connection.release();
  }
};
// get All employees
export const getAllEmployees = async ({ page = 1, limit = 50 } = {}) => {
  // 1. Enforce strict numerical bounds to eliminate memory overflow risks
  const sanitizedLimit = Math.min(Math.max(parseInt(limit, 10) || 50, 1), 100);
  const sanitizedPage = Math.max(parseInt(page, 10) || 1, 1);
  const offset = (sanitizedPage - 1) * sanitizedLimit;

  try {
    // 2. Compute total row records dynamically to support dashboard page layouts
    const [countRows] = await db.query(
      "SELECT COUNT(*) AS total FROM employee",
    );
    const totalRecords = countRows[0]?.total || 0;

    // 3. Utilize LEFT JOIN so master records render even if subprofile tables are missing rows
    const [employees] = await db.query(
      `SELECT 
        e.employee_id,
        e.employee_email,
        e.active_employee,
        e.added_date,
        ei.employee_first_name,
        ei.employee_last_name,
        ei.employee_phone
      FROM employee e
      LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id
      ORDER BY e.employee_id DESC
      LIMIT ? OFFSET ?`,
      [sanitizedLimit, offset],
    );

    // 4. Return structural dashboard-ready payload metadata
    return {
      employees,
      pagination: {
        total_records: totalRecords,
        current_page: sanitizedPage,
        per_page: sanitizedLimit,
        total_pages: Math.ceil(totalRecords / sanitizedLimit),
      },
    };
  } catch (error) {
    // Securely record raw system error strings internally for administrators
    console.error(
      "Database lookup failure inside getAllEmployees:",
      error.message,
    );

    // Abstract the error text to prevent system signature leakage down to client ports
    throw new Error(
      "Unable to retrieve employee registry profiles. Please try again.",
    );
  }
};
