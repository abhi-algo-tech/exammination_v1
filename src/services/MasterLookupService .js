import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const MasterLookupService = {
  // Get all master lookup entries
  getAllMasterLookups: async () => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(
        API_ENDPOINTS.MASTERLOOKUP.BASE,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while fetching master lookup entries:", error);
      throw error;
    }
  },

  // Get master lookup by ID
  getMasterLookupById: async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(
        API_ENDPOINTS.MASTERLOOKUP.BY_ID.replace("{id}", id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while fetching master lookup by ID:", error);
      throw error;
    }
  },

  // Get master lookup by type
  getMasterLookupByType: async (type) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(
        API_ENDPOINTS.MASTERLOOKUP.BY_TYPE.replace("{type}", type),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while fetching master lookup by type:", error);
      throw error;
    }
  },

  // Create a new master lookup entry
  createMasterLookup: async (masterLookupDto) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.post(
        API_ENDPOINTS.MASTERLOOKUP.BASE,
        masterLookupDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while creating master lookup entry:", error);
      throw error;
    }
  },

  // Update an existing master lookup entry
  updateMasterLookup: async (id, masterLookupDto) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.put(
        API_ENDPOINTS.MASTERLOOKUP.BY_ID.replace("{id}", id),
        masterLookupDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while updating master lookup entry:", error);
      throw error;
    }
  },

  // Delete a master lookup entry
  deleteMasterLookup: async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.delete(
        API_ENDPOINTS.MASTERLOOKUP.BY_ID.replace("{id}", id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while deleting master lookup entry:", error);
      throw error;
    }
  },
};

export default MasterLookupService;
