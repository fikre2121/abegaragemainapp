import { loginEmployee} from "../services/auth.service.js";
import { getEmployeeById } from "../services/employee.service.js";

/**
 * Express controller to handle employee login.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const login = async (req, res) => {
  try {
    const { employee_email, employee_password } = req.body;

    // Validate request
    if (!employee_email || !employee_password) {
      return res.status(400).json({
        success: false,
        message: "Employee email and password are required.",
      });
    }

    // Authenticate user
    const result = await loginEmployee(employee_email, employee_password);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: result,
    });
  } catch (error) {
    console.error("[Login Controller]", error);

    switch (error.message) {
      case "INVALID_CREDENTIALS":
        return res.status(401).json({
          success: false,
          message: "Invalid email or password.",
        });

      case "ACCOUNT_INACTIVE":
        return res.status(403).json({
          success: false,
          message:
            "Your account has been deactivated. Please contact an administrator.",
        });

      default:
        return res.status(500).json({
          success: false,
          message: "An unexpected server error occurred.",
        });
    }
  }
};

export const getCurrentEmployee = async (req, res) => {
  try {
    // Added by verifyToken middleware
    const employeeId = req.user.employee_id;

    const employee = await getEmployeeById(employeeId);

    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    console.error("[Controller Error] getCurrentEmployee:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to retrieve authenticated employee profile.",
    });
  }
};