import { api } from "./api";

/**
 * Submit student feedback
 * @param {Object} feedbackData - Feedback data
 * @returns {Promise<Object>} - Response with success message
 */
export const submitFeedback = async (feedbackData) => {
  const response = await api.post("/feedback", feedbackData);
  return response.data;
};

/**
 * Get all feedbacks (admin only)
 * @returns {Promise<Object>} - Response with feedbacks data
 */
export const getAllFeedbacks = async () => {
  const response = await api.get("/admin/feedbacks");
  return response.data;
};

/**
 * Export feedbacks to Excel (admin only)
 * @returns {Promise<Blob>} - Excel file as blob
 */
export const exportFeedbacks = async () => {
  const response = await api.get("/admin/feedbacks/export", {
    responseType: "blob",
  });
  return response.data;
};
