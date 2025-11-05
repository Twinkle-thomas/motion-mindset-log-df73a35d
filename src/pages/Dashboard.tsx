import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, LogOut, Dumbbell, Loader2, User, TrendingUp, Calendar, Target } from "lucide-react";
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

  const totalActivities = activities.length;
  const completedActivities = activities.filter(a => a.status === 'completed').length;
  const inProgressActivities = activities.filter(a => a.status === 'in_progress').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-md opacity-30"></div>
                <Avatar className="h-14 w-14 border-2 border-primary/20 relative">
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userInfo?.username}`} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-primary-glow text-primary-foreground text-lg font-bold">
                    {userInfo?.username?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Fitness Tracker
                </h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {userInfo?.first_name || userInfo?.username}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-primary" />
              <span className="text-3xl font-bold text-primary">{totalActivities}</span>
            </div>
            <p className="text-sm font-medium text-foreground">Total Activities</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-secondary" />
              <span className="text-3xl font-bold text-secondary">{inProgressActivities}</span>
            </div>
            <p className="text-sm font-medium text-foreground">In Progress</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-gradient-to-br from-success/10 to-success/5 border border-success/20 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <Calendar className="w-8 h-8 text-success" />
              <span className="text-3xl font-bold text-success">{completedActivities}</span>
            </div>
            <p className="text-sm font-medium text-foreground">Completed</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold">My Activities</h2>
            <p className="text-muted-foreground mt-1">Track your fitness journey</p>
          </div>
          <Button onClick={handleCreateNew} className="gap-2 shadow-lg shadow-primary/20">
            <Plus className="w-4 h-4" />
            New Activity
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-20 animate-pulse"></div>
              <Loader2 className="w-12 h-12 animate-spin text-primary relative" />
            </div>
            <p className="mt-4 text-muted-foreground">Loading your activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-20">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-20"></div>
              <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30">
                <Dumbbell className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              No activities yet
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start tracking your fitness journey by creating your first activity and watch your progress grow
            </p>
            <Button onClick={handleCreateNew} className="gap-2 shadow-lg shadow-primary/20">
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
