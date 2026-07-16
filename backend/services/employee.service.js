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
// get seingle employee
export const getEmployeeById = async (employeeId) => {
  // 1. Guard Clause: Enforce explicit numerical boundary type validation upfront
  const sanitizedId = parseInt(employeeId, 10);
  if (Number.isNaN(sanitizedId) || sanitizedId <= 0) {
    throw new Error("Invalid employee ID configuration provided.");
  }

  try {
    // 2. Query execution pulling specific profile columns AND role mappings cleanly
    const [employees] = await db.query(
      `SELECT 
        e.employee_id, 
        e.employee_email, 
        e.active_employee, 
        e.added_date, 
        ei.employee_first_name, 
        ei.employee_last_name, 
        ei.employee_phone,
        cr.company_role_id,
        cr.company_role_name
      FROM employee e 
      LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id 
      LEFT JOIN employee_role er ON e.employee_id = er.employee_id
      LEFT JOIN company_roles cr ON er.company_role_id = cr.company_role_id
      WHERE e.employee_id = ? 
      LIMIT 1`,
      [sanitizedId],
    );

    // 3. Return not found error context explicitly if array bounds are empty
    if (!employees || employees.length === 0) {
      throw new Error("EMPLOYEE_NOT_FOUND");
    }

    // 4. Return the single record element
    return employees[0];
  } catch (error) {
    // Log the true detailed system signature securely to internal application terminal monitors
    console.error(
      `[Service Error] getEmployeeById failure on ID ${sanitizedId}:`,
      error.message,
    );

    // If it's a known business logic validation exception, rethrow it verbatim for the controller
    if (error.message === "EMPLOYEE_NOT_FOUND") {
      throw new Error(
        "The requested employee profile does not exist or has been deleted.",
      );
    }

    // Shield your database schema: Abstract raw system/SQL bugs into a secure fallback message
    throw new Error(
      "Failed to retrieve employee profile specifications. Please try again later.",
    );
  }
};


// to eddit the employee
export const updateEmployee = async (employeeId, employeeData) => {
  // 1. Guard Clause: Enforce strict numerical validation boundaries
  const sanitizedId = parseInt(employeeId, 10);
  if (Number.isNaN(sanitizedId) || sanitizedId <= 0) {
    throw new Error("INVALID_EMPLOYEE_ID");
  }

  // Request a clean dedicated database client connection state from the pool
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // 2. Fetch current active data rows safely INSIDE the active transaction block
    const [currentRows] = await connection.query(
      `SELECT e.active_employee, ei.employee_first_name, ei.employee_last_name, ei.employee_phone, er.company_role_id
       FROM employee e
       LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id
       LEFT JOIN employee_role er ON e.employee_id = er.employee_id
       WHERE e.employee_id = ? LIMIT 1 FOR UPDATE`, // 'FOR UPDATE' locks the row safely during multi-user modifications
      [sanitizedId],
    );

    if (!currentRows || currentRows.length === 0) {
      throw new Error("EMPLOYEE_NOT_FOUND");
    }

    const currentData = currentRows[0];

    // 3. Null-Safe Coalesce Patching: Fallback to existing data if frontend updates omit optional fields
    const active_employee =
      employeeData.active_employee !== undefined
        ? employeeData.active_employee
        : currentData.active_employee;
    const employee_first_name =
      employeeData.employee_first_name !== undefined
        ? employeeData.employee_first_name
        : currentData.employee_first_name;
    const employee_last_name =
      employeeData.employee_last_name !== undefined
        ? employeeData.employee_last_name
        : currentData.employee_last_name;
    const employee_phone =
      employeeData.employee_phone !== undefined
        ? employeeData.employee_phone
        : currentData.employee_phone;
    const company_role_id =
      employeeData.company_role_id !== undefined
        ? employeeData.company_role_id
        : currentData.company_role_id;

    // 4. Execution Step A: Modify core employee row table parameters
    await connection.query(
      "UPDATE employee SET active_employee = ? WHERE employee_id = ?",
      [active_employee, sanitizedId],
    );

    // 5. Execution Step B: Modify metadata profile records safely
    await connection.query(
      `UPDATE employee_info 
       SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? 
       WHERE employee_id = ?`,
      [employee_first_name, employee_last_name, employee_phone, sanitizedId],
    );

    // 6. Execution Step C: Dynamically patch or insert role assignments
    if (company_role_id) {
      await connection.query(
        `INSERT INTO employee_role (employee_id, company_role_id) 
         VALUES (?, ?) 
         ON DUPLICATE KEY UPDATE company_role_id = ?`,
        [sanitizedId, company_role_id, company_role_id],
      );
    }

    // Secure database updates permanently
    await connection.commit();
    return { employee_id: sanitizedId };
  } catch (error) {
    // Safely undo database alterations to maintain ecosystem integrity on unexpected system network crashes
    await connection.rollback();
    console.error(
      `[Service Error] updateEmployee failure on ID ${sanitizedId}:`,
      error.message,
    );

    if (
      error.message === "EMPLOYEE_NOT_FOUND" ||
      error.message === "INVALID_EMPLOYEE_ID"
    ) {
      throw error;
    }
    throw new Error(
      "Internal transaction failure. Unable to update employee records.",
    );
  } finally {
    // Always release client resources back to the server pool to avoid application performance deadlocks
    connection.release();
  }
};
