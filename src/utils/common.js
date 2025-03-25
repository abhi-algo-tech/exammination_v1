import store from "../store/store";

// Get the authentication token from Redux state
export const getAuthToken = () => {
  const state = store.getState();
  return state.auth.token;
};

// Function to convert 24-hour time to 12-hour format
export const formatTime = (timeStr) => {
  if (!timeStr) return "N/A";

  const [hours, minutes] = timeStr.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM case

  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
};
