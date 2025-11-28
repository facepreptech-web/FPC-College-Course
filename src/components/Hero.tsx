import { Sparkles } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 md:pt-36 md:pb-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-secondary/20 blur-3xl animate-pulse delay-700" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Discover Your Academic Journey
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
            Explore Your{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Course Curriculum
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose your college → select your course → discover semester-wise topics and certifications
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/colleges"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary via-secondary to-accent rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent via-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-foreground bg-card rounded-full border-2 border-border hover:border-primary transition-all duration-300 hover:scale-105"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
