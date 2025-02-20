import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const ExamQuestionService = {
  // Update Exam Question Statuses
  updateExamQuestionStatuses: async (examQuestionDtos) => {
    try {
      const token = getAuthToken(); // Retrieve token from Redux state
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.EXAMQUESTION.BASE}/update-status`,
        examQuestionDtos,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while updating exam question statuses:", error);
      throw error;
    }
  },
  /**
   * Add or update exam questions
   * @param {Array} payload - List of exam question DTOs
   * @returns {Promise<Object>} Response data
   */
  upsertExamQuestions: async (payload) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.EXAMQUESTION.UPSERT}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while upserting exam questions:", error);
      throw error;
    }
  },
};

export default ExamQuestionService;
