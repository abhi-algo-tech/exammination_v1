import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const ExamScheduleService = {
  // Search exam schedules
  searchExamSchedules: async ({ customUserId, classId }) => {
    try {
      const token = getAuthToken();
      const params = new URLSearchParams();

      if (customUserId) params.append("customUserId", customUserId);
      if (classId) params.append("classId", classId);

      const response = await axiosInstance.get(
        `${API_ENDPOINTS.EXAMSCHEDULE.BY_SEARCH}?${params.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while searching exam schedules:", error);
      throw error;
    }
  },

  // Update exam schedule
  updateExamSchedule: async (id, examScheduleDto) => {
    console.log("Id:", id);
    try {
      const token = getAuthToken();
      const response = await axiosInstance.put(
        `${API_ENDPOINTS.EXAMSCHEDULE.BASE}/${id}`,
        examScheduleDto,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while updating exam schedule:", error);
      throw error;
    }
  },
};

export default ExamScheduleService;
