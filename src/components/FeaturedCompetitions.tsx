
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CompetitionCard from "./CompetitionCard";
import { Link } from "react-router-dom";
import { Competition } from "@/types/competition";
import CompetitionService from "@/services/competition-service";
import { useQuery } from "@tanstack/react-query";

const FeaturedCompetitions: React.FC = () => {
  const { data: competitions = [], isLoading, error } = useQuery({
    queryKey: ['featuredCompetitions'],
    queryFn: () => CompetitionService.getAllCompetitions({ featured: true, limit: 5 }),
  });

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Competitions</h2>
            <p className="text-muted-foreground max-w-2xl">
              These competitions are currently trending with high participation and exciting prizes
            </p>
          </div>
          <Button variant="ghost" asChild className="mt-4 md:mt-0 group">
            <Link to="/competitions">
              View All
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-muted-foreground">Loading competitions...</p>
          </div>
        ) : error ? (
          <div className="bg-card/80 backdrop-blur-md shadow-sm rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-2">Failed to load competitions</h3>
            <p className="text-muted-foreground mb-4">
              There was an error loading the competitions. Please try again later.
            </p>
          </div>
        ) : competitions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions.map((competition, index) => (
              <CompetitionCard
                key={competition.id}
                {...competition}
                featured={index === 0}
              />
            ))}
          </div>
        ) : (
          <div className="bg-card/80 backdrop-blur-md shadow-sm rounded-lg p-8 text-center">
            <h3 className="text-lg font-medium mb-2">No competitions available</h3>
            <p className="text-muted-foreground mb-4">
              There are currently no featured competitions available. Check back later!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedCompetitions;
