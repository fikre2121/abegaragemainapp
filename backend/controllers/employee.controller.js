import { createEmployee,getAllEmployees,getEmployeeById } from "../services/employee.service.js";

export const addEmployee = async (req, res) => {

  try {

    const employee = await createEmployee(req.body);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    // 1. Sanitize input parameters upfront with robust production defaults
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    // 2. Call service layer logic with sanitized inputs
    const result = await getAllEmployees({ page, limit });

    // 3. Return a consistent, predictable success structure
    return res.status(200).json({
      success: true,
      data: result.employees,
      pagination: result.pagination,
    });
  } catch (error) {
    // 4. Log raw system errors internally for developer tracking
    console.error("Error in getEmployees controller:", error.message);

    // 5. Hide database/system internals from front-end consumers
    return res.status(500).json({
      success: false,
      message: error.message || "An unexpected internal server error occurred.",
    });
  }
};


/**
 * Express controller to fetch a single employee by their URL path ID parameters.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Fail-fast parameter validation in the controller layer
    if (!id || isNaN(id) || parseInt(id, 10) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing employee ID configuration parameter.",
      });
    }

    // 2. Execute service logic layer lookup query
    const employee = await getEmployeeById(id);

    // 3. Return uniform structured data payload object
    return res.status(200).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    // 4. Log detailed trace to server runtime consoles
    console.error(
      `[Controller Error] getEmployee exception handling route /:id :`,
      error.message,
    );

    // 5. Context-aware error status mapping using structural strings instead of vague matching text
    if (
      error.message.includes("does not exist") ||
      error.message.includes("not exist")
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message.includes("Invalid employee ID")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // 6. Secure corporate fallback prevents unexpected code bug details from leaking out
    return res.status(500).json({
      success: false,
      message:
        "An internal server error occurred while retrieving the employee file.",
    });
  }
};
