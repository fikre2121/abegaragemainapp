import { loginEmployee } from "../services/auth.service.js";

/**
 * Express controller to handle employee login.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const login = async (req, res) => {

  try {
    const { employee_email, employee_password } = req.body;

    // 1. Fail-fast validation (Prevents wasting database resources)
    if (!employee_email || !employee_password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // 2. Call service layer logic
    const result = await loginEmployee(employee_email, employee_password);

    // 3. Return structured success response
    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    // 4. Log the full error internally for system administrators
    console.error("Login Controller Error:", error);

    // 5. Context-aware error status mapping
    if (
      error.message === "Invalid email or password" ||
      error.message === "Account inactive"
    ) {
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }

    // 6. Generic fallback prevents internal system leakages on 500 errors
    return res.status(500).json({
      success: false,
      message: "An unexpected internal server error occurred.",
    });
  }
};
