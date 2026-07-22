import db from "../config/db.config.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

/**
 * Authenticate an employee and generate a JWT.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
export const loginEmployee = async (email, password) => {
  try {
    // 1. Retrieve employee, password hash and role in a single query
    const [rows] = await db.query(
      `SELECT
          e.employee_id,
          e.employee_email,
          e.active_employee,
          ep.employee_password_hashed,
          ei.employee_first_name,
          ei.employee_last_name,
          ei.employee_phone,
          cr.company_role_id,
          cr.company_role_name
       FROM employee e
       INNER JOIN employee_pass ep
            ON e.employee_id = ep.employee_id
       LEFT JOIN employee_info ei
            ON e.employee_id = ei.employee_id
       LEFT JOIN employee_role er
            ON e.employee_id = er.employee_id
       LEFT JOIN company_roles cr
            ON er.company_role_id = cr.company_role_id
       WHERE e.employee_email = ?
       LIMIT 1`,
      [email],
    );

    // 2. Check whether the account exists
    if (rows.length === 0) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const employee = rows[0];

    // 3. Check whether the account is active
    if (employee.active_employee !== 1) {
      throw new Error("ACCOUNT_INACTIVE");
    }

    // 4. Verify password
    const passwordMatch = await bcrypt.compare(
      password,
      employee.employee_password_hashed,
    );

    if (!passwordMatch) {
      throw new Error("INVALID_CREDENTIALS");
    }

    // 5. Generate JWT
    const token = generateToken(employee);

    // 6. Never expose password hashes
    delete employee.employee_password_hashed;

    // 7. Return authentication payload
    return {
      token,
      employee,
    };
  } catch (error) {
    console.error("[Auth Service] Login failed:", error.message);

    if (
      error.message === "INVALID_CREDENTIALS" ||
      error.message === "ACCOUNT_INACTIVE"
    ) {
      throw error;
    }

    throw new Error("LOGIN_FAILED");
  }
};
