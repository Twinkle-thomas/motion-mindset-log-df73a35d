export type ActivityType = "workout" | "meal" | "steps";
export type ActivityStatus = "planned" | "in_progress" | "completed";

export interface Activity {
  id: number;
  user: number;
  activity_type: ActivityType;
  description: string;
  date: string;
  status: ActivityStatus;
  created_at: string;
  updated_at: string;
}

export interface CreateActivityPayload {
  activity_type: ActivityType;
  description: string;
  date: string;
  status: ActivityStatus;
}

export interface UpdateActivityPayload {
  activity_type: ActivityType;
  description: string;
  date: string;
  status: ActivityStatus;
}
