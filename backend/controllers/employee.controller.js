import { createEmployee,getAllEmployees } from "../services/employee.service.js";

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
