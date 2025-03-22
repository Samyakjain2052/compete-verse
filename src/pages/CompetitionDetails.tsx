
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { 
  Clock, 
  Calendar, 
  Users, 
  Award, 
  Download, 
  FileText, 
  MessageSquare,
  ChevronRight,
  ChevronDown,
  AlertCircle,
  Info,
  Upload,
  ArrowLeft,
  Star,
  Medal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Mock competition data (in a real app, fetch this from API)
const mockCompetition = {
  id: "ml-vision-challenge",
  title: "ML Vision Challenge 2023",
  host: "TechCorp AI",
  hostLogo: "https://via.placeholder.com/50",
  deadlineDate: "October 15, 2023",
  startDate: "September 1, 2023",
  daysLeft: 5,
  maxAge: 25,
  participants: 342,
  category: "data-science",
  prize: "$10,000",
  overview: `
    <p>The ML Vision Challenge 2023 invites participants to develop cutting-edge computer vision algorithms that can accurately identify and classify objects in a diverse dataset of urban environments.</p>
    <p>Your task is to build a model that can identify and classify objects with the highest possible accuracy while maintaining efficient computational performance.</p>
  `,
  rules: `
    <ul>
      <li>Participants must be enrolled students under the age of 25.</li>
      <li>All submissions must include source code and a detailed methodology document.</li>
      <li>Submissions will be evaluated based on accuracy, efficiency, and innovation.</li>
      <li>Use of pre-trained models is allowed, but must be clearly documented.</li>
      <li>Teams of up to 3 participants are permitted.</li>
    </ul>
  `,
  datasets: [
    { id: "train-data", name: "Training Dataset", size: "1.2 GB", format: "CSV" },
    { id: "test-data", name: "Test Dataset", size: "350 MB", format: "CSV" },
    { id: "sample-submission", name: "Sample Submission", size: "5 KB", format: "CSV" }
  ],
  leaderboard: [
    { position: 1, name: "Alex Johnson", score: 0.9823, change: 0 },
    { position: 2, name: "Maria Smith", score: 0.9789, change: 2 },
    { position: 3, name: "Kevin Lee", score: 0.9754, change: -1 },
    { position: 4, name: "Sarah Williams", score: 0.9721, change: 1 },
    { position: 5, name: "David Chen", score: 0.9687, change: -2 },
    { position: 6, name: "Emma Thompson", score: 0.9645, change: 0 },
    { position: 7, name: "Michael Brown", score: 0.9612, change: 3 },
    { position: 8, name: "Jennifer Garcia", score: 0.9578, change: -1 },
    { position: 9, name: "James Wilson", score: 0.9534, change: 0 },
    { position: 10, name: "Olivia Martinez", score: 0.9501, change: 2 }
  ],
  discussion: [
    {
      id: "post-1",
      author: "TechCorp Admin",
      avatar: "https://via.placeholder.com/40",
      date: "September 15, 2023",
      content: "Welcome to the ML Vision Challenge! We're excited to see your innovative solutions. Use this forum to ask questions and share insights.",
      pinned: true,
      replies: []
    },
    {
      id: "post-2",
      author: "Sarah Williams",
      avatar: "https://via.placeholder.com/40",
      date: "September 20, 2023",
      content: "Is there a specific format required for the methodology document?",
      pinned: false,
      replies: [
        {
          id: "reply-1",
          author: "TechCorp Admin",
          avatar: "https://via.placeholder.com/40",
          date: "September 20, 2023",
          content: "We recommend a PDF format with clear sections on data preprocessing, model architecture, training approach, and evaluation metrics. Maximum 10 pages."
        }
      ]
    },
    {
      id: "post-3",
      author: "Kevin Lee",
      avatar: "https://via.placeholder.com/40",
      date: "September 25, 2023",
      content: "I'm noticing some inconsistencies in the training dataset labels. Specifically in the urban_scenes folder. Can someone confirm?",
      pinned: false,
      replies: [
        {
          id: "reply-2",
          author: "TechCorp Admin",
          avatar: "https://via.placeholder.com/40",
          date: "September 26, 2023",
          content: "Thanks for flagging this! We've verified and updated the training dataset. Please download the latest version from the resources section."
        }
      ]
    }
  ]
};

const CompetitionDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [competition, setCompetition] = useState(mockCompetition);
  const [joined, setJoined] = useState(false);
  const [showAgeWarning, setShowAgeWarning] = useState(false);
  
  // In a real app, fetch competition data based on ID
  useEffect(() => {
    // Example API call: fetchCompetition(id).then(data => setCompetition(data));
    console.log(`Fetching competition details for ID: ${id}`);
    // For now, just use the mock data
  }, [id]);
  
  // Handle join competition
  const handleJoinCompetition = () => {
    if (competition.maxAge) {
      setShowAgeWarning(true);
    } else {
      // In a real app, call API to join competition
      setJoined(true);
    }
  };
  
  // Confirm age and join
  const confirmAndJoin = () => {
    setShowAgeWarning(false);
    setJoined(true);
  };
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Calculate progress percentage
  const progress = Math.max(0, Math.min(100, (competition.daysLeft / 30) * 100));
  const isEnding = competition.daysLeft <= 3;
  
  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground intensity="light" />
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Back button */}
        <div className="container mx-auto px-4 md:px-6 py-6">
          <Link to="/competitions" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} className="mr-1" />
            Back to Competitions
          </Link>
        </div>
        
        {/* Competition header */}
        <header className="bg-secondary/50 py-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="space-y-4">
                {competition.maxAge && (
                  <span className="age-badge bg-primary/10 text-primary inline-block">
                    Under {competition.maxAge} Only
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold animate-fade-in">
                  {competition.title}
                </h1>
                <div className="flex items-center space-x-3">
                  <img 
                    src={competition.hostLogo} 
                    alt={competition.host} 
                    className="w-8 h-8 rounded-full bg-secondary"
                  />
                  <span className="text-muted-foreground">Hosted by <span className="text-foreground">{competition.host}</span></span>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar size={16} className="mr-1.5" />
                    Started: {competition.startDate}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock size={16} className="mr-1.5" />
                    Ends: {competition.deadlineDate}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users size={16} className="mr-1.5" />
                    {competition.participants} Participants
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Award size={16} className="mr-1.5" />
                    Prize: {competition.prize}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                {!joined ? (
                  <Button 
                    size="lg" 
                    onClick={handleJoinCompetition}
                    className="w-full md:w-auto"
                  >
                    Join Competition
                  </Button>
                ) : (
                  <Button variant="outline" size="lg" asChild className="w-full md:w-auto">
                    <Link to={`/competitions/${id}/submit`}>
                      Submit Solution
                    </Link>
                  </Button>
                )}
                
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Deadline</span>
                    <span className={cn(
                      "font-medium",
                      isEnding ? "text-destructive" : "text-primary"
                    )}>
                      {competition.daysLeft} {competition.daysLeft === 1 ? 'day' : 'days'} left
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
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 space-y-8">
                    <div className="card-glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Challenge Overview</h2>
                      <div className="prose prose-neutral dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: competition.overview }}></div>
                    </div>
                    
                    <div className="card-glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Rules & Requirements</h2>
                      <div className="prose prose-neutral dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: competition.rules }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="card-glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Timeline</h2>
                      <div className="space-y-4">
                        <div className="flex">
                          <div className="flex flex-col items-center mr-4">
                            <div className="w-3 h-3 bg-primary rounded-full"></div>
                            <div className="w-0.5 bg-border flex-grow mt-1"></div>
                          </div>
                          <div>
                            <p className="font-medium">Competition Start</p>
                            <p className="text-sm text-muted-foreground">{competition.startDate}</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex flex-col items-center mr-4">
                            <div className="w-3 h-3 bg-primary/50 rounded-full"></div>
                            <div className="w-0.5 bg-border flex-grow mt-1"></div>
                          </div>
                          <div>
                            <p className="font-medium">Mid-point Check-in</p>
                            <p className="text-sm text-muted-foreground">September 28, 2023</p>
                          </div>
                        </div>
                        
                        <div className="flex">
                          <div className="flex flex-col items-center mr-4">
                            <div className="w-3 h-3 bg-destructive rounded-full"></div>
                          </div>
                          <div>
                            <p className="font-medium">Submission Deadline</p>
                            <p className="text-sm text-muted-foreground">{competition.deadlineDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Prizes</h2>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                            <Medal size={20} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">1st Place</p>
                            <p className="text-muted-foreground">$10,000 + Internship opportunity</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                            <Medal size={20} className="text-primary/80" />
                          </div>
                          <div>
                            <p className="font-medium">2nd Place</p>
                            <p className="text-muted-foreground">$5,000 + Premium tech package</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                            <Medal size={20} className="text-primary/60" />
                          </div>
                          <div>
                            <p className="font-medium">3rd Place</p>
                            <p className="text-muted-foreground">$2,500 + Premium tech package</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">About the Host</h2>
                      <div className="flex items-center mb-4">
                        <img 
                          src={competition.hostLogo} 
                          alt={competition.host} 
                          className="w-12 h-12 rounded-full bg-secondary mr-3"
                        />
                        <h3 className="font-medium">{competition.host}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        TechCorp AI is a leading technology company specializing in artificial intelligence and machine learning solutions for enterprise applications.
                      </p>
                      <Button variant="outline" size="sm" className="w-full">
                        Visit Host Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Resources Tab */}
              <TabsContent value="resources" className="space-y-8 animate-fade-in">
                {!joined ? (
                  <div className="card-glass rounded-xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Download size={24} className="text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Join to Access Resources</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      You need to join this competition to download datasets and submission templates.
                    </p>
                    <Button onClick={handleJoinCompetition}>
                      Join Competition
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="card-glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-6">Competition Datasets</h2>
                      <div className="space-y-4">
                        {competition.datasets.map((dataset) => (
                          <div key={dataset.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                                <FileText size={18} className="text-primary" />
                              </div>
                              <div>
                                <p className="font-medium">{dataset.name}</p>
                                <p className="text-sm text-muted-foreground">{dataset.size} • {dataset.format}</p>
                              </div>
                            </div>
                            <Button variant="outline" size="sm">
                              <Download size={16} className="mr-2" />
                              Download
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="card-glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-4">Resource Preview</h2>
                      <div className="rounded-lg border border-border overflow-hidden">
                        <div className="bg-muted p-2 border-b border-border flex items-center justify-between">
                          <span className="text-sm font-medium">sample_train_data.csv (first 10 rows)</span>
                          <Button variant="ghost" size="sm">
                            <Download size={14} className="mr-1" />
                            Download Full File
                          </Button>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-sm">
                            <thead>
                              <tr className="bg-muted/50">
                                <th className="px-4 py-2 text-left font-medium">ID</th>
                                <th className="px-4 py-2 text-left font-medium">Image_Path</th>
                                <th className="px-4 py-2 text-left font-medium">Class</th>
                                <th className="px-4 py-2 text-left font-medium">X_Coord</th>
                                <th className="px-4 py-2 text-left font-medium">Y_Coord</th>
                                <th className="px-4 py-2 text-left font-medium">Width</th>
                                <th className="px-4 py-2 text-left font-medium">Height</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[...Array(5)].map((_, i) => (
                                <tr key={i} className={i % 2 === 0 ? "bg-background" : "bg-background/50"}>
                                  <td className="px-4 py-2 border-t border-border">{i + 1}</td>
                                  <td className="px-4 py-2 border-t border-border">images/train/{1000 + i}.jpg</td>
                                  <td className="px-4 py-2 border-t border-border">{["car", "pedestrian", "bicycle", "truck", "bus"][i % 5]}</td>
                                  <td className="px-4 py-2 border-t border-border">{Math.floor(Math.random() * 500)}</td>
                                  <td className="px-4 py-2 border-t border-border">{Math.floor(Math.random() * 500)}</td>
                                  <td className="px-4 py-2 border-t border-border">{Math.floor(Math.random() * 100) + 50}</td>
                                  <td className="px-4 py-2 border-t border-border">{Math.floor(Math.random() * 100) + 50}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card-glass rounded-xl p-6">
                      <h2 className="text-xl font-semibold mb-6">Submission Guidelines</h2>
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Info size={18} className="text-primary mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium">File Format</p>
                            <p className="text-sm text-muted-foreground">Your submission should be a CSV file formatted according to the sample submission template.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Info size={18} className="text-primary mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Evaluation Metric</p>
                            <p className="text-sm text-muted-foreground">Submissions are evaluated using Mean Average Precision (mAP) at IoU=0.5.</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Info size={18} className="text-primary mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <p className="font-medium">Submission Limit</p>
                            <p className="text-sm text-muted-foreground">You can make up to 5 submissions per day, with a maximum of 50 total submissions.</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-border rounded-lg mt-6 bg-secondary/30 p-4">
                        <div className="flex items-center">
                          <Upload size={18} className="text-primary mr-3" />
                          <h3 className="font-medium">Ready to Submit Your Solution?</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 mb-4">
                          Make sure your submission follows all the guidelines and is properly formatted.
                        </p>
                        <Button asChild>
                          <Link to={`/competitions/${id}/submit`}>
                            Submit Solution
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              {/* Leaderboard Tab */}
              <TabsContent value="leaderboard" className="animate-fade-in">
                <div className="card-glass rounded-xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Current Standings</h2>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        Updated: 2 hours ago
                      </div>
                      <select className="text-sm bg-secondary rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary">
                        <option>Public Leaderboard</option>
                        <option>Private Leaderboard</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b border-border">
                          <th className="px-4 py-3 font-medium">Rank</th>
                          <th className="px-4 py-3 font-medium">Participant</th>
                          <th className="px-4 py-3 font-medium text-right">Score</th>
                          <th className="px-4 py-3 font-medium text-right">Submissions</th>
                          <th className="px-4 py-3 font-medium text-right">Last Submission</th>
                        </tr>
                      </thead>
                      <tbody>
                        {competition.leaderboard.map((entry, index) => (
                          <tr 
                            key={index} 
                            className={cn(
                              "border-b border-border",
                              index < 3 ? "bg-primary/5" : "hover:bg-secondary/50"
                            )}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <span className={cn(
                                  "font-medium",
                                  index === 0 ? "text-yellow-500" : 
                                  index === 1 ? "text-gray-400" : 
                                  index === 2 ? "text-amber-600" : ""
                                )}>
                                  {entry.position}
                                </span>
                                {entry.change !== 0 && (
                                  <span className={cn(
                                    "ml-2 text-xs",
                                    entry.change > 0 ? "text-green-500" : "text-red-500"
                                  )}>
                                    {entry.change > 0 ? `↑${entry.change}` : `↓${Math.abs(entry.change)}`}
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                <div className="w-8 h-8 bg-secondary/80 rounded-full flex items-center justify-center mr-3">
                                  {entry.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <span className="font-medium">{entry.name}</span>
                                {index < 3 && (
                                  <div className="ml-2">
                                    {index === 0 && <Star size={16} className="text-yellow-500 fill-yellow-500" />}
                                    {index === 1 && <Star size={16} className="text-gray-400 fill-gray-400" />}
                                    {index === 2 && <Star size={16} className="text-amber-600 fill-amber-600" />}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-right font-mono">{entry.score.toFixed(4)}</td>
                            <td className="px-4 py-3 text-right">{Math.floor(Math.random() * 20) + 5}</td>
                            <td className="px-4 py-3 text-right text-muted-foreground">{Math.floor(Math.random() * 23) + 1}h ago</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  <div className="flex justify-between items-center mt-6">
                    <div className="text-sm text-muted-foreground">
                      Showing 1-10 of 342 participants
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" disabled>
                        Previous
                      </Button>
                      <Button variant="outline" size="sm">
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              {/* Discussion Tab */}
              <TabsContent value="discussion" className="space-y-6 animate-fade-in">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Discussion Forum</h2>
                  <Button>
                    Start New Topic
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {competition.discussion.map((post) => (
                    <div 
                      key={post.id} 
                      className={cn(
                        "card-glass rounded-xl p-6",
                        post.pinned && "border-l-4 border-l-primary"
                      )}
                    >
                      {post.pinned && (
                        <div className="flex items-center text-primary text-sm font-medium mb-3">
                          <Info size={14} className="mr-1.5" />
                          Pinned by moderator
                        </div>
                      )}
                      
                      <div className="flex items-start">
                        <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full mr-3" />
                        <div className="flex-grow">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium">{post.author}</h4>
                            <span className="text-xs text-muted-foreground">{post.date}</span>
                          </div>
                          <p className="text-sm mb-4">{post.content}</p>
                          
                          {/* Reply button */}
                          <Button variant="ghost" size="sm" className="text-xs">
                            <MessageSquare size={14} className="mr-1.5" />
                            Reply
                          </Button>
                          
                          {/* Replies */}
                          {post.replies.length > 0 && (
                            <div className="mt-4 pl-6 border-l border-border">
                              {post.replies.map((reply) => (
                                <div key={reply.id} className="mb-4 last:mb-0">
                                  <div className="flex items-start">
                                    <img src={reply.avatar} alt={reply.author} className="w-8 h-8 rounded-full mr-3" />
                                    <div>
                                      <div className="flex items-center mb-1">
                                        <h5 className="text-sm font-medium">{reply.author}</h5>
                                        <span className="text-xs text-muted-foreground ml-2">{reply.date}</span>
                                      </div>
                                      <p className="text-sm">{reply.content}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Load more */}
                <div className="text-center">
                  <Button variant="outline">
                    Load More
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
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
      
      {/* Age verification modal */}
      {showAgeWarning && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-xl shadow-lg w-full max-w-md animate-fade-in">
            <div className="p-6">
              <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} className="text-destructive" />
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Age Verification Required</h3>
              <p className="text-center text-muted-foreground mb-6">
                This competition is restricted to participants under {competition.maxAge} years old. You'll need to verify your age by uploading an ID document.
              </p>
              <div className="flex flex-col space-y-2">
                <Button onClick={confirmAndJoin}>
                  Continue to Verification
                </Button>
                <Button variant="ghost" onClick={() => setShowAgeWarning(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitionDetails;
