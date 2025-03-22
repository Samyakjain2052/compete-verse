
import React from "react";
import { CalendarClock, Award, Users, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CompetitionCardProps {
  id: string;
  title: string;
  host: string;
  deadlineDate: string;
  daysLeft: number;
  maxAge?: number;
  participants: number;
  className?: string;
  featured?: boolean;
  topUsers?: Array<{ name: string; position: number }>;
}

const CompetitionCard: React.FC<CompetitionCardProps> = ({
  id,
  title,
  host,
  deadlineDate,
  daysLeft,
  maxAge,
  participants,
  className,
  featured = false,
  topUsers,
}) => {
  // Calculate progress percentage
  const progress = Math.max(0, Math.min(100, (daysLeft / 30) * 100));
  const isEnding = daysLeft <= 3;
  
  return (
    <Link 
      to={`/competitions/${id}`}
      className={cn(
        "group relative overflow-hidden rounded-xl transition-all duration-300 card-glass hover:shadow-lg",
        featured ? "md:col-span-2" : "",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 p-5 flex flex-col h-full">
        {/* Card header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            {maxAge && (
              <span className="age-badge bg-secondary text-muted-foreground mb-2 inline-block">
                Under {maxAge} Only
              </span>
            )}
            <h3 className="font-semibold text-lg md:text-xl group-hover:text-primary transition-colors duration-300">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">
              Hosted by {host}
            </p>
          </div>
          <div className="text-muted-foreground group-hover:text-primary transition-colors duration-300">
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </div>
        </div>
        
        {/* Deadline progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1.5">
            <div className="flex items-center">
              <CalendarClock size={14} className="mr-1.5" />
              <span className="text-muted-foreground">{deadlineDate}</span>
            </div>
            <span className={cn(
              "font-medium",
              isEnding ? "text-destructive" : "text-primary"
            )}>
              {daysLeft} {daysLeft === 1 ? 'day' : 'days'} left
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className={cn(
                "progress-bar-fill",
                isEnding ? "bg-destructive" : "bg-primary"
              )} 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Card footer */}
        <div className="mt-auto pt-3 flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Users size={14} className="mr-1.5" />
            <span>{participants} Participants</span>
          </div>
          
          {topUsers && topUsers.length > 0 && (
            <div className="flex items-center">
              <Award size={14} className="mr-1.5 text-primary" />
              <div className="flex -space-x-2">
                {topUsers.map((user, index) => (
                  <div 
                    key={index}
                    className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-medium border-2 border-background"
                  >
                    {user.position}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CompetitionCard;
