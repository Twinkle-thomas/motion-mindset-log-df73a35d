import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Dumbbell, Utensils, Footprints } from "lucide-react";
import type { Activity } from "@/types/activity";
import { format } from "date-fns";

interface ActivityCardProps {
  activity: Activity;
  onEdit: (activity: Activity) => void;
  onDelete: (id: number) => void;
}

const activityIcons = {
  workout: Dumbbell,
  meal: Utensils,
  steps: Footprints,
};

const statusVariants = {
  planned: "info" as const,
  in_progress: "warning" as const,
  completed: "success" as const,
};

const statusLabels = {
  planned: "Planned",
  in_progress: "In Progress",
  completed: "Completed",
};

export function ActivityCard({ activity, onEdit, onDelete }: ActivityCardProps) {
  const Icon = activityIcons[activity.activity_type];

  return (
    <Card className="p-4 hover:shadow-md transition-all duration-300 border-border bg-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-foreground capitalize">
                {activity.activity_type}
              </h3>
              <Badge variant={statusVariants[activity.status]}>
                {statusLabels[activity.status]}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(activity.date), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(activity)}
            className="h-8 w-8 text-muted-foreground hover:text-primary"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(activity.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
