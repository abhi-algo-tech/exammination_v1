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
  // Download question template
  downloadTemplate: async () => {
    try {
      const token = getAuthToken();
      const url = API_ENDPOINTS.QUESTION.DOWNLOAD_TEMPLATE;
      const response = await axiosInstance.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", // Ensures the file is downloaded
      });

      // Create a link to download the file
      const urlObject = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = urlObject;
      link.setAttribute("download", "question_template.xlsx"); // Set the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error while downloading template:", error);
      throw error;
    }
  },

  // Upload questions from a file
  uploadQuestions: async (file) => {
    try {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(
        API_ENDPOINTS.QUESTION.UPLOAD,
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
      console.error("Error while uploading questions:", error);
      throw error;
    }
  },
};

export default QuestionService;
