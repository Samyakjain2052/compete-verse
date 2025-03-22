
import React from "react";
import { ChevronRight, Zap, Trophy, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <div className="relative pt-20 pb-24 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 py-16">
          <div className="inline-flex items-center rounded-full border border-border bg-background/50 px-3 py-1 text-sm mb-6 animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            <span>Compete. Connect. Get Noticed.</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight animate-slide-up max-w-4xl text-balance">
            The Ultimate <span className="text-shine">Competition Platform</span> for Student Innovation
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl animate-slide-up animate-delay-100 leading-relaxed">
            Showcase your skills, solve real-world challenges, and connect with top recruiters
            from leading organizations around the globe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-slide-up animate-delay-200">
            <Button size="lg" asChild className="group">
              <Link to="/competitions">
                Explore Competitions
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/host">
                Host a Competition
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl animate-slide-up animate-delay-300">
            <div className="flex flex-col items-center p-6 rounded-xl card-glass">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Fast Submissions</h3>
              <p className="text-sm text-muted-foreground text-center">
                Simple upload process with real-time evaluation and feedback
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-xl card-glass">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Dynamic Leaderboards</h3>
              <p className="text-sm text-muted-foreground text-center">
                Track your performance in real-time against global participants
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 rounded-xl card-glass">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Direct Recruiting</h3>
              <p className="text-sm text-muted-foreground text-center">
                Get discovered by top companies looking for emerging talent
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated decorative elements */}
      <div 
        className="absolute bottom-0 left-[10%] w-12 h-12 rounded-full border border-primary/20 animate-spin-slow opacity-40"
        style={{ animationDuration: '25s' }}
      ></div>
      <div 
        className="absolute top-[20%] right-[10%] w-24 h-24 rounded-full border border-primary/10 animate-spin-slow opacity-30"
        style={{ animationDuration: '30s' }}
      ></div>
      <div 
        className="absolute top-[30%] left-[5%] w-16 h-16 rounded-full border border-primary/10 animate-spin-slow opacity-20"
        style={{ animationDuration: '20s', animationDirection: 'reverse' }}
      ></div>
    </div>
  );
};

export default HeroSection;
