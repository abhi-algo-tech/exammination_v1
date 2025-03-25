import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const StudentExamAnswerService = {
  /**
   * Upsert (Add or Update) Student Exam Answer
   * @param {Object} payload - Exam answer DTO
   * @returns {Promise<Object>} Response data
   */
  upsertStudentExamAnswer: async (payload) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.post(
        API_ENDPOINTS.EXAMQUESTIONANSWER.UPSERT, // Ensure this is correct
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error while upserting student exam answer:", error);
      throw error;
    }
  },

  getStudentExamAnswersByExamAndStudent: async (examId, studentId) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(
        `${API_ENDPOINTS.EXAMQUESTIONANSWER.GET_BY_EXAM_AND_STUDENT}/${examId}/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching student exam answers:", error);
      throw error;
    }
  },
};

export default StudentExamAnswerService;
