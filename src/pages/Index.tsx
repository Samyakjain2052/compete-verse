
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturedCompetitions from "@/components/FeaturedCompetitions";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Briefcase, Globe, Award, ArrowRight, Database, Code, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ChatbotButton from "@/components/ChatbotButton";

const Index: React.FC = () => {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground intensity="light" />
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        <FeaturedCompetitions />
        
        {/* How It Works Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Bolt.new makes it easy to participate in challenges and get discovered by top organizations
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Discover Competitions</h3>
                <p className="text-muted-foreground">
                  Browse through challenges posted by leading organizations and companies
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Submit Solutions</h3>
                <p className="text-muted-foreground">
                  Download resources, work on challenges, and upload your submissions
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-medium mb-2">Get Recognized</h3>
                <p className="text-muted-foreground">
                  Climb the leaderboard and get noticed by potential employers
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* For Students / For Organizations Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="card-glass p-8 rounded-xl">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">For Students</h3>
                  <p className="text-muted-foreground mb-6">
                    Showcase your skills, build your portfolio, and get discovered by top companies
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Access real-world challenges from leading companies",
                    "Build a portfolio of verified achievements",
                    "Get direct feedback from industry experts",
                    "Connect with potential employers",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 mr-3">
                        <span className="h-2 w-2 rounded-full bg-primary"></span>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild className="w-full">
                  <Link to="/register?role=student">
                    Join as a Student
                  </Link>
                </Button>
              </div>
              
              <div className="card-glass p-8 rounded-xl">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">For Organizations</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with top talent, crowdsource innovation, and enhance your recruitment
                  </p>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Identify exceptional talent through skill-based assessment",
                    "Promote your brand to a global audience of students",
                    "Crowdsource innovative solutions to real challenges",
                    "Streamline your recruitment process",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center mt-0.5 mr-3">
                        <span className="h-2 w-2 rounded-full bg-accent"></span>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to="/register?role=organization">
                    Join as an Organization
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Competition Types Section */}
        <section className="py-20 bg-secondary/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Competition Categories</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                From data science to software development, we host a wide range of challenges
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Database className="h-6 w-6" />,
                  title: "Data Science",
                  description: "Analyze complex datasets, build predictive models, and extract actionable insights",
                  color: "primary",
                },
                {
                  icon: <Code className="h-6 w-6" />,
                  title: "Software Development",
                  description: "Design and build innovative applications, APIs, and software solutions",
                  color: "accent",
                },
                {
                  icon: <FileQuestion className="h-6 w-6" />,
                  title: "Case Studies",
                  description: "Develop strategies and solutions for real-world business problems",
                  color: "primary",
                },
              ].map((category, i) => (
                <div key={i} className="card-glass p-6 rounded-xl transition-all duration-300 hover:translate-y-[-4px]">
                  <div className={`w-12 h-12 rounded-full bg-${category.color}/10 flex items-center justify-center mb-4 text-${category.color}`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2">{category.title}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  <Button variant="ghost" size="sm" asChild className="group">
                    <Link to={`/competitions?category=${category.title.toLowerCase().replace(' ', '-')}`}>
                      Explore {category.title} Competitions
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative rounded-xl overflow-hidden card-glass">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 animate-pulse-slow"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Showcase Your Skills?</h2>
                  <p className="text-muted-foreground max-w-xl mb-6">
                    Join thousands of students competing globally and get discovered by top organizations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" asChild>
                      <Link to="/competitions">
                        Browse Competitions
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/register">
                        Create Account
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="flex-shrink-0 w-32 h-32 relative">
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-slow"></div>
                  <div className="absolute inset-4 bg-accent/10 rounded-full animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Award className="h-12 w-12 text-primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 bg-primary rounded-md rotate-45"></div>
                  <div className="absolute inset-0.5 bg-background rounded-md rotate-45"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-primary font-bold">B</span>
                  </div>
                </div>
                <span className="font-bold text-xl">Bolt<span className="text-primary">.new</span></span>
              </div>
              <p className="text-muted-foreground text-sm mb-4">
                The premier platform for student competitions and talent discovery.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/competitions" className="text-muted-foreground hover:text-foreground">Competitions</Link></li>
                <li><Link to="/leaderboard" className="text-muted-foreground hover:text-foreground">Leaderboard</Link></li>
                <li><Link to="/categories" className="text-muted-foreground hover:text-foreground">Categories</Link></li>
                <li><Link to="/hosts" className="text-muted-foreground hover:text-foreground">Host Organizations</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link to="/careers" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
                <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
                <li><Link to="/cookies" className="text-muted-foreground hover:text-foreground">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-8 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
            <p>© {new Date().getFullYear()} Bolt.new. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground">Twitter</a>
              <a href="#" className="hover:text-foreground">LinkedIn</a>
              <a href="#" className="hover:text-foreground">Instagram</a>
              <a href="#" className="hover:text-foreground">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Chatbot Button */}
      <ChatbotButton />
    </div>
  );
};

export default Index;
