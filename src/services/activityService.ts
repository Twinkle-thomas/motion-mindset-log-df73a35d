import { API_ENDPOINTS, getAuthHeaders } from "@/config/api";
import type { Activity, CreateActivityPayload, UpdateActivityPayload } from "@/types/activity";

export const activityService = {
  async getActivities(): Promise<Activity[]> {
    const response = await fetch(API_ENDPOINTS.ACTIVITIES.LIST, {
      headers: {
        ...getAuthHeaders(),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch activities");
    }

    return response.json();
  },

  async createActivity(payload: CreateActivityPayload): Promise<Activity> {
    const response = await fetch(API_ENDPOINTS.ACTIVITIES.CREATE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to create activity");
    }

    return response.json();
  },

  async updateActivity(id: number, payload: UpdateActivityPayload): Promise<{ detail: string }> {
    const response = await fetch(API_ENDPOINTS.ACTIVITIES.UPDATE(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || "Failed to update activity");
    }

    return response.json();
  },

  async deleteActivity(id: number): Promise<void> {
    const response = await fetch(API_ENDPOINTS.ACTIVITIES.DELETE(id), {
      method: "DELETE",
      headers: {
        ...getAuthHeaders(),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete activity");
    }
  },
};
