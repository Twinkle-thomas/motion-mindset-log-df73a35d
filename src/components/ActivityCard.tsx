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

  const gradientMap = {
    workout: "from-primary/10 to-primary/5 border-primary/20",
    meal: "from-secondary/10 to-secondary/5 border-secondary/20",
    steps: "from-accent-foreground/10 to-accent-foreground/5 border-accent-foreground/20",
  };

  return (
    <Card className={`p-5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 border bg-gradient-to-br ${gradientMap[activity.activity_type]} backdrop-blur-sm group`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
            <div className="relative p-3 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary border border-primary/20">
              <Icon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-foreground capitalize text-lg">
                {activity.activity_type}
              </h3>
              <Badge variant={statusVariants[activity.status]} className="shadow-sm">
                {statusLabels[activity.status]}
              </Badge>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{activity.description}</p>
            <p className="text-xs text-muted-foreground font-medium">
              {format(new Date(activity.date), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(activity)}
            className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(activity.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
