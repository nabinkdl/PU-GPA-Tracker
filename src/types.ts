export type Grade = 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'C-' | 'D+' | 'D' | 'F' | '';

export interface Course {
  code: string;
  name: string;
  credits: number;
}

export interface Semester {
  id: number;
  name: string;
  courses: Course[];
}

export interface GradeState {
  // key: course.code, value: Grade
  [courseCode: string]: Grade;
}

export interface RetakesState {
  // key: course.code, value: number of retake times, absent/0 if regular
  [courseCode: string]: number;
}

/** @deprecated Use RetakesState instead */
export type BacklogsState = RetakesState;

export interface SemesterResult {
  semesterId: number;
  sgpa: number | null;
  totalCredits: number;
  qualityPoints: number;
  passedAll: boolean;
  backlogsCount: number;
  retakeTimesCount: number;
}

export interface CumulativeResult {
  cgpa: number | null;
  totalCredits: number;
  qualityPoints: number;
  percentage: number;
  grade: string;
  backPapersCount: number;
  retakeTimesCount: number;
}

export type Program = 'software' | 'computer' | 'civil' | 'electrical';
export type SyllabusType = 'new' | 'old';
