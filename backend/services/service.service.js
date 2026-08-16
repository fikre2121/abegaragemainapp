import db from "../config/db.config.js";

export const getAllServices = async () => {
  try {
    // 1. Query execution: Retrieve only active services
    const [services] = await db.query(
      `SELECT
        service_id,
        service_name,
        service_description,
        active_service
      FROM common_services
      WHERE active_service = TRUE
      ORDER BY service_name ASC`,
    );

    // 2. Return the complete active service collection
    return services;
  } catch (error) {
    // 3. Log detailed internal database error
    console.error(
      `[Service Error] getAllServices database failure:`,
      error.message,
    );

    // 4. Shield database/system details from API consumers
    throw new Error(
      "Failed to retrieve service records. Please try again later.",
    );
  }
};

export const createService = async ({ serviceName, serviceDescription }) => {
  // 1. Guard Clause: Validate required service name
  if (!serviceName || typeof serviceName !== "string") {
    throw new Error("Service name is required and must be a valid string.");
  }

  // 2. Normalize user input before database operation
  const sanitizedServiceName = serviceName.trim();
  const sanitizedServiceDescription =
    typeof serviceDescription === "string" ? serviceDescription.trim() : null;

  // 3. Enforce meaningful service name
  if (sanitizedServiceName.length === 0) {
    throw new Error("Service name cannot be empty.");
  }

  // 4. Enforce database column boundary
  if (sanitizedServiceName.length > 255) {
    throw new Error("Service name cannot exceed 255 characters.");
  }

  try {
    // 5. Insert the new service into the database
    // active_service is intentionally omitted because
    // the database DEFAULT TRUE makes new services active.
    const [result] = await db.query(
      `INSERT INTO common_services (
        service_name,
        service_description
      )
      VALUES (?, ?)`,
      [sanitizedServiceName, sanitizedServiceDescription],
    );

    // 6. Verify that the database actually created the record
    if (!result || result.affectedRows !== 1) {
      throw new Error("SERVICE_CREATION_FAILED");
    }

    // 7. Return the newly generated service ID
    return {
      service_id: result.insertId,
    };
  } catch (error) {
    // 8. Log detailed internal database error
    console.error(
      `[Service Error] createService database failure:`,
      error.message,
    );

    // 9. Preserve known application-level creation error
    if (error.message === "SERVICE_CREATION_FAILED") {
      throw new Error("The service could not be created. Please try again.");
    }

    // 10. Shield raw database/system details
    throw new Error(
      "Failed to create the service record. Please try again later.",
    );
  }
};
export const updateService = async ({
  serviceId,
  serviceName,
  serviceDescription,
  activeService,
}) => {
  // 1. Guard Clause: Validate service ID
  const sanitizedId = parseInt(serviceId, 10);

  if (Number.isNaN(sanitizedId) || sanitizedId <= 0) {
    throw new Error("Invalid service ID configuration provided.");
  }

  // 2. Validate service name
  if (!serviceName || typeof serviceName !== "string") {
    throw new Error("Service name is required and must be a valid string.");
  }

  // 3. Sanitize input values
  const sanitizedServiceName = serviceName.trim();

  const sanitizedServiceDescription =
    typeof serviceDescription === "string" ? serviceDescription.trim() : null;

  // 4. Enforce service name boundaries
  if (sanitizedServiceName.length === 0) {
    throw new Error("Service name cannot be empty.");
  }

  if (sanitizedServiceName.length > 255) {
    throw new Error("Service name cannot exceed 255 characters.");
  }

  // 5. Validate active service flag
  if (
    activeService !== undefined &&
    activeService !== true &&
    activeService !== false
  ) {
    throw new Error("Active service status must be a boolean value.");
  }

  try {
    // 6. Check that the service exists before updating
    const [existingServices] = await db.query(
      `SELECT service_id
       FROM common_services
       WHERE service_id = ?
       LIMIT 1`,
      [sanitizedId],
    );

    if (!existingServices || existingServices.length === 0) {
      throw new Error("SERVICE_NOT_FOUND");
    }

    // 7. Build update query
    const [result] = await db.query(
      `UPDATE common_services
       SET
         service_name = ?,
         service_description = ?,
         active_service = COALESCE(?, active_service)
       WHERE service_id = ?`,
      [
        sanitizedServiceName,
        sanitizedServiceDescription,
        activeService,
        sanitizedId,
      ],
    );

    // 8. Verify that the update operation completed
    if (!result) {
      throw new Error("SERVICE_UPDATE_FAILED");
    }

    // 9. Return the updated service ID
    return {
      service_id: sanitizedId,
    };
  } catch (error) {
    // 10. Log detailed internal error
    console.error(
      `[Service Error] updateService failure on ID ${sanitizedId}:`,
      error.message,
    );

    // 11. Known business error
    if (error.message === "SERVICE_NOT_FOUND") {
      throw new Error(
        "The requested service profile does not exist or has been deleted.",
      );
    }

    if (error.message === "SERVICE_UPDATE_FAILED") {
      throw new Error("The service could not be updated. Please try again.");
    }

    // 12. Preserve validation errors
    if (
      error.message.includes("Invalid service ID") ||
      error.message.includes("Service name") ||
      error.message.includes("Active service")
    ) {
      throw error;
    }

    // 13. Secure database fallback
    throw new Error(
      "Failed to update the service record. Please try again later.",
    );
  }
};

export const deactivateService = async (serviceId) => {
  // 1. Guard Clause: Validate service ID
  const sanitizedId = parseInt(serviceId, 10);

  if (Number.isNaN(sanitizedId) || sanitizedId <= 0) {
    throw new Error("Invalid service ID configuration provided.");
  }

  try {
    // 2. Check that the service exists
    const [services] = await db.query(
      `SELECT service_id
       FROM common_services
       WHERE service_id = ?
       LIMIT 1`,
      [sanitizedId],
    );

    if (!services || services.length === 0) {
      throw new Error("SERVICE_NOT_FOUND");
    }

    // 3. Deactivate instead of physically deleting
    const [result] = await db.query(
      `UPDATE common_services
       SET active_service = FALSE
       WHERE service_id = ?`,
      [sanitizedId],
    );

    // 4. Verify update
    if (!result || result.affectedRows !== 1) {
      throw new Error("SERVICE_DEACTIVATION_FAILED");
    }

    // 5. Return affected service
    return {
      service_id: sanitizedId,
      active_service: false,
    };
  } catch (error) {
    // 6. Log internal error
    console.error(
      `[Service Error] deactivateService failure on ID ${sanitizedId}:`,
      error.message,
    );

    // 7. Known not-found error
    if (error.message === "SERVICE_NOT_FOUND") {
      throw new Error(
        "The requested service profile does not exist or has been deleted.",
      );
    }

    // 8. Known update failure
    if (error.message === "SERVICE_DEACTIVATION_FAILED") {
      throw new Error(
        "The service could not be deactivated. Please try again.",
      );
    }

    // 9. Secure fallback
    throw new Error(
      "Failed to deactivate the service record. Please try again later.",
    );
  }
};