import { Filter, Search, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState, useMemo } from "react";
import { collegesData, College } from "@/data/collegesData";

interface FilterDropdownProps {
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
  collegesData?: College[];
}

export const FilterDropdown = ({
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
  collegesData: allCollegesData = collegesData,
}: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [collegeSearch, setCollegeSearch] = useState("");
  const [courseSearch, setCourseSearch] = useState("");
  const [locationSearch, setLocationSearch] = useState("");

  const hasActiveFilters = externalHasActiveFilters !== undefined 
    ? externalHasActiveFilters 
    : selectedColleges.length > 0 || selectedCourses.length > 0 || selectedLocations.length > 0;

  const totalActiveFilters = selectedColleges.length + selectedCourses.length + selectedLocations.length;

  // Calculate available options based on other selections
  const availableOptions = useMemo(() => {
    let filteredData = allCollegesData;

    // Filter by selected courses
    if (selectedCourses.length > 0) {
      filteredData = filteredData.filter((college) =>
        college.courses.some((course) => selectedCourses.includes(course.name))
      );
    }

    // Filter by selected locations
    if (selectedLocations.length > 0) {
      filteredData = filteredData.filter((college) =>
        selectedLocations.includes(college.location)
      );
    }

    // Filter by selected colleges (for courses/locations)
    if (selectedColleges.length > 0) {
      filteredData = filteredData.filter((college) =>
        selectedColleges.includes(college.name)
      );
    }

    // Extract available options
    const availableColleges = new Set<string>();
    const availableCourses = new Set<string>();
    const availableLocations = new Set<string>();

    filteredData.forEach((college) => {
      availableColleges.add(college.name);
      availableLocations.add(college.location);
      college.courses.forEach((course) => {
        availableCourses.add(course.name);
      });
    });

    return {
      colleges: Array.from(availableColleges).sort(),
      courses: Array.from(availableCourses).sort(),
      locations: Array.from(availableLocations).sort(),
    };
  }, [allCollegesData, selectedColleges, selectedCourses, selectedLocations]);

  // Filter colleges by search and show only available + selected
  const filteredColleges = useMemo(() => {
    let result = availableOptions.colleges;
    
    // Always include selected colleges even if not in available
    selectedColleges.forEach((college) => {
      if (!result.includes(college)) {
        result = [...result, college].sort();
      }
    });

    if (collegeSearch) {
      result = result.filter((college) =>
        college.toLowerCase().includes(collegeSearch.toLowerCase())
      );
    }
    
    return result;
  }, [availableOptions.colleges, selectedColleges, collegeSearch]);

  // Filter courses by search and show only available + selected
  const filteredCourses = useMemo(() => {
    let result = availableOptions.courses;
    
    // Always include selected courses even if not in available
    selectedCourses.forEach((course) => {
      if (!result.includes(course)) {
        result = [...result, course].sort();
      }
    });

    if (courseSearch) {
      result = result.filter((course) =>
        course.toLowerCase().includes(courseSearch.toLowerCase())
      );
    }
    
    return result;
  }, [availableOptions.courses, selectedCourses, courseSearch]);

  // Filter locations by search and show only available + selected
  const filteredLocations = useMemo(() => {
    if (locations.length === 0) return [];
    
    let result = availableOptions.locations;
    
    // Always include selected locations even if not in available
    selectedLocations.forEach((location) => {
      if (!result.includes(location)) {
        result = [...result, location].sort();
      }
    });

    if (locationSearch) {
      result = result.filter((location) =>
        location.toLowerCase().includes(locationSearch.toLowerCase())
      );
    }
    
    return result;
  }, [availableOptions.locations, selectedLocations, locationSearch, locations]);

  return (
    <div className="w-full border-b border-border bg-background/95 backdrop-blur-sm sticky top-[3.5rem] sm:top-16 md:top-20 z-40">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <div className="flex items-center justify-between py-3 sm:py-4">
            <CollapsibleTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 h-9 sm:h-10 px-3 sm:px-4"
              >
                <Filter className="h-4 w-4" />
                <span className="text-sm font-medium">Filters</span>
                {totalActiveFilters > 0 && (
                  <Badge variant="secondary" className="h-5 px-1.5 text-xs">
                    {totalActiveFilters}
                  </Badge>
                )}
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </Button>
            </CollapsibleTrigger>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-8 px-3 text-xs"
              >
                <X className="h-3.5 w-3.5 mr-1.5" />
                Clear All
              </Button>
            )}
          </div>

          <CollapsibleContent className="pb-4 space-y-4 animate-accordion-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {/* College Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">Colleges</h4>
                  {selectedColleges.length > 0 && (
                    <Badge variant="secondary" className="h-5 px-2 text-xs">
                      {selectedColleges.length}
                    </Badge>
                  )}
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search colleges..."
                    value={collegeSearch}
                    onChange={(e) => setCollegeSearch(e.target.value)}
                    className="pl-8 h-8 text-xs"
                  />
                </div>
                <div className="space-y-1 max-h-[200px] overflow-y-auto border border-border rounded-md p-2 bg-muted/30">
                  {filteredColleges.length > 0 ? (
                    filteredColleges.map((college) => {
                      const isSelected = selectedColleges.includes(college);
                      const isAvailable = availableOptions.colleges.includes(college);
                      return (
                        <label
                          key={college}
                          className={`flex items-start gap-2 cursor-pointer group py-1.5 px-2 rounded transition-colors ${
                            isSelected 
                              ? "bg-primary/10 hover:bg-primary/15" 
                              : isAvailable 
                              ? "hover:bg-background" 
                              : "opacity-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onCollegeToggle(college)}
                            disabled={!isAvailable && !isSelected}
                            className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <span className={`text-xs leading-relaxed break-words flex-1 ${
                            isSelected 
                              ? "text-foreground font-medium" 
                              : isAvailable 
                              ? "text-muted-foreground group-hover:text-foreground" 
                              : "text-muted-foreground"
                          }`}>
                            {college}
                          </span>
                        </label>
                      );
                    })
                  ) : (
                    <p className="text-xs text-muted-foreground py-2 text-center">No colleges found</p>
                  )}
                </div>
              </div>

              {/* Location Filter */}
              {locations.length > 0 && onLocationToggle && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-foreground">Locations</h4>
                    {selectedLocations.length > 0 && (
                      <Badge variant="secondary" className="h-5 px-2 text-xs">
                        {selectedLocations.length}
                      </Badge>
                    )}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search locations..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="pl-8 h-8 text-xs"
                    />
                  </div>
                  <div className="space-y-1 max-h-[200px] overflow-y-auto border border-border rounded-md p-2 bg-muted/30">
                    {filteredLocations.length > 0 ? (
                      filteredLocations.map((location) => {
                        const isSelected = selectedLocations.includes(location);
                        const isAvailable = availableOptions.locations.includes(location);
                        return (
                          <label
                            key={location}
                            className={`flex items-start gap-2 cursor-pointer group py-1.5 px-2 rounded transition-colors ${
                              isSelected 
                                ? "bg-primary/10 hover:bg-primary/15" 
                                : isAvailable 
                                ? "hover:bg-background" 
                                : "opacity-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => onLocationToggle(location)}
                              disabled={!isAvailable && !isSelected}
                              className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            <span className={`text-xs leading-relaxed ${
                              isSelected 
                                ? "text-foreground font-medium" 
                                : isAvailable 
                                ? "text-muted-foreground group-hover:text-foreground" 
                                : "text-muted-foreground"
                            }`}>
                              {location}
                            </span>
                          </label>
                        );
                      })
                    ) : (
                      <p className="text-xs text-muted-foreground py-2 text-center">No locations found</p>
                    )}
                  </div>
                </div>
              )}

              {/* Course Filter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground">Courses</h4>
                  {selectedCourses.length > 0 && (
                    <Badge variant="secondary" className="h-5 px-2 text-xs">
                      {selectedCourses.length}
                    </Badge>
                  )}
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search courses..."
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    className="pl-8 h-8 text-xs"
                  />
                </div>
                <div className="space-y-1 max-h-[200px] overflow-y-auto border border-border rounded-md p-2 bg-muted/30">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => {
                      const isSelected = selectedCourses.includes(course);
                      const isAvailable = availableOptions.courses.includes(course);
                      return (
                        <label
                          key={course}
                          className={`flex items-start gap-2 cursor-pointer group py-1.5 px-2 rounded transition-colors ${
                            isSelected 
                              ? "bg-primary/10 hover:bg-primary/15" 
                              : isAvailable 
                              ? "hover:bg-background" 
                              : "opacity-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => onCourseToggle(course)}
                            disabled={!isAvailable && !isSelected}
                            className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                          />
                          <span className={`text-xs line-clamp-2 leading-relaxed break-words flex-1 ${
                            isSelected 
                              ? "text-foreground font-medium" 
                              : isAvailable 
                              ? "text-muted-foreground group-hover:text-foreground" 
                              : "text-muted-foreground"
                          }`}>
                            {course}
                          </span>
                        </label>
                      );
                    })
                  ) : (
                    <p className="text-xs text-muted-foreground py-2 text-center">No courses found</p>
                  )}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

