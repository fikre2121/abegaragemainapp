import {
  getAllServices,
  createService,
  updateService,
  deactivateService,
} from "../services/service.service.js";

export const getServices = async (req, res) => {
  try {
    // 1. Execute service logic layer lookup query
    const services = await getAllServices();

    // 2. Return uniform structured data payload object
    return res.status(200).json({
      success: true,
      data: services,
      count: services.length,
    });
  } catch (error) {
    // 3. Log detailed trace to server runtime console
    console.error(
      `[Controller Error] getServices exception handling route /services:`,
      error.message,
    );

    // 4. Secure corporate fallback prevents unexpected
    //    database/system details from leaking to clients
    return res.status(500).json({
      success: false,
      message:
        "An internal server error occurred while retrieving the service records.",
    });
  }
};

export const addService = async (req, res) => {
  try {
    const { service_name, service_description } = req.body;

    // 1. Fail-fast request body validation
    if (!service_name) {
      return res.status(400).json({
        success: false,
        message: "Service name is required.",
      });
    }

    // 2. Validate service name type
    if (typeof service_name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Service name must be a valid string.",
      });
    }

    // 3. Validate description type when provided
    if (
      service_description !== undefined &&
      service_description !== null &&
      typeof service_description !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Service description must be a valid string.",
      });
    }

    // 4. Execute service logic layer creation
    const service = await createService({
      serviceName: service_name,
      serviceDescription: service_description,
    });

    // 5. Return successful creation response
    return res.status(201).json({
      success: true,
      message: "Service created successfully.",
      data: service,
    });
  } catch (error) {
    // 6. Log detailed controller error internally
    console.error(
      `[Controller Error] addService exception handling route /service:`,
      error.message,
    );

    // 7. Map known validation errors
    if (
      error.message.includes("Service name") ||
      error.message.includes("Service description")
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // 8. Secure fallback for unexpected errors
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while creating the service.",
    });
  }
};

export const editService = async (req, res) => {
  try {
    const { service_id, service_name, service_description, active_service } =
      req.body;

    // 1. Fail-fast service ID validation
    if (!service_id || isNaN(service_id) || parseInt(service_id, 10) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing service ID configuration parameter.",
      });
    }

    // 2. Validate service name
    if (!service_name) {
      return res.status(400).json({
        success: false,
        message: "Service name is required.",
      });
    }

    if (typeof service_name !== "string") {
      return res.status(400).json({
        success: false,
        message: "Service name must be a valid string.",
      });
    }

    // 3. Validate description when provided
    if (
      service_description !== undefined &&
      service_description !== null &&
      typeof service_description !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message: "Service description must be a valid string.",
      });
    }

    // 4. Validate active status when provided
    if (
      active_service !== undefined &&
      active_service !== true &&
      active_service !== false
    ) {
      return res.status(400).json({
        success: false,
        message: "Active service status must be a boolean value.",
      });
    }

    // 5. Execute service update
    const service = await updateService({
      serviceId: service_id,
      serviceName: service_name,
      serviceDescription: service_description,
      activeService: active_service,
    });

    // 6. Return successful response
    return res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      data: service,
    });
  } catch (error) {
    // 7. Log detailed controller error
    console.error(
      `[Controller Error] editService exception handling route /service:`,
      error.message,
    );

    // 8. Not-found mapping
    if (
      error.message.includes("does not exist") ||
      error.message.includes("deleted")
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    // 9. Validation mapping
    if (
      error.message.includes("Invalid service ID") ||
      error.message.includes("Service name") ||
      error.message.includes("Active service")
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // 10. Secure fallback
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred while updating the service.",
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Fail-fast ID validation
    if (!id || isNaN(id) || parseInt(id, 10) <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or missing service ID configuration parameter.",
      });
    }

    // 2. Deactivate service
    const service = await deactivateService(id);

    // 3. Return successful response
    return res.status(200).json({
      success: true,
      message: "Service deactivated successfully.",
      data: service,
    });
  } catch (error) {
    // 4. Log controller error
    console.error(
      `[Controller Error] deleteService exception handling route /:id:`,
      error.message,
    );

    // 5. Not-found mapping
    if (
      error.message.includes("does not exist") ||
      error.message.includes("deleted")
    ) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    // 6. Invalid ID mapping
    if (error.message.includes("Invalid service ID")) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    // 7. Secure fallback
    return res.status(500).json({
      success: false,
      message:
        "An internal server error occurred while deactivating the service.",
    });
  }
};