import { Course, Semester, Grade, GradeState, RetakesState, SemesterResult, CumulativeResult } from './types';
import { gradeToHonorPoint, getGradeFromCGPA, getPercentageFromCGPA } from './mapping';

/**
 * Calculates result for a single semester
 */
export function calculateSemesterGPA(
  courses: Course[],
  grades: GradeState,
  retakes: RetakesState,
  excludeF: boolean
): SemesterResult {
  let totalCredits = 0;
  let qualityPoints = 0;
  let gradedCount = 0;
  let passedAll = true;
  let backlogsCount = 0;
  let retakeTimesCount = 0;

  for (const course of courses) {
    const grade = grades[course.code] || '';
    if (grade === '') {
      continue;
    }

    gradedCount++;
    const retakeTimes = retakes[course.code] || 0;
    if (retakeTimes > 0) {
      retakeTimesCount += retakeTimes;
    }

    if (grade === 'F') {
      backlogsCount++;
      passedAll = false;
      if (excludeF) {
        continue;
      }
    }

    const honorPoint = gradeToHonorPoint[grade as Exclude<Grade, ''>] ?? 0;
    qualityPoints += honorPoint * course.credits;
    totalCredits += course.credits;
  }

  const sgpa = gradedCount > 0 && totalCredits > 0 
    ? Math.round((qualityPoints / totalCredits) * 100) / 100 
    : null;

  return {
    semesterId: 0, // details filled by wrapper
    sgpa,
    totalCredits,
    qualityPoints,
    passedAll,
    backlogsCount,
    retakeTimesCount
  };
}

/**
 * Calculates results across all semesters that have at least one grade entered
 */
export function calculateCumulativeGPA(
  semesters: Semester[],
  grades: GradeState,
  retakes: RetakesState,
  excludeF: boolean
): CumulativeResult {
  let grandTotalCredits = 0;
  let grandQualityPoints = 0;
  let totalGradedCourses = 0;
  let grandBackPapersCount = 0;
  let grandRetakeTimesCount = 0;

  for (const sem of semesters) {
    const semGraded = sem.courses.filter(c => (grades[c.code] || '') !== '').length;

    if (semGraded > 0) {
      totalGradedCourses += semGraded;
      for (const course of sem.courses) {
        const grade = grades[course.code] || '';
        if (grade === '') continue;

        const retakeTimes = retakes[course.code] || 0;
        if (retakeTimes > 0) {
          grandRetakeTimesCount += retakeTimes;
        }

        if (grade === 'F') {
          grandBackPapersCount++;
        }

        if (grade === 'F' && excludeF) continue;

        const honorPoint = gradeToHonorPoint[grade as Exclude<Grade, ''>] ?? 0;
        grandQualityPoints += honorPoint * course.credits;
        grandTotalCredits += course.credits;
      }
    }
  }

  const cgpa = totalGradedCourses > 0 && grandTotalCredits > 0
    ? Math.round((grandQualityPoints / grandTotalCredits) * 100) / 100
    : null;

  return {
    cgpa,
    totalCredits: grandTotalCredits,
    qualityPoints: grandQualityPoints,
    percentage: cgpa !== null ? getPercentageFromCGPA(cgpa) ?? 0 : 0,
    grade: cgpa !== null ? getGradeFromCGPA(cgpa) : 'F',
    backPapersCount: grandBackPapersCount,
    retakeTimesCount: grandRetakeTimesCount
  };
}

export interface RequiredGPAResult {
  requiredSGPA: number | null;
  feasible: boolean;
  message: string;
}

export function calculateRequiredSGPA(
  targetCGPA: number,
  currentCGPA: number | null,
  earnedCredits: number,
  remainingCredits: number
): RequiredGPAResult {
  if (targetCGPA > 4.0 || targetCGPA < 0) {
    return { requiredSGPA: null, feasible: false, message: "Target CGPA must be between 0 and 4.0." };
  }
  if (remainingCredits <= 0) {
    return { requiredSGPA: null, feasible: false, message: "No remaining credits to compute required SGPA." };
  }
  if (currentCGPA === null || earnedCredits === 0) {
    if (targetCGPA <= 4.0) {
      return { requiredSGPA: targetCGPA, feasible: true, message: `You need an average SGPA of ${targetCGPA.toFixed(2)} in the remaining semesters.` };
    } else {
      return { requiredSGPA: null, feasible: false, message: "Target CGPA exceeds maximum possible (4.0)." };
    }
  }

  const totalRequiredPoints = targetCGPA * (earnedCredits + remainingCredits);
  const currentPoints = currentCGPA * earnedCredits;
  const requiredPointsFromRemaining = totalRequiredPoints - currentPoints;

  if (requiredPointsFromRemaining < 0) {
    return { requiredSGPA: 0, feasible: true, message: "You have already exceeded your target CGPA." };
  }

  const requiredSGPA = requiredPointsFromRemaining / remainingCredits;
  if (requiredSGPA > 4.0) {
    return { requiredSGPA: null, feasible: false, message: `Target CGPA is too high. Maximum achievable is ${((currentPoints + 4.0 * remainingCredits) / (earnedCredits + remainingCredits)).toFixed(2)}.` };
  }
  if (requiredSGPA < 0) {
    return { requiredSGPA: 0, feasible: true, message: "You have already met the target; keep your SGPA ≥ 0." };
  }

  return {
    requiredSGPA,
    feasible: true,
    message: `Need average SGPA of ${requiredSGPA.toFixed(2)} in the remaining ${remainingCredits} credits.`
  };
}
