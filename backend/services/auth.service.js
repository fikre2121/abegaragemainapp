import db from '../config/db.config.js'; 
import bcrypt from 'bcrypt'; 
import { generateToken } from '../utils/jwt.js'; 

/**
 * Authenticates an employee and returns a JWT token.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<Object>} Token and basic employee details
 */
export const loginEmployee = async (email, password) => {
  try {
    // 1. Fetch employee status and ID
    const [employees] = await db.query(
      'SELECT employee_id, employee_email, active_employee FROM employee WHERE employee_email = ?', 
      [email]
    );

    // Generic error message prevents user enumeration attacks
    if (employees.length === 0 || employees[0].active_employee !== 1) {
      throw new Error('Invalid email or password');
    }

    const employee = employees[0];

    // 2. Fetch the hashed password safely
    const [passwordRows] = await db.query(
      'SELECT employee_password_hashed FROM employee_pass WHERE employee_id = ?', 
      [employee.employee_id]
    );

    if (passwordRows.length === 0) {
      throw new Error('Invalid email or password');
    }

    // 3. Verify password
    const passwordMatch = await bcrypt.compare(
      password, 
      passwordRows[0].employee_password_hashed
    );

    if (!passwordMatch) {
      throw new Error('Invalid email or password');
    }

    // 4. Generate token and return data
    const token = generateToken(employee);

    return { 
      token, 
      employee_id: employee.employee_id, 
      email: employee.employee_email 
    };

  } catch (error) {
    // Log the actual error internally for debugging, rethrow a clean message for the user
    console.error(`Login failed for ${email}:`, error.message);
    throw new Error(error.message || 'Authentication failed');
  }
};
