
import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CompetitionCard from "./CompetitionCard";
import { Link } from "react-router-dom";

// Mock data for featured competitions
const featuredCompetitions = [
  {
    id: "ml-vision-challenge",
    title: "ML Vision Challenge 2023",
    host: "TechCorp AI",
    deadlineDate: "October 15, 2023",
    daysLeft: 5,
    maxAge: 25,
    participants: 342,
    topUsers: [
      { name: "Alex J.", position: 1 },
      { name: "Maria S.", position: 2 },
      { name: "Kevin L.", position: 3 },
    ]
  },
  {
    id: "data-analytics-comp",
    title: "Global Data Analytics Competition",
    host: "DataMinds Inc.",
    deadlineDate: "November 20, 2023",
    daysLeft: 21,
    participants: 189,
    topUsers: [
      { name: "Sarah P.", position: 1 },
      { name: "John D.", position: 2 },
      { name: "Lisa M.", position: 3 },
    ]
  },
  {
    id: "crypto-algo-challenge",
    title: "Cryptocurrency Algorithm Challenge",
    host: "BlockChain Partners",
    deadlineDate: "December 5, 2023",
    daysLeft: 30,
    maxAge: 30,
    participants: 267,
    topUsers: [
      { name: "Michael T.", position: 1 },
      { name: "Anna K.", position: 2 },
      { name: "David R.", position: 3 },
    ]
  },
  {
    id: "sustainable-dev-hackathon",
    title: "Sustainable Development Hackathon",
    host: "EcoTech Foundation",
    deadlineDate: "November 1, 2023",
    daysLeft: 7,
    participants: 156,
    maxAge: 27,
    topUsers: [
      { name: "Chris L.", position: 1 },
      { name: "Emma W.", position: 2 },
      { name: "Ryan P.", position: 3 },
    ]
  },
  {
    id: "nlp-innovation",
    title: "NLP Innovation Prize",
    host: "LanguageTech AI",
    deadlineDate: "November 30, 2023",
    daysLeft: 25,
    participants: 210,
    topUsers: [
      { name: "Daniel K.", position: 1 },
      { name: "Olivia S.", position: 2 },
      { name: "James H.", position: 3 },
    ]
  }
];

const FeaturedCompetitions: React.FC = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCompetitions.map((competition, index) => (
            <CompetitionCard
              key={competition.id}
              {...competition}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompetitions;
