
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { User, Mail, Trophy, Clock, CheckCircle, XCircle, ExternalLink, Settings } from "lucide-react";

// Mock data - in a real app, this would come from API
const userCompetitions = [
  {
    id: "comp-1",
    title: "National Science Challenge",
    host: "Science Foundation",
    deadlineDate: "October 15, 2023",
    daysLeft: 12,
    totalDays: 30,
    rank: 3,
    totalParticipants: 120,
    submitted: true,
  },
  {
    id: "comp-2",
    title: "Math Olympiad",
    host: "International Math Society",
    deadlineDate: "November 5, 2023",
    daysLeft: 21,
    totalDays: 45,
    rank: 15,
    totalParticipants: 300,
    submitted: false,
  },
  {
    id: "comp-3",
    title: "Robotics Innovation Contest",
    host: "Tech Innovators Alliance",
    deadlineDate: "December 1, 2023",
    daysLeft: 2,
    totalDays: 60,
    rank: 7,
    totalParticipants: 85,
    submitted: true,
  }
];

const UserProfile = () => {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  
  if (!user) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <Card className="w-full max-w-md p-6 text-center">
          <CardTitle className="mb-4">Not Signed In</CardTitle>
          <p className="text-muted-foreground mb-6">Please sign in to view your profile</p>
          <Button asChild>
            <Link to="/sign-in">Sign In</Link>
          </Button>
        </Card>
      </div>
    );
  }
  
  // Get user's initial (first letter of email)
  const userInitial = user.email.charAt(0).toUpperCase();
  
  // For demo purposes, let's create a name from the email
  const userName = user.email.split('@')[0]
    .split('.')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
    
  return (
    <div className="container py-8 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8 flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-lg">
            <AvatarImage src="/placeholder.svg" alt={userName} />
            <AvatarFallback className="text-2xl md:text-3xl bg-primary text-primary-foreground">
              {userInitial}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{userName}</h1>
            <div className="flex items-center justify-center md:justify-start gap-2 text-muted-foreground mb-3">
              <Mail size={16} className="shrink-0" />
              <span>{user.email}</span>
            </div>
            <Badge variant="secondary" className="mb-4">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</Badge>
            
            <div className="flex gap-3 justify-center md:justify-start">
              <Button variant="outline" size="sm" className="gap-2">
                <Settings size={16} />
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Profile Content */}
        <Tabs defaultValue="competitions" className="w-full">
          <TabsList className="w-full md:w-auto mb-6">
            <TabsTrigger value="competitions" className="flex-1 md:flex-none">
              My Competitions
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex-1 md:flex-none">
              Achievements
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex-1 md:flex-none">
              Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="competitions" className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Your Competitions</h2>
            
            {/* Competition List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userCompetitions.map((competition) => {
                const progress = (competition.totalDays - competition.daysLeft) / competition.totalDays * 100;
                const isEnding = competition.daysLeft <= 3;
                
                return (
                  <Link 
                    to={`/competitions/${competition.id}`} 
                    key={competition.id}
                    className="group block"
                  >
                    <Card className="h-full transition-all hover:shadow-md group-hover:border-primary">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {competition.title}
                          </CardTitle>
                          <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-sm text-muted-foreground">Hosted by {competition.host}</p>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-4">
                          {/* Deadline Progress */}
                          <div>
                            <div className="flex justify-between text-sm mb-1.5">
                              <div className="flex items-center gap-1.5">
                                <Clock size={14} className="text-muted-foreground" />
                                <span className="text-muted-foreground">{competition.deadlineDate}</span>
                              </div>
                              <span className={isEnding ? "text-destructive font-medium" : "text-primary font-medium"}>
                                {competition.daysLeft} {competition.daysLeft === 1 ? 'day' : 'days'} left
                              </span>
                            </div>
                            <Progress 
                              value={progress} 
                              className={isEnding ? "h-2" : "h-2"} 
                              indicatorClassName={isEnding ? "bg-destructive" : "bg-primary"}
                            />
                          </div>
                          
                          {/* Rank and Status */}
                          <div className="flex justify-between items-center pt-2">
                            <div className="flex items-center gap-1.5">
                              <Trophy size={14} className="text-primary" />
                              <span className="font-medium">
                                Rank: <strong className="text-primary">{competition.rank}</strong>/{competition.totalParticipants}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-1.5">
                              {competition.submitted ? (
                                <>
                                  <CheckCircle size={14} className="text-green-500" />
                                  <span className="text-sm text-green-600 dark:text-green-500 font-medium">Submitted</span>
                                </>
                              ) : (
                                <>
                                  <XCircle size={14} className="text-destructive" />
                                  <span className="text-sm text-destructive font-medium">Not Submitted</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
            
            {userCompetitions.length === 0 && (
              <Card className="p-6 text-center">
                <p className="text-muted-foreground mb-4">You haven't joined any competitions yet.</p>
                <Button asChild>
                  <Link to="/competitions">Browse Competitions</Link>
                </Button>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="achievements">
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">Achievements will be available soon.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card className="p-6 text-center">
              <p className="text-muted-foreground">Account settings will be available soon.</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserProfile;
