
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import CompetitionCard from "@/components/CompetitionCard";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Search, Filter, X, Calendar, Users, Clock, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data for competitions
const mockCompetitions = [
  {
    id: "ml-vision-challenge",
    title: "ML Vision Challenge 2023",
    host: "TechCorp AI",
    deadlineDate: "October 15, 2023",
    daysLeft: 5,
    maxAge: 25,
    participants: 342,
    category: "data-science",
    topUsers: [{ name: "Alex J.", position: 1 }, { name: "Maria S.", position: 2 }, { name: "Kevin L.", position: 3 }]
  },
  {
    id: "data-analytics-comp",
    title: "Global Data Analytics Competition",
    host: "DataMinds Inc.",
    deadlineDate: "November 20, 2023",
    daysLeft: 21,
    participants: 189,
    category: "data-science",
    topUsers: [{ name: "Sarah P.", position: 1 }, { name: "John D.", position: 2 }, { name: "Lisa M.", position: 3 }]
  },
  {
    id: "crypto-algo-challenge",
    title: "Cryptocurrency Algorithm Challenge",
    host: "BlockChain Partners",
    deadlineDate: "December 5, 2023",
    daysLeft: 30,
    maxAge: 30,
    participants: 267,
    category: "software-development",
    topUsers: [{ name: "Michael T.", position: 1 }, { name: "Anna K.", position: 2 }, { name: "David R.", position: 3 }]
  },
  {
    id: "sustainable-dev-hackathon",
    title: "Sustainable Development Hackathon",
    host: "EcoTech Foundation",
    deadlineDate: "November 1, 2023",
    daysLeft: 7,
    participants: 156,
    maxAge: 27,
    category: "software-development",
    topUsers: [{ name: "Chris L.", position: 1 }, { name: "Emma W.", position: 2 }, { name: "Ryan P.", position: 3 }]
  },
  {
    id: "nlp-innovation",
    title: "NLP Innovation Prize",
    host: "LanguageTech AI",
    deadlineDate: "November 30, 2023",
    daysLeft: 25,
    participants: 210,
    category: "data-science",
    topUsers: [{ name: "Daniel K.", position: 1 }, { name: "Olivia S.", position: 2 }, { name: "James H.", position: 3 }]
  },
  {
    id: "web3-development",
    title: "Web3 Development Challenge",
    host: "Blockchain Association",
    deadlineDate: "December 15, 2023",
    daysLeft: 40,
    participants: 178,
    category: "software-development",
    topUsers: [{ name: "Thomas R.", position: 1 }, { name: "Sophie L.", position: 2 }, { name: "Ethan M.", position: 3 }]
  },
  {
    id: "financial-case-study",
    title: "Financial Markets Case Study",
    host: "Global Finance Institute",
    deadlineDate: "November 10, 2023",
    daysLeft: 15,
    maxAge: 26,
    participants: 124,
    category: "case-studies",
    topUsers: [{ name: "Amanda B.", position: 1 }, { name: "Robert C.", position: 2 }, { name: "Eliza J.", position: 3 }]
  },
  {
    id: "healthcare-innovation",
    title: "Healthcare Innovation Challenge",
    host: "MedTech Innovators",
    deadlineDate: "January 5, 2024",
    daysLeft: 60,
    participants: 142,
    category: "case-studies",
    topUsers: [{ name: "William H.", position: 1 }, { name: "Grace T.", position: 2 }, { name: "Nathan P.", position: 3 }]
  },
  {
    id: "mobile-app-challenge",
    title: "Mobile App Development Challenge",
    host: "AppWorld Conference",
    deadlineDate: "November 25, 2023",
    daysLeft: 28,
    participants: 203,
    category: "software-development",
    topUsers: [{ name: "Oliver S.", position: 1 }, { name: "Mia L.", position: 2 }, { name: "Lucas K.", position: 3 }]
  },
  {
    id: "quantum-computing",
    title: "Quantum Computing Hackathon",
    host: "Quantum Research Labs",
    deadlineDate: "December 20, 2023",
    daysLeft: 45,
    maxAge: 28,
    participants: 89,
    category: "data-science",
    topUsers: [{ name: "Benjamin F.", position: 1 }, { name: "Charlotte D.", position: 2 }, { name: "Henry A.", position: 3 }]
  }
];

type FilterType = {
  searchTerm: string;
  category: string | null;
  ageRestriction: boolean;
  deadline: string | null;
};

const Competitions: React.FC = () => {
  const [competitions, setCompetitions] = useState(mockCompetitions);
  const [filters, setFilters] = useState<FilterType>({
    searchTerm: "",
    category: null,
    ageRestriction: false,
    deadline: null,
  });
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories
  const categories = [
    { id: "data-science", name: "Data Science" },
    { id: "software-development", name: "Software Development" },
    { id: "case-studies", name: "Case Studies" },
  ];
  
  // Deadline options
  const deadlineOptions = [
    { id: "week", name: "Next 7 days" },
    { id: "month", name: "Next 30 days" },
    { id: "all", name: "All" },
  ];
  
  // Apply filters
  useEffect(() => {
    let filtered = [...mockCompetitions];
    
    // Search term
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(comp => 
        comp.title.toLowerCase().includes(searchLower) || 
        comp.host.toLowerCase().includes(searchLower)
      );
    }
    
    // Category
    if (filters.category) {
      filtered = filtered.filter(comp => comp.category === filters.category);
    }
    
    // Age restriction
    if (filters.ageRestriction) {
      filtered = filtered.filter(comp => comp.maxAge !== undefined);
    }
    
    // Deadline
    if (filters.deadline) {
      if (filters.deadline === "week") {
        filtered = filtered.filter(comp => comp.daysLeft <= 7);
      } else if (filters.deadline === "month") {
        filtered = filtered.filter(comp => comp.daysLeft <= 30);
      }
    }
    
    setCompetitions(filtered);
  }, [filters]);
  
  // Reset filters
  const resetFilters = () => {
    setFilters({
      searchTerm: "",
      category: null,
      ageRestriction: false,
      deadline: null,
    });
  };
  
  // Handle search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      searchTerm: e.target.value,
    });
  };
  
  // Apply a filter
  const applyFilter = (type: keyof FilterType, value: any) => {
    setFilters({
      ...filters,
      [type]: filters[type] === value ? null : value,
    });
  };
  
  // Check if any filters are active
  const hasActiveFilters = filters.category !== null || filters.ageRestriction || filters.deadline !== null;
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground intensity="light" />
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Header */}
        <header className="bg-secondary/50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
              Explore Competitions
            </h1>
            <p className="text-muted-foreground max-w-2xl mb-8 animate-fade-in animate-delay-100">
              Discover challenges from leading organizations and showcase your skills to the world
            </p>
            
            {/* Search and filter bar */}
            <div className="bg-card/80 backdrop-blur-md shadow-sm rounded-lg p-4 animate-slide-up animate-delay-200">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by title or host..."
                    value={filters.searchTerm}
                    onChange={handleSearchChange}
                    className="pl-10 pr-4 py-2 h-10 text-sm rounded-md bg-secondary w-full focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant={showFilters ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="gap-2"
                  >
                    <Filter size={16} />
                    Filters
                    {hasActiveFilters && (
                      <span className="ml-1 w-2 h-2 rounded-full bg-primary"></span>
                    )}
                  </Button>
                  
                  {hasActiveFilters && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={resetFilters}
                      className="gap-1 text-muted-foreground"
                    >
                      <X size={14} />
                      Clear
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Filter options */}
              <div className={cn(
                "grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 overflow-hidden transition-all",
                showFilters ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}>
                {/* Category filter */}
                <div>
                  <div className="flex items-center text-sm font-medium mb-2">
                    <SlidersHorizontal size={14} className="mr-2" />
                    Category
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.id}
                        variant={filters.category === category.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => applyFilter("category", category.id)}
                        className="text-xs"
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Deadline filter */}
                <div>
                  <div className="flex items-center text-sm font-medium mb-2">
                    <Calendar size={14} className="mr-2" />
                    Deadline
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {deadlineOptions.map((option) => (
                      <Button
                        key={option.id}
                        variant={filters.deadline === option.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => applyFilter("deadline", option.id)}
                        className="text-xs"
                      >
                        {option.name}
                      </Button>
                    ))}
                  </div>
                </div>
                
                {/* Age filter */}
                <div>
                  <div className="flex items-center text-sm font-medium mb-2">
                    <Users size={14} className="mr-2" />
                    Other Filters
                  </div>
                  <Button
                    variant={filters.ageRestriction ? "default" : "outline"}
                    size="sm"
                    onClick={() => applyFilter("ageRestriction", !filters.ageRestriction)}
                    className="text-xs"
                  >
                    Has Age Restriction
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Competition listing */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            {/* Results info */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{competitions.length}</span> competitions
                {hasActiveFilters && " with applied filters"}
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sort by:</span>
                <select className="bg-secondary rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>Deadline (Soonest)</option>
                  <option>Newest</option>
                  <option>Most Participants</option>
                </select>
              </div>
            </div>
            
            {competitions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                {competitions.map((competition) => (
                  <CompetitionCard
                    key={competition.id}
                    {...competition}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-card/80 backdrop-blur-md shadow-sm rounded-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary mb-4">
                  <Search size={24} className="text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No competitions found</h3>
                <p className="text-muted-foreground mb-4">
                  We couldn't find any competitions matching your search criteria.
                </p>
                <Button variant="outline" onClick={resetFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Bolt.new. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground">Terms</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Privacy</a>
              <a href="#" className="text-muted-foreground hover:text-foreground">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Competitions;
