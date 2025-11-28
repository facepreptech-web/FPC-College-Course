import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "lucide-react";
import { SemesterTopic } from "@/data/collegesData";

interface SemesterAccordionProps {
  semesters: SemesterTopic[];
}

export const SemesterAccordion = ({ semesters }: SemesterAccordionProps) => {
  return (
    <Accordion type="single" collapsible className="space-y-4">
      {semesters.map((semester) => (
        <AccordionItem
          key={semester.semester}
          value={`semester-${semester.semester}`}
          className="border-2 border-border rounded-2xl overflow-hidden hover:border-accent/50 transition-colors bg-card"
        >
          <AccordionTrigger className="px-6 py-4 hover:no-underline group">
            <div className="flex items-center gap-4 text-left">
              <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center shadow-orange flex-shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                  Semester {semester.semester}
                </h4>
                <p className="text-sm text-muted-foreground">Click to view topics</p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            <div className="pt-4 border-t border-border">
              <div className="prose prose-sm max-w-none">
                <p className="text-foreground whitespace-pre-line leading-relaxed">
                  {semester.topics}
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
