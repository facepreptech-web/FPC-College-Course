import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { College, Course, SemesterTopic } from "@/data/collegesData";
import { collegesAPI, coursesAPI, semestersAPI } from "@/services/api";

interface CollegesContextType {
  colleges: College[];
  isLoading: boolean;
  addCollege: (college: College) => Promise<void>;
  updateCollege: (collegeName: string, updatedCollege: College) => Promise<void>;
  deleteCollege: (collegeName: string) => Promise<void>;
  addCourse: (collegeName: string, course: Course) => Promise<void>;
  updateCourse: (collegeName: string, courseName: string, updatedCourse: Course) => Promise<void>;
  deleteCourse: (collegeName: string, courseName: string) => Promise<void>;
  addSemester: (collegeName: string, courseName: string, semester: SemesterTopic) => Promise<void>;
  updateSemester: (collegeName: string, courseName: string, semesterNumber: number, updatedSemester: SemesterTopic) => Promise<void>;
  deleteSemester: (collegeName: string, courseName: string, semesterNumber: number) => Promise<void>;
  resetData: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const CollegesContext = createContext<CollegesContextType | undefined>(undefined);

// All data comes from backend API - no local storage or predefined data

// Helper to convert API format to app format
const convertApiToAppFormat = (apiColleges: any[]): College[] => {
  return apiColleges.map((apiCollege: any) => ({
    name: apiCollege.name,
    location: apiCollege.location,
    courses: (apiCollege.courses || []).map((apiCourse: any) => ({
      name: apiCourse.name,
      semesters: (apiCourse.semesters || []).map((apiSem: any) => ({
        semester: apiSem.semester,
        topics: apiSem.topics,
      })),
    })),
  }));
};

// Helper to find college by name and get its ID
const findCollegeId = (colleges: any[], name: string): number | null => {
  const college = colleges.find((c: any) => c.name === name);
  return college?.id || null;
};

// Helper to find course by name and get its ID
const findCourseId = (college: any, courseName: string): number | null => {
  const course = college.courses?.find((c: any) => c.name === courseName);
  return course?.id || null;
};

export const CollegesProvider = ({ children }: { children: ReactNode }) => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [apiColleges, setApiColleges] = useState<any[]>([]); // Store API format for IDs
  const [isLoading, setIsLoading] = useState(true);

  // Load data from backend API only
  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await collegesAPI.getAllColleges();
      setApiColleges(data);
      setColleges(convertApiToAppFormat(data));
    } catch (error) {
      console.error("Error loading data from API:", error);
      // Set empty array if API fails - no fallback data
      setColleges([]);
      setApiColleges([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const refreshData = async () => {
    await loadData();
  };

  const addCollege = async (college: College) => {
    try {
      await collegesAPI.createCollege({ name: college.name, location: college.location });
      await refreshData();
    } catch (error) {
      console.error("Error adding college:", error);
      throw error;
    }
  };

  const updateCollege = async (collegeName: string, updatedCollege: College) => {
    try {
      const collegeId = findCollegeId(apiColleges, collegeName);
      if (collegeId) {
        await collegesAPI.updateCollege(collegeId, {
          name: updatedCollege.name,
          location: updatedCollege.location,
        });
        await refreshData();
      }
    } catch (error) {
      console.error("Error updating college:", error);
      throw error;
    }
  };

  const deleteCollege = async (collegeName: string) => {
    try {
      const collegeId = findCollegeId(apiColleges, collegeName);
      if (collegeId) {
        await collegesAPI.deleteCollege(collegeId);
        await refreshData();
      }
    } catch (error) {
      console.error("Error deleting college:", error);
      throw error;
    }
  };

  const addCourse = async (collegeName: string, course: Course) => {
    try {
      const collegeId = findCollegeId(apiColleges, collegeName);
      if (collegeId) {
        await coursesAPI.createCourse(collegeId, { name: course.name });
        await refreshData();
      }
    } catch (error) {
      console.error("Error adding course:", error);
      throw error;
    }
  };

  const updateCourse = async (collegeName: string, courseName: string, updatedCourse: Course) => {
    try {
      const college = apiColleges.find((c: any) => c.name === collegeName);
      const courseId = findCourseId(college, courseName);
      if (courseId) {
        await coursesAPI.updateCourse(courseId, { name: updatedCourse.name });
        await refreshData();
      }
    } catch (error) {
      console.error("Error updating course:", error);
      throw error;
    }
  };

  const deleteCourse = async (collegeName: string, courseName: string) => {
    try {
      const college = apiColleges.find((c: any) => c.name === collegeName);
      const courseId = findCourseId(college, courseName);
      if (courseId) {
        await coursesAPI.deleteCourse(courseId);
        await refreshData();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
      throw error;
    }
  };

  const addSemester = async (collegeName: string, courseName: string, semester: SemesterTopic) => {
    try {
      const college = apiColleges.find((c: any) => c.name === collegeName);
      const courseId = findCourseId(college, courseName);
      if (courseId) {
        await semestersAPI.createSemester(courseId, {
          semester: semester.semester,
          topics: semester.topics,
        });
        await refreshData();
      }
    } catch (error) {
      console.error("Error adding semester:", error);
      throw error;
    }
  };

  const updateSemester = async (
    collegeName: string,
    courseName: string,
    semesterNumber: number,
    updatedSemester: SemesterTopic
  ) => {
    try {
      const college = apiColleges.find((c: any) => c.name === collegeName);
      const course = college?.courses?.find((c: any) => c.name === courseName);
      const semester = course?.semesters?.find((s: any) => s.semester === semesterNumber);
      if (semester?.id) {
        await semestersAPI.updateSemester(semester.id, {
          semester: updatedSemester.semester,
          topics: updatedSemester.topics,
        });
        await refreshData();
      }
    } catch (error) {
      console.error("Error updating semester:", error);
      throw error;
    }
  };

  const deleteSemester = async (collegeName: string, courseName: string, semesterNumber: number) => {
    try {
      const college = apiColleges.find((c: any) => c.name === collegeName);
      const course = college?.courses?.find((c: any) => c.name === courseName);
      const semester = course?.semesters?.find((s: any) => s.semester === semesterNumber);
      if (semester?.id) {
        await semestersAPI.deleteSemester(semester.id);
        await refreshData();
      }
    } catch (error) {
      console.error("Error deleting semester:", error);
      throw error;
    }
  };

  const resetData = async () => {
    // Reset data by reloading from API
    await refreshData();
  };

  return (
    <CollegesContext.Provider
      value={{
        colleges,
        isLoading,
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
        refreshData,
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
