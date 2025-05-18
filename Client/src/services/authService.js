import { api } from "./api";

/**
 * Login admin user
 * @param {Object} credentials - Admin credentials
 * @param {string} credentials.email - Admin email
 * @param {string} credentials.password - Admin password
 * @returns {Promise<Object>} - Response with token
 */
export const loginAdmin = async (credentials) => {
  const response = await api.post("/admin/login", credentials);
  return response.data;
};
