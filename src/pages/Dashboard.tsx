import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, Dumbbell, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { activityService } from "@/services/activityService";
import { ActivityCard } from "@/components/ActivityCard";
import { ActivityDialog } from "@/components/ActivityDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Activity, CreateActivityPayload } from "@/types/activity";

export default function Dashboard() {
  const navigate = useNavigate();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const userInfo = authService.getUserInfo();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/login");
      return;
    }
    loadActivities();
  }, [navigate]);

  const loadActivities = async () => {
    try {
      const data = await activityService.getActivities();
      setActivities(data);
    } catch (error) {
      toast.error("Failed to load activities");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveActivity = async (payload: CreateActivityPayload) => {
    setIsSaving(true);
    try {
      if (selectedActivity) {
        await activityService.updateActivity(selectedActivity.id, payload);
        toast.success("Activity updated successfully!");
      } else {
        await activityService.createActivity(payload);
        toast.success("Activity created successfully!");
      }
      setDialogOpen(false);
      setSelectedActivity(null);
      loadActivities();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save activity");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (activity: Activity) => {
    setSelectedActivity(activity);
    setDialogOpen(true);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    
    try {
      await activityService.deleteActivity(deleteId);
      toast.success("Activity deleted successfully!");
      loadActivities();
    } catch (error) {
      toast.error("Failed to delete activity");
    } finally {
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };

  const handleLogout = () => {
    authService.logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleCreateNew = () => {
    setSelectedActivity(null);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow text-primary-foreground">
                <Dumbbell className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Fitness Tracker</h1>
                <p className="text-sm text-muted-foreground">Welcome, {userInfo?.username}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">My Activities</h2>
            <p className="text-muted-foreground mt-1">Track your fitness journey</p>
          </div>
          <Button onClick={handleCreateNew} className="gap-2">
            <Plus className="w-4 h-4" />
            New Activity
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-4">
              <Dumbbell className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No activities yet</h3>
            <p className="text-muted-foreground mb-6">
              Start tracking your fitness journey by creating your first activity
            </p>
            <Button onClick={handleCreateNew} className="gap-2">
              <Plus className="w-4 h-4" />
              Create Your First Activity
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </main>

      <ActivityDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveActivity}
        activity={selectedActivity}
        isLoading={isSaving}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Activity</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this activity? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
