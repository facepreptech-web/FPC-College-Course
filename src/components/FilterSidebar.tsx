import { Filter, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useMemo } from "react";

interface FilterSidebarProps {
  colleges: string[];
  courses: string[];
  locations?: string[];
  selectedColleges: string[];
  selectedCourses: string[];
  selectedLocations?: string[];
  onCollegeToggle: (college: string) => void;
  onCourseToggle: (course: string) => void;
  onLocationToggle?: (location: string) => void;
  onClearFilters: () => void;
  hasActiveFilters?: boolean;
}

export const FilterSidebar = ({
  colleges,
  courses,
  locations = [],
  selectedColleges,
  selectedCourses,
  selectedLocations = [],
  onCollegeToggle,
  onCourseToggle,
  onLocationToggle,
  onClearFilters,
  hasActiveFilters: externalHasActiveFilters,
}: FilterSidebarProps) => {
  const [collegeSearch, setCollegeSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const hasActiveFilters = externalHasActiveFilters !== undefined 
    ? externalHasActiveFilters 
    : selectedColleges.length > 0 || selectedCourses.length > 0 || selectedLocations.length > 0;

  // Filter colleges by search
  const filteredColleges = useMemo(() => {
    if (!collegeSearch) return colleges;
    return colleges.filter((college) =>
      college.toLowerCase().includes(collegeSearch.toLowerCase())
    );
  }, [colleges, collegeSearch]);

  // Filter courses by search
  const filteredCourses = useMemo(() => {
    if (!courseSearch) return courses;
    return courses.filter((course) =>
      course.toLowerCase().includes(courseSearch.toLowerCase())
    );
  }, [courses, courseSearch]);

  // Filter locations by search
  const filteredLocations = useMemo(() => {
    if (!locationSearch || locations.length === 0) return locations;
    return locations.filter((location) =>
      location.toLowerCase().includes(locationSearch.toLowerCase())
    );
  }, [locations, locationSearch]);

  return (
    <aside className="w-full md:w-64 border-r-0 md:border-r border-border bg-background/50 backdrop-blur-sm flex-shrink-0 md:sticky md:top-20 md:self-start">
      <div className="p-4 sm:p-5 space-y-4 h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary flex-shrink-0" />
            <h3 className="font-semibold text-sm sm:text-base text-foreground">Filters</h3>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="h-8 px-2 text-xs flex-shrink-0"
            >
              Clear
            </Button>
          )}
        </div>

        <ScrollArea className="h-[calc(100vh-20rem)] md:h-[calc(100vh-16rem)] max-h-[600px] md:max-h-none">
          <div className="space-y-5 sm:space-y-6 pr-2 sm:pr-4">
            {/* College Filter */}
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-medium text-foreground">Colleges</h4>
                {selectedColleges.length > 0 && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs">
                    {selectedColleges.length}
                  </Badge>
                )}
              </div>
              <div className="relative mb-2">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search colleges..."
                  value={collegeSearch}
                  onChange={(e) => setCollegeSearch(e.target.value)}
                  className="pl-8 h-8 text-xs bg-background/50 border-border/50"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2 max-h-[200px] overflow-y-auto">
                {filteredColleges.length > 0 ? (
                  filteredColleges.map((college) => (
                    <label
                      key={college}
                      className="flex items-start gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedColleges.includes(college)}
                        onChange={() => onCollegeToggle(college)}
                        className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded border-border text-primary focus:ring-primary flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed break-words">
                        {college}
                      </span>
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground py-2">No colleges found</p>
                )}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Location Filter */}
            {locations.length > 0 && onLocationToggle && (
              <>
                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs sm:text-sm font-medium text-foreground">Locations</h4>
                    {selectedLocations.length > 0 && (
                      <Badge variant="secondary" className="h-5 px-2 text-xs">
                        {selectedLocations.length}
                      </Badge>
                    )}
                  </div>
                  <div className="relative mb-2">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search locations..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="pl-8 h-8 text-xs bg-background/50 border-border/50"
                    />
                  </div>
                  <div className="space-y-1.5 sm:space-y-2 max-h-[150px] overflow-y-auto">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((location) => (
                        <label
                          key={location}
                          className="flex items-start gap-2 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={selectedLocations.includes(location)}
                            onChange={() => onLocationToggle(location)}
                            className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded border-border text-primary focus:ring-primary flex-shrink-0"
                          />
                          <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-relaxed">
                            {location}
                          </span>
                        </label>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground py-2">No locations found</p>
                    )}
                  </div>
                </div>
                <Separator className="my-4" />
              </>
            )}

            {/* Course Filter */}
            <div className="space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs sm:text-sm font-medium text-foreground">Courses</h4>
                {selectedCourses.length > 0 && (
                  <Badge variant="secondary" className="h-5 px-2 text-xs">
                    {selectedCourses.length}
                  </Badge>
                )}
              </div>
              <div className="relative mb-2">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search courses..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="pl-8 h-8 text-xs bg-background/50 border-border/50"
                />
              </div>
              <div className="space-y-1.5 sm:space-y-2 max-h-[200px] overflow-y-auto">
                {filteredCourses.length > 0 ? (
                  filteredCourses.map((course) => (
                    <label
                      key={course}
                      className="flex items-start gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCourses.includes(course)}
                        onChange={() => onCourseToggle(course)}
                        className="mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 rounded border-border text-primary focus:ring-primary flex-shrink-0"
                      />
                      <span className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors line-clamp-2 leading-relaxed break-words">
                        {course}
                      </span>
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground py-2">No courses found</p>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};
