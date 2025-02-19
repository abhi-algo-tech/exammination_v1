import axiosInstance from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/endpoints";
import { getAuthToken } from "../utils/common";

const AuthService = {
  getUserProfile: async () => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(
        API_ENDPOINTS.USER.USER_PROFILE,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while getting profile:", error);
      throw error;
    }
  },
  getUserRole: async () => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.get(API_ENDPOINTS.USER.ROLE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error while getting profile:", error);
      throw error;
    }
  },
  updateUserProfile: async (payload) => {
    try {
      const token = getAuthToken();
      const response = await axiosInstance.put(
        API_ENDPOINTS.USER.BASE,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error while updating profile:", error);
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
  userExistOrNot: async (payload) => {
    try {
      const response = await axiosInstance.post(
        API_ENDPOINTS.USER.IS_EXIST,
        payload
      );
      return response.data;
    } catch (error) {
      console.error("Error while checking the users:", error);
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
