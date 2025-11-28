import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import logo from "@/logo/logo.svg";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 gap-2 sm:gap-3 md:gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 min-w-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <img 
                src={logo} 
                alt="FACEPrep Campus Logo" 
                className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex-shrink-0 object-contain"
              />
              <div className="min-w-0 hidden sm:block">
                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent whitespace-nowrap">
                  FACEPrep Campus
                </h1>
                <p className="text-xs text-muted-foreground hidden md:block">Explore Your Curriculum</p>
              </div>
            </Link>
          </div>
          
          {/* Right Side - Navigation and Search */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 flex-1 justify-end min-w-0">
            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6 flex-shrink-0">
              <Link
                to="/colleges"
                className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              >
                Colleges
              </Link>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  const contactElement = document.getElementById("contact");
                  if (contactElement) {
                    contactElement.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="text-sm font-medium hover:text-primary transition-colors whitespace-nowrap"
              >
                Contact
              </a>
            </nav>
            
            {/* Search Bar */}
            <div className="relative flex-shrink-0 min-w-0 w-full max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[280px]">
              <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground pointer-events-none" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-7 sm:pl-9 md:pl-10 bg-background/50 border-border/50 focus:border-primary h-8 sm:h-9 text-xs sm:text-sm w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
