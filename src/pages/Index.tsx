import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dumbbell, Activity, Target, TrendingUp, Calendar } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <Dumbbell className="w-14 h-14 text-primary" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Fitness Tracker
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Track your workouts, meals, and daily activities. Stay motivated and achieve your fitness goals with our comprehensive tracking system.
          </p>

          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <Link to="/register">
              <Button size="lg" className="gap-2 shadow-lg shadow-primary/20">
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
            <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 hover:shadow-lg hover:shadow-primary/10 transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary flex items-center justify-center mb-4 mx-auto border border-primary/20">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">Set Goals</h3>
              <p className="text-sm text-muted-foreground">
                Define and track your fitness objectives
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/20 hover:shadow-lg hover:shadow-secondary/10 transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 text-secondary flex items-center justify-center mb-4 mx-auto border border-secondary/20">
                <TrendingUp className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">Track Progress</h3>
              <p className="text-sm text-muted-foreground">
                Monitor your activities in real-time
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-accent-foreground/10 to-accent-foreground/5 border border-accent-foreground/20 hover:shadow-lg hover:shadow-accent-foreground/10 transition-all">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-foreground/20 to-accent-foreground/10 text-accent-foreground flex items-center justify-center mb-4 mx-auto border border-accent-foreground/20">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-lg mb-2">Stay Consistent</h3>
              <p className="text-sm text-muted-foreground">
                Build lasting healthy habits
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
