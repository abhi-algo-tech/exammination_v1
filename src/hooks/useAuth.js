import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login, logout, setProfile } from "../store/authSlice";
import { authKeys, userKeys } from "../utils/queryKeys";
import AuthService from "../services/authService";
import { CustomMessage } from "../utils/CustomMessage";
import { useNavigate } from "react-router-dom";

// User signup hook
export const useUserSignUp = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload) => AuthService.authUserSignUp(payload),
    onSuccess: (data) => {
      // Store token and user info in Redux

      CustomMessage.success("User created successful!");
      queryClient.invalidateQueries(authKeys.signup); // Refetch any related queries if needed
      navigate("/signin");
    },
    onError: (error) => {
      console.error("User signup failed:", error);
    },
  });
};
// User login hook
export const useUserLogin = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (payload) => AuthService.authUserLogin(payload),
    onSuccess: (data) => {
      // Store token and user info in Redux
      dispatch(
        login({
          token: data.token,
          user: data.user,
        })
      );
      CustomMessage.success("Login successful");
      queryClient.invalidateQueries(authKeys.login); // Refetch any related queries if needed
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};
// User Profile hook
export const useGetUserProfile = () => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["userProfile"], // ✅ Unique query key
    queryFn: async () => {
      const response = await AuthService.getUserProfile();
      dispatch(setProfile(response.data));
      return response.data; // ✅ Extract only 'data'
    },
    onError: (error) => {
      console.error("Error fetching user profile:", error);
    },
  });
};
// User role hook
export const useGetUserRole = () => {
  return useQuery({
    queryKey: ["userRole"], // ✅ Unique query key
    queryFn: async () => {
      const response = await AuthService.getUserRole();
      return response.data; // ✅ Extract only 'data'
    },
    onError: (error) => {
      console.error("Error fetching user profile:", error);
    },
  });
};
// Check User is exist or not hook
export const useCheckUserExistOrNot = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload) => AuthService.userExistOrNot(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(userKeys.checkName); // Refetch any related queries if needed
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => AuthService.updateUserProfile(payload),
    onSuccess: () => {
      CustomMessage.success("Profile updated successfully!");
      queryClient.invalidateQueries(["userProfile"]); // Refetch user profile data
    },
    onError: (error) => {
      console.error("Error updating user profile:", error);
      // CustomMessage.error("Failed to update profile. Please try again.");
    },
  });
};
// export const useGetUserProfile = () => {
//   const queryClient = useQueryClient();
//   const dispatch = useDispatch();

//   return useMutation({
//     mutationFn: () => AuthService.getUserProfile(),
//     onSuccess: (data) => {
//       // Store token and user info in Redux
//     queryFn: async () => {
//       const response = await ExamService.getExamAll();
//       return response; // ✅ Extract only 'data'
//     },
//       CustomMessage.success("Login successful");
//       queryClient.invalidateQueries(authKeys.login); // Refetch any related queries if needed
//     },
//     onError: (error) => {
//       console.error("Login failed:", error);
//     },
//   });
// };

export const useUserLogout = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear the auth state
    // navigate("/signin"); // Redirect the user to the sign-in page
  };

  return handleLogout;
};
