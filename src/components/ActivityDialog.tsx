import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Activity, CreateActivityPayload, ActivityType, ActivityStatus } from "@/types/activity";

interface ActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (payload: CreateActivityPayload) => void;
  activity?: Activity | null;
  isLoading?: boolean;
}

export function ActivityDialog({
  open,
  onOpenChange,
  onSave,
  activity,
  isLoading,
}: ActivityDialogProps) {
  const [formData, setFormData] = useState<CreateActivityPayload>({
    activity_type: "workout",
    description: "",
    date: new Date().toISOString().split("T")[0],
    status: "planned",
  });

  useEffect(() => {
    if (activity) {
      setFormData({
        activity_type: activity.activity_type,
        description: activity.description,
        date: activity.date,
        status: activity.status,
      });
    } else {
      setFormData({
        activity_type: "workout",
        description: "",
        date: new Date().toISOString().split("T")[0],
        status: "planned",
      });
    }
  }, [activity, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {activity ? "Edit Activity" : "Create New Activity"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="activity_type">Activity Type</Label>
              <Select
                value={formData.activity_type}
                onValueChange={(value: ActivityType) =>
                  setFormData({ ...formData, activity_type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="workout">Workout</SelectItem>
                  <SelectItem value="meal">Meal</SelectItem>
                  <SelectItem value="steps">Steps</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe your activity..."
                required
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: ActivityStatus) =>
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : activity ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
