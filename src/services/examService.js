import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const ExamService = {
  // Get all exams
  getAllExams: async ({
    page = 0,
    size = 10,
    sortBy = "createdOn",
    sortDirection = "asc",
    subjectId,
    classId,
    curriculumId,
    statusId,
    search,
  }) => {
    try {
      const token = getAuthToken(); // Retrieve token from Redux state
      console.log("page", page);

      const params = new URLSearchParams();

      // Add parameters only if they are not null or undefined
      if (page !== null && page !== undefined) params.append("page", page);
      if (size !== null && size !== undefined) params.append("size", size);
      if (sortBy) params.append("sortBy", sortBy);
      if (sortDirection) params.append("sortDirection", sortDirection);
      if (subjectId) params.append("subjectId", subjectId);
      if (classId) params.append("classId", classId);
      if (curriculumId) params.append("curriculumId", curriculumId);
      if (statusId) params.append("statusId", statusId);
      if (search) params.append("search", search);

      const response = await axiosInstance.get(
        `${API_ENDPOINTS.exam.BASE}?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error while fetching exams:", error);
      throw error;
    }
  },

  // Get an exam by ID (using BASE instead of BY_ID)
  getExamById: async (id) => {
    try {
      const token = getAuthToken();
      const url = `${API_ENDPOINTS.exam.BASE}/${id}`;
      const response = await axiosInstance.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error while fetching exam by ID:", error);
      throw error;
    }
  },

  // Create a new exam
  createExam: async (payload) => {
    try {
      const token = getAuthToken(); // Retrieve token from Redux state
      const response = await axiosInstance.post(
        API_ENDPOINTS.exam.BASE,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while creating exam:", error);
      throw error;
    }
  },

  // Update an existing exam (using BASE instead of BY_ID)
  updateExam: async (id, payload) => {
    try {
      const token = getAuthToken(); // Retrieve token from Redux state
      const url = `${API_ENDPOINTS.exam.BASE}/${id}`;
      const response = await axiosInstance.put(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while updating exam:", error);
      throw error;
    }
  },
};

export default ExamService;
