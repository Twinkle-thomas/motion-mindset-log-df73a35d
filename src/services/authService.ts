import { API_ENDPOINTS, AUTH_STORAGE } from "@/config/api";
import type { LoginPayload, RegisterPayload, AuthResponse, RegisterResponse } from "@/types/auth";

export const authService = {
  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Registration failed");
    }

    return response.json();
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Login failed");
    }

    const data: AuthResponse = await response.json();
    
    // Store tokens
    localStorage.setItem(AUTH_STORAGE.ACCESS_TOKEN, data.access);
    localStorage.setItem(AUTH_STORAGE.REFRESH_TOKEN, data.refresh);
    localStorage.setItem(AUTH_STORAGE.USER_INFO, JSON.stringify({ username: payload.username }));

    return data;
  },

  logout() {
    localStorage.removeItem(AUTH_STORAGE.ACCESS_TOKEN);
    localStorage.removeItem(AUTH_STORAGE.REFRESH_TOKEN);
    localStorage.removeItem(AUTH_STORAGE.USER_INFO);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(AUTH_STORAGE.ACCESS_TOKEN);
  },

  getUserInfo() {
    const info = localStorage.getItem(AUTH_STORAGE.USER_INFO);
    return info ? JSON.parse(info) : null;
  },
};
