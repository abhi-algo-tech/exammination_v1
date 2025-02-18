import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const AuthService = {
  getUserProfile: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.USER.USER_PROFILE);
      return response.data;
    } catch (error) {
      console.error("Error while login:", error);
      throw error;
    }
  },
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

  authUserSignUp: async (payload) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.AUTH.SIGNUP_USER,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error while creating user:", error);
      throw error;
    }
  },
};

export default AuthService;
