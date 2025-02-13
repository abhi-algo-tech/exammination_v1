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
};

export default ExamQuestionService;
