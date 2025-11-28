// Backend API URL - can be set via environment variable
// Default: localhost for development, or production URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV 
    ? 'http://localhost:3000' 
    : 'https://lightyellow-kudu-847304.hostingersite.com/api');

export interface College {
  id?: number;
  name: string;
  location: string;
  courses?: Course[];
}

export interface Course {
  id?: number;
  college_id?: number;
  name: string;
  semesters?: SemesterTopic[];
}

export interface SemesterTopic {
  id?: number;
  course_id?: number;
  semester: number;
  topics: string;
}

// Helper function to handle API responses
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Colleges API
export const collegesAPI = {
  getAllColleges: async (): Promise<College[]> => {
    const response = await fetch(`${API_BASE_URL}/colleges`);
    return handleResponse<College[]>(response);
  },

  createCollege: async (college: Omit<College, 'id' | 'courses'>): Promise<College> => {
    const response = await fetch(`${API_BASE_URL}/colleges`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(college),
    });
    return handleResponse<College>(response);
  },

  updateCollege: async (id: number, college: Omit<College, 'id' | 'courses'>): Promise<College> => {
    const response = await fetch(`${API_BASE_URL}/colleges/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(college),
    });
    return handleResponse<College>(response);
  },

  deleteCollege: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/colleges/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete college');
    }
  },
};

// Courses API
export const coursesAPI = {
  createCourse: async (collegeId: number, course: Omit<Course, 'id' | 'college_id' | 'semesters'>): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/colleges/${collegeId}/courses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });
    return handleResponse<Course>(response);
  },

  updateCourse: async (id: number, course: Omit<Course, 'id' | 'college_id' | 'semesters'>): Promise<Course> => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(course),
    });
    return handleResponse<Course>(response);
  },

  deleteCourse: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/courses/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete course');
    }
  },
};

// Semesters API
export const semestersAPI = {
  createSemester: async (courseId: number, semester: Omit<SemesterTopic, 'id' | 'course_id'>): Promise<SemesterTopic> => {
    const response = await fetch(`${API_BASE_URL}/courses/${courseId}/semesters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(semester),
    });
    return handleResponse<SemesterTopic>(response);
  },

  updateSemester: async (id: number, semester: Omit<SemesterTopic, 'id' | 'course_id'>): Promise<SemesterTopic> => {
    const response = await fetch(`${API_BASE_URL}/semesters/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(semester),
    });
    return handleResponse<SemesterTopic>(response);
  },

  deleteSemester: async (id: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/semesters/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete semester');
    }
  },
};

