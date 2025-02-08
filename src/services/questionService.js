import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const QuestionService = {
  // Get all questions

  // Get a question by ID
  getQuestionById: async (id) => {
    try {
      const token = getAuthToken();
      const url = `${API_ENDPOINTS.QUESTION.BASE}/${id}`;
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while fetching question by ID:", error);
      throw error;
    }
  },

  // Create a new question
  createQuestion: async (payload) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.post(
        API_ENDPOINTS.QUESTION.BASE,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while creating question:", error);
      throw error;
    }
  },

  // Update an existing question
  updateQuestion: async (id, payload) => {
    try {
      const token = getAuthToken();
      const url = `${API_ENDPOINTS.QUESTION.BASE}/${id}`;
      const response = await axiosInstance.put(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while updating question:", error);
      throw error;
    }
  },
};

export default QuestionService;
