// API Configuration - Single source for all API endpoints
export const API_BASE_URL = "https://fitness-tracker-t3.vercel.app/api";

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register/`,
    LOGIN: `${API_BASE_URL}/auth/login/`,
  },
  ACTIVITIES: {
    LIST: `${API_BASE_URL}/activities/`,
    CREATE: `${API_BASE_URL}/activities/create/`,
    UPDATE: (id: number) => `${API_BASE_URL}/activities/${id}/`,
    DELETE: (id: number) => `${API_BASE_URL}/activities/${id}/`,
  },
};

// Auth token management
export const AUTH_STORAGE = {
  ACCESS_TOKEN: "fitness_access_token",
  REFRESH_TOKEN: "fitness_refresh_token",
  USER_INFO: "fitness_user_info",
};

export const getAuthHeaders = () => {
  const token = localStorage.getItem(AUTH_STORAGE.ACCESS_TOKEN);
  return token ? { Authorization: `Bearer ${token}` } : {};
};
