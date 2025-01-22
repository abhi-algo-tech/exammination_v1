import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { login, logout } from "../store/authSlice";
import { authKeys } from "../utils/queryKeys";
import AuthService from "../services/authService";

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
      queryClient.invalidateQueries(authKeys.login); // Refetch any related queries if needed
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });
};

export const useUserLogout = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to clear the auth state
    // navigate("/signin"); // Redirect the user to the sign-in page
  };

  return handleLogout;
};
