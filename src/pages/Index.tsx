import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, Activity, Target, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-glow text-primary-foreground mb-6 shadow-lg">
            <Dumbbell className="w-12 h-12" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Fitness Tracker
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track your workouts, meals, and daily activities. Stay motivated and achieve your fitness goals.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link to="/register">
              <Button size="lg" className="gap-2">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="gap-2">
                Login
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-12">
            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4 mx-auto">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Track Activities</h3>
              <p className="text-sm text-muted-foreground">
                Log workouts, meals, and daily steps in one place
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center mb-4 mx-auto">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Set Goals</h3>
              <p className="text-sm text-muted-foreground">
                Plan your activities and track your progress
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-lg bg-success/10 text-success flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Stay Motivated</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your journey from planned to completed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
