import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { College, Course, SemesterTopic } from "@/data/collegesData";
import { collegesData as initialCollegesData } from "@/data/collegesData";

interface CollegesContextType {
  colleges: College[];
  addCollege: (college: College) => void;
  updateCollege: (collegeName: string, updatedCollege: College) => void;
  deleteCollege: (collegeName: string) => void;
  addCourse: (collegeName: string, course: Course) => void;
  updateCourse: (collegeName: string, courseName: string, updatedCourse: Course) => void;
  deleteCourse: (collegeName: string, courseName: string) => void;
  addSemester: (collegeName: string, courseName: string, semester: SemesterTopic) => void;
  updateSemester: (collegeName: string, courseName: string, semesterNumber: number, updatedSemester: SemesterTopic) => void;
  deleteSemester: (collegeName: string, courseName: string, semesterNumber: number) => void;
  resetData: () => void;
}

const CollegesContext = createContext<CollegesContextType | undefined>(undefined);

const STORAGE_KEY = "faceprep_colleges_data";

export const CollegesProvider = ({ children }: { children: ReactNode }) => {
  // Initialize with data immediately to avoid empty state
  const getInitialData = (): College[] => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        // Validate that parsed data is an array with at least some structure
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
    return initialCollegesData;
  };

  const [colleges, setColleges] = useState<College[]>(getInitialData);
  const [isInitialized, setIsInitialized] = useState(false);

  // Mark as initialized after first render
  useEffect(() => {
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever colleges change (but not on initial load)
  useEffect(() => {
    if (isInitialized && colleges.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(colleges));
    }
  }, [colleges, isInitialized]);

  const addCollege = (college: College) => {
    setColleges((prev) => [...prev, college]);
  };

  const updateCollege = (collegeName: string, updatedCollege: College) => {
    setColleges((prev) =>
      prev.map((college) => (college.name === collegeName ? updatedCollege : college))
    );
  };

  const deleteCollege = (collegeName: string) => {
    setColleges((prev) => prev.filter((college) => college.name !== collegeName));
  };

  const addCourse = (collegeName: string, course: Course) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.name === collegeName
          ? { ...college, courses: [...college.courses, course] }
          : college
      )
    );
  };

  const updateCourse = (collegeName: string, courseName: string, updatedCourse: Course) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.name === collegeName
          ? {
              ...college,
              courses: college.courses.map((course) =>
                course.name === courseName ? updatedCourse : course
              ),
            }
          : college
      )
    );
  };

  const deleteCourse = (collegeName: string, courseName: string) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.name === collegeName
          ? {
              ...college,
              courses: college.courses.filter((course) => course.name !== courseName),
            }
          : college
      )
    );
  };

  const addSemester = (collegeName: string, courseName: string, semester: SemesterTopic) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.name === collegeName
          ? {
              ...college,
              courses: college.courses.map((course) =>
                course.name === courseName
                  ? { ...course, semesters: [...course.semesters, semester] }
                  : course
              ),
            }
          : college
      )
    );
  };

  const updateSemester = (
    collegeName: string,
    courseName: string,
    semesterNumber: number,
    updatedSemester: SemesterTopic
  ) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.name === collegeName
          ? {
              ...college,
              courses: college.courses.map((course) =>
                course.name === courseName
                  ? {
                      ...course,
                      semesters: course.semesters.map((sem) =>
                        sem.semester === semesterNumber ? updatedSemester : sem
                      ),
                    }
                  : course
              ),
            }
          : college
      )
    );
  };

  const deleteSemester = (collegeName: string, courseName: string, semesterNumber: number) => {
    setColleges((prev) =>
      prev.map((college) =>
        college.name === collegeName
          ? {
              ...college,
              courses: college.courses.map((course) =>
                course.name === courseName
                  ? {
                      ...course,
                      semesters: course.semesters.filter((sem) => sem.semester !== semesterNumber),
                    }
                  : course
              ),
            }
          : college
      )
    );
  };

  const resetData = () => {
    setColleges(initialCollegesData);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <CollegesContext.Provider
      value={{
        colleges,
        addCollege,
        updateCollege,
        deleteCollege,
        addCourse,
        updateCourse,
        deleteCourse,
        addSemester,
        updateSemester,
        deleteSemester,
        resetData,
      }}
    >
      {children}
    </CollegesContext.Provider>
  );
};

export const useColleges = () => {
  const context = useContext(CollegesContext);
  if (context === undefined) {
    throw new Error("useColleges must be used within a CollegesProvider");
  }
  return context;
};

