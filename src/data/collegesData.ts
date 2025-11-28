// Type definitions only - all data comes from backend API
export interface SemesterTopic {
  semester: number;
  topics: string;
}

export interface Course {
  name: string;
  semesters: SemesterTopic[];
}

export interface College {
  name: string;
  location: string;
  courses: Course[];
}
