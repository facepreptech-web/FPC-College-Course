import { Building2, MapPin, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CollegeCardProps {
  name: string;
  location: string;
  coursesCount: number;
  onClick: () => void;
}

export const CollegeCard = ({ name, location, coursesCount, onClick }: CollegeCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group relative p-5 sm:p-6 md:p-7 cursor-pointer hover-glow border-2 hover:border-primary/50 transition-all duration-300 bg-card overflow-hidden h-full flex flex-col hover:shadow-lg hover:shadow-primary/10"
    >
      {/* Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-primary" />
      
      <div className="space-y-3 sm:space-y-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl gradient-primary flex items-center justify-center shadow-magenta group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <Building2 className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
        </div>
        
        <div className="space-y-2 min-w-0 flex-1">
          <h3 className="text-lg sm:text-xl md:text-xl font-bold text-foreground group-hover:text-primary transition-colors break-words leading-tight">
            {name}
          </h3>
          <div className="flex items-center gap-2 text-xs sm:text-sm md:text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-border mt-auto">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">
            {coursesCount} {coursesCount === 1 ? "Course" : "Courses"} Available
          </p>
        </div>
      </div>
    </Card>
  );
};
