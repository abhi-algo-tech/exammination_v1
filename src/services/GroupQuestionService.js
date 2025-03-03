import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

export const GroupQuestionService = {
  // Get a group question by ID
  getGroupQuestionById: async (id) => {
    try {
      const token = getAuthToken();
      const url = `${API_ENDPOINTS.GROUPQUESTION.BASE}/${id}`;
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while fetching group question by ID:", error);
      throw error;
    }
  },

  // Create a new group question
  createGroupQuestion: async (payload) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.post(
        API_ENDPOINTS.GROUPQUESTION.BASE,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while creating group question:", error);
      throw error;
    }
  },

  // Update an existing group question
  updateGroupQuestion: async (id, payload) => {
    try {
      const token = getAuthToken();
      const url = `${API_ENDPOINTS.GROUPQUESTION.BASE}/${id}`;
      const response = await axiosInstance.put(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while updating group question:", error);
      throw error;
    }
  },
};
