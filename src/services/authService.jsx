import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";

const AuthService = {
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
        API_ENDPOINTS.AUTH.SIGNUP,
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
