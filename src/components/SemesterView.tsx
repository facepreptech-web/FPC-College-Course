import { Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SemesterTopic } from "@/data/collegesData";

interface SemesterViewProps {
  semesters: SemesterTopic[];
}

export const SemesterView = ({ semesters }: SemesterViewProps) => {
  return (
    <div className="space-y-4 sm:space-y-5 w-full">
      {semesters.map((semester) => (
        <Card
          key={semester.semester}
          className="group p-5 sm:p-6 md:p-6 lg:p-7 border-2 border-border hover:border-accent/50 transition-all duration-300 bg-card w-full hover:shadow-lg hover:shadow-accent/10"
        >
          <div className="flex items-start gap-4 sm:gap-5 lg:gap-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl gradient-accent flex items-center justify-center shadow-orange flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
              <Calendar className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
            </div>
            <div className="flex-1 space-y-3 sm:space-y-4 min-w-0">
              <h4 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-foreground">
                Semester {semester.semester}
              </h4>
              <div className="prose prose-sm sm:prose-base max-w-none">
                <p className="text-sm sm:text-base md:text-base lg:text-lg text-foreground/90 whitespace-pre-line leading-relaxed break-words">
                  {semester.topics}
                </p>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
