import apiClient from "./axios.instance.js";

/**
 * Sends credentials to the login route.
 * @param {Object} credentials - Contains { email, password }
 */
export const loginRequest = async (credentials) => {
  return apiClient.post("/auth/login", credentials);
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