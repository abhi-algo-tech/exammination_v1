import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const ClassService = {
  // Get all classes
  getAllClasses: async () => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(API_ENDPOINTS.CLASSES.BASE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while fetching classes:", error);
      throw error;
    }
  },

  // Get class by ID
  getClassById: async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(
        API_ENDPOINTS.CLASSES.BY_ID.replace("{id}", id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while fetching class by ID:", error);
      throw error;
    }
  },

  // Create a new class
  createClass: async (classDto) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.post(
        API_ENDPOINTS.CLASSES.BASE,
        classDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while creating class:", error);
      throw error;
    }
  },

  // Update an existing class
  updateClass: async (id, classDto) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.put(
        API_ENDPOINTS.CLASSES.BY_ID.replace("{id}", id),
        classDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while updating class:", error);
      throw error;
    }
  },

  // Delete a class
  deleteClass: async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.delete(
        API_ENDPOINTS.CLASSES.BY_ID.replace("{id}", id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while deleting class:", error);
      throw error;
    }
  },
};

export default ClassService;
