import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const DocumentService = {
  // Upload a document
  uploadDocument: async (file, moduleName, documentData) => {
    try {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append("file", file);
      formData.append("moduleName", moduleName);

      // Append additional document data
      Object.keys(documentData).forEach((key) => {
        formData.append(key, documentData[key]);
      });

      const response = await axiosInstance.post(
        API_ENDPOINTS.DOCUMENT.UPLOAD,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error while uploading document:", error);
      throw error;
    }
  },

  // Get all documents
  getAllDocuments: async () => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(API_ENDPOINTS.DOCUMENT.BASE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error while fetching all documents:", error);
      throw error;
    }
  },

  // Get document by ID
  getDocumentById: async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(
        API_ENDPOINTS.DOCUMENT.BY_ID.replace("{id}", id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(`Error while fetching document with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete document by ID
  deleteDocument: async (id) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.delete(
        API_ENDPOINTS.DOCUMENT.BY_ID.replace("{id}", id),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(`Error while deleting document with ID ${id}:`, error);
      throw error;
    }
  },
};

export default DocumentService;
