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