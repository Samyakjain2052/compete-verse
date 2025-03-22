
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Menu, X, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Competitions", path: "/competitions" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "About", path: "/about" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        scrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              aria-label="Go to homepage"
            >
              <div className="relative w-8 h-8">
                <div className="absolute inset-0 bg-primary rounded-md rotate-45 animate-pulse-slow"></div>
                <div className="absolute inset-0.5 bg-background rounded-md rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-primary font-bold">S</span>
                </div>
              </div>
              <span className="font-bold text-xl">Saggle<span className="text-primary">.new</span></span>
            </Link>
            
            <nav className="hidden md:flex ml-10 space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.path)
                      ? "text-primary"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search competitions..."
                className="pl-10 pr-4 py-2 h-9 text-sm rounded-full bg-secondary focus:outline-none focus:ring-1 focus:ring-primary w-[200px] transition-all duration-300 ease-in-out focus:w-[280px]"
              />
            </div>
            
            <div className="hidden md:flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="text-sm font-medium">
                Sign In
              </Button>
              <Button size="sm" className="text-sm font-medium">
                Sign Up
              </Button>
            </div>
            
            <div className="hidden md:flex items-center">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User size={18} />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden absolute top-16 inset-x-0 transition-all duration-300 ease-in-out transform",
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="bg-card/80 backdrop-blur-md shadow-lg border-b border-border p-4">
          <div className="flex items-center mb-4">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input
              type="text"
              placeholder="Search competitions..."
              className="w-full px-3 py-2 text-sm rounded-md bg-secondary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-3 py-3 rounded-md text-sm font-medium transition-colors",
                  isActive(link.path)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-primary/5"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-border">
            <Button variant="outline" size="sm" className="w-full text-sm">
              Sign In
            </Button>
            <Button size="sm" className="w-full text-sm">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
