import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const AuthService = {
  //   getAllSchools: async () => {
  //     try {
  //       const response = await axiosInstance.get(API_ENDPOINTS.SCHOOL.BASE);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching schools:", error);
  //       throw error;
  //     }
  //   },

  //   getSchool: async (schoolId) => {
  //     try {
  //       const response = await axiosInstance.get(
  //         `${API_ENDPOINTS.SCHOOL.BASE}/${schoolId}`
  //       );
  //       return response.data;
  //     } catch (error) {
  //       console.error(`Error fetching school with ID ${schoolId}:`, error);
  //       throw error;
  //     }
  //   },

  authUserLogin: async (payload) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.LOGIN,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error while login:", error);
      throw error;
    }
  },

  //   updateSchool: async (schoolId, schoolData) => {
  //     try {
  //       const response = await axiosInstance.put(
  //         `${API_ENDPOINTS.SCHOOL.BASE}/${schoolId}`,
  //         schoolData
  //       );
  //       return response.data;
  //     } catch (error) {
  //       console.error(`Error updating school with ID ${schoolId}:`, error);
  //       throw error;
  //     }
  //   },
};

export default AuthService;
