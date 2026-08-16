import apiClient from "./axios.instance.js";

/**
 * Sends credentials to the login route.
 * @param {Object} credentials - Contains { email, password }
 */
export const loginRequest = async (credentials) => {
  return apiClient.post("/auth/login", credentials);
};

// me endpoint
export const getCurrentEmployee = async () => {
  return apiClient.get("/auth/me");
};
/**
 * Optional example: Fetches protected profile details
 */
export const addEmployee = async (employeeData) => {
  return apiClient.post("/employees", employeeData);
};
// Fetches the protected paginated employee list
export const getAllEmployees = async ({ page = 1, limit = 10 } = {}) => {
  return apiClient.get(`/employees?page=${page}&limit=${limit}`);
};

// get singele employee

export const getSingleEmployee = async (employeeId) => {
  return apiClient.get(`/employees/${employeeId}`);
};
// eddit empoyeee
export const updateEmployee = async (employeeId, updatedData) => {
  return apiClient.put(`/employees/${employeeId}`, updatedData);
};

// **********//    SERVICES API       //******* */



/**
 * Creates a new service.
 */
export const addService = async (serviceData) => {
  return apiClient.post("/service", serviceData);
};

/**
 * Retrieves all active services.
 */
export const getAllServices = async () => {
  return apiClient.get("/services");
};


/**
 * Updates an existing service.
 */
export const updateService = async (serviceData) => {
  return apiClient.put("/service", serviceData);
};

/**
 * Deactivates a service.
 */
export const deleteService = async (serviceId) => {
  return apiClient.delete(`/service/${serviceId}`);
};