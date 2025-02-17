import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const SubjectService = {
  // Get all subjects
  getAllSubjects: async () => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(API_ENDPOINTS.SUBJECT.BASE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while fetching subjects:", error);
      throw error;
    }
  },

  // Get subject by ID
  getSubjectById: async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(
        API_ENDPOINTS.SUBJECT.BY_ID.replace("{id}", id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while fetching subject by ID:", error);
      throw error;
    }
  },

  // Create a new subject
  createSubject: async (subjectDto) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.post(
        API_ENDPOINTS.SUBJECT.BASE,
        subjectDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while creating subject:", error);
      throw error;
    }
  },

  // Update an existing subject
  updateSubject: async (id, subjectDto) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.put(
        API_ENDPOINTS.SUBJECT.BY_ID.replace("{id}", id),
        subjectDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while updating subject:", error);
      throw error;
    }
  },

  // Delete a subject
  deleteSubject: async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.delete(
        API_ENDPOINTS.SUBJECT.BY_ID.replace("{id}", id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while deleting subject:", error);
      throw error;
    }
  },
};

export default SubjectService;
