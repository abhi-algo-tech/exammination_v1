import store from "../store/store";

// Get the authentication token from Redux state
export const getAuthToken = () => {
  const state = store.getState();
  return state.auth.token;
};
