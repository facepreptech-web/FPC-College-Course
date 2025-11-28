import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { CollegeCard } from "@/components/CollegeCard";
import { FilterDropdown } from "@/components/FilterDropdown";
import { Footer } from "@/components/Footer";
import { useColleges } from "@/context/CollegesContext";
import { College } from "@/data/collegesData";

const Colleges = () => {
  const { colleges } = useColleges();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedColleges, setSelectedColleges] = useState<string[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [locationFilter, setLocationFilter] = useState<string[]>([]);

  // Get unique college and course names for filters
  const allColleges = useMemo(() => {
    return Array.from(new Set(colleges.map((c) => c.name))).sort();
  }, [colleges]);

  const allCourses = useMemo(() => {
    const courses = new Set<string>();
    colleges.forEach((college) => {
      college.courses.forEach((course) => courses.add(course.name));
    });
    return Array.from(courses).sort();
  }, [colleges]);

  const allLocations = useMemo(() => {
    return Array.from(new Set(colleges.map((c) => c.location))).sort();
  }, [colleges]);

  // Filter colleges based on search and filters
  const filteredColleges = useMemo(() => {
    // If no colleges data, return empty array
    if (!colleges || colleges.length === 0) {
      return [];
    }

    return colleges.filter((college) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        college.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        college.courses.some((course) =>
          course.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      // College filter - if nothing selected, show all
      const matchesCollegeFilter =
        selectedColleges.length === 0 || selectedColleges.includes(college.name);

      // Course filter - if nothing selected, show all
      const matchesCourseFilter =
        selectedCourses.length === 0 ||
        college.courses.some((course) => selectedCourses.includes(course.name));

      // Location filter - if nothing selected, show all
      const matchesLocationFilter =
        locationFilter.length === 0 || locationFilter.includes(college.location);

      return matchesSearch && matchesCollegeFilter && matchesCourseFilter && matchesLocationFilter;
    });
  }, [colleges, searchQuery, selectedColleges, selectedCourses, locationFilter]);

  const handleCollegeClick = (college: College) => {
    navigate(`/college/${encodeURIComponent(college.name)}`, { state: { college } });
  };

  const handleCollegeToggle = (college: string) => {
    setSelectedColleges((prev) =>
      prev.includes(college)
        ? prev.filter((c) => c !== college)
        : [...prev, college]
    );
  };

  const handleCourseToggle = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  const handleLocationToggle = (location: string) => {
    setLocationFilter((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const handleClearFilters = () => {
    setSelectedColleges([]);
    setSelectedCourses([]);
    setLocationFilter([]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedColleges.length > 0 || selectedCourses.length > 0 || locationFilter.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <FilterDropdown
        colleges={allColleges}
        courses={allCourses}
        locations={allLocations}
        selectedColleges={selectedColleges}
        selectedCourses={selectedCourses}
        selectedLocations={locationFilter}
        onCollegeToggle={handleCollegeToggle}
        onCourseToggle={handleCourseToggle}
        onLocationToggle={handleLocationToggle}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
        collegesData={colleges}
      />
      
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10 pt-16 sm:pt-20 md:pt-24">
        <section id="colleges" className="space-y-6 sm:space-y-8 animate-fade-in">
          {/* Header Section */}
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Choose Your College
            </h1>
            <p className="text-sm sm:text-base md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Select from our partner institutions to explore available courses
            </p>
            {hasActiveFilters && (
              <div className="pt-2">
                <p className="text-xs sm:text-sm text-muted-foreground inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50">
                  Showing <span className="font-semibold text-foreground">{filteredColleges.length}</span> {filteredColleges.length === 1 ? "college" : "colleges"}
                </p>
              </div>
            )}
          </div>
          
          {/* Colleges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 pt-4 sm:pt-6">
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <CollegeCard
                    key={college.name}
                    name={college.name}
                    location={college.location}
                    coursesCount={college.courses.length}
                    onClick={() => handleCollegeClick(college)}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  {colleges.length === 0 ? (
                    <div className="space-y-4">
                      <p className="text-muted-foreground text-lg mb-4">
                        No colleges available at the moment
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Please check back later or contact support if you believe this is an error.
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-muted-foreground text-lg mb-4">
                        No colleges found matching your criteria
                      </p>
                      {hasActiveFilters && (
                        <button
                          onClick={handleClearFilters}
                          className="text-primary hover:underline text-sm font-medium"
                        >
                          Clear all filters
                        </button>
                      )}
                    </>
                  )}
                </div>
              )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Colleges;

