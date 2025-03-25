import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const ExamResultService = {
  /**
   * Create Exam Result
   * @param {number} studentId - Student ID
   * @param {number} examId - Exam ID
   * @returns {Promise<Object>} Response data
   */
  createExamResult: async (studentId, examId) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.post(
        `${API_ENDPOINTS.EXAMRESULTS.CREATE}?studentId=${studentId}&examId=${examId}`,
        {}, // Empty request body since backend expects query params
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error while creating exam result:", error);
      throw error;
    }
  },

  /**
   * Get Exam Result by Exam ID and Student ID
   * @param {number} examId - Exam ID
   * @param {number} studentId - Student ID
   * @returns {Promise<Object>} Exam result data
   */
  getExamResultByExamAndStudent: async (examId, studentId) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.EXAMRESULTS.BASE}/exam/${examId}/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching exam result:", error);
      throw error;
    }
  },
};

export default ExamResultService;
