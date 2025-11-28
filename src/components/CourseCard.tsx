import { BookOpen, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CourseCardProps {
  name: string;
  semestersCount: number;
  onClick: () => void;
}

export const CourseCard = ({ name, semestersCount, onClick }: CourseCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="group relative p-5 sm:p-6 md:p-7 cursor-pointer hover-glow border-2 hover:border-secondary/50 transition-all duration-300 bg-card overflow-hidden h-full flex flex-col hover:shadow-lg hover:shadow-secondary/10"
    >
      {/* Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-1 gradient-secondary" />
      
      <div className="space-y-3 sm:space-y-4 flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl gradient-secondary flex items-center justify-center shadow-pink group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
            <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
          </div>
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
        </div>
        
        <div className="space-y-2 min-w-0 flex-1">
          <h3 className="text-base sm:text-lg md:text-lg font-bold text-foreground group-hover:text-secondary transition-colors break-words line-clamp-3 leading-tight">
            {name}
          </h3>
        </div>
        
        <div className="pt-3 border-t border-border mt-auto">
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">
            {semestersCount} Semesters
          </p>
        </div>
      </div>
    </Card>
  );
};
