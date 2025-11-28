import { useState, useMemo } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { CourseCard } from "@/components/CourseCard";
import { SemesterView } from "@/components/SemesterView";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useColleges } from "@/context/CollegesContext";
import { College, Course } from "@/data/collegesData";

const CollegeDetail = () => {
  const { colleges } = useColleges();
  const navigate = useNavigate();
  const { collegeName } = useParams<{ collegeName: string }>();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  // Get college from state or find by name
  const college = useMemo(() => {
    if (location.state?.college) {
      return location.state.college as College;
    }
    if (!collegeName) return undefined;
    try {
      const decodedName = decodeURIComponent(collegeName);
      return colleges.find((c) => c.name === decodedName);
    } catch (error) {
      console.error("Error decoding college name:", error);
      return undefined;
    }
  }, [collegeName, location.state, colleges]);

  // Get all courses for filter
  const allCourses = useMemo(() => {
    const courses = new Set<string>();
    colleges.forEach((college) => {
      college.courses.forEach((course) => courses.add(course.name));
    });
    return Array.from(courses).sort();
  }, [colleges]);

  // Filter courses
  const filteredCourses = useMemo(() => {
    if (!college) return [];
    
    return college.courses.filter((course) => {
      const matchesSearch =
        searchQuery === "" ||
        course.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCourseFilter =
        selectedCourses.length === 0 || selectedCourses.includes(course.name);

      return matchesSearch && matchesCourseFilter;
    });
  }, [college, searchQuery, selectedCourses]);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleBackToColleges = () => {
    navigate("/colleges");
  };

  const handleBackToCourses = () => {
    setSelectedCourse(null);
  };

  const handleCourseToggle = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  if (!college) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">College not found</h1>
          <Button onClick={() => navigate("/colleges")}>Back to Colleges</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 pt-16 sm:pt-20 md:pt-24">
        {!selectedCourse ? (
          <section className="space-y-6 sm:space-y-8 animate-slide-in">
            {/* Header Section */}
            <div className="flex items-start gap-3 sm:gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleBackToColleges}
                className="rounded-full flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <div className="min-w-0 flex-1 space-y-2">
                <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-foreground break-words leading-tight">
                  {college.name}
                </h1>
                <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground">
                  <span>{college.location}</span>
                  <span>•</span>
                  <span>{college.courses.length} {college.courses.length === 1 ? "Course" : "Courses"}</span>
                </div>
              </div>
            </div>
            
            {/* Courses Section */}
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-foreground">
                Available Courses
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <CourseCard
                      key={course.name}
                      name={course.name}
                      semestersCount={course.semesters.length}
                      onClick={() => handleCourseClick(course)}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground text-base sm:text-lg">
                      No courses found matching your criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </section>
        ) : (
          <section className="space-y-6 sm:space-y-8 animate-slide-in max-w-5xl mx-auto">
            {/* Course Header */}
            <div className="flex items-start gap-3 sm:gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={handleBackToCourses}
                className="rounded-full flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 hover:bg-primary/10"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <div className="min-w-0 flex-1 space-y-2">
                <h1 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl font-bold text-foreground break-words leading-tight">
                  {selectedCourse.name}
                </h1>
                <div className="flex items-center gap-2 text-sm sm:text-base text-muted-foreground flex-wrap">
                  <span>{college.name}</span>
                  <span>•</span>
                  <span>{college.location}</span>
                </div>
              </div>
            </div>
            
            {/* Semesters Section */}
            <div className="space-y-4 sm:space-y-5">
              <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-foreground">
                Semester-wise Curriculum
              </h2>
              <SemesterView semesters={selectedCourse.semesters} />
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CollegeDetail;

