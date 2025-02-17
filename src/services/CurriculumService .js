import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const CurriculumService = {
  // Get all curriculums
  getAllCurriculums: async () => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(API_ENDPOINTS.CURRICULUM.BASE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while fetching curriculums:", error);
      throw error;
    }
  },

  // Get curriculum by ID
  getCurriculumById: async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(
        API_ENDPOINTS.CURRICULUM.BY_ID.replace("{id}", id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while fetching curriculum by ID:", error);
      throw error;
    }
  },

  // Create a new curriculum
  createCurriculum: async (curriculumDto) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.post(
        API_ENDPOINTS.CURRICULUM.BASE,
        curriculumDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while creating curriculum:", error);
      throw error;
    }
  },

  // Update an existing curriculum
  updateCurriculum: async (id, curriculumDto) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.put(
        API_ENDPOINTS.CURRICULUM.BY_ID.replace("{id}", id),
        curriculumDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while updating curriculum:", error);
      throw error;
    }
  },

  // Delete a curriculum
  deleteCurriculum: async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.delete(
        API_ENDPOINTS.CURRICULUM.BY_ID.replace("{id}", id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while deleting curriculum:", error);
      throw error;
    }
  },
};

export default CurriculumService;
