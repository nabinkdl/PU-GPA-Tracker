import { Course, Semester, GradeState, RetakesState, Grade } from "./types";

const CSV_HEADERS = ["Code", "Course Title", "Credits", "Grade Entry", "Retake Times"];
const VALID_GRADES: Grade[] = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F", ""];

interface CsvRow {
  code: string;
  title: string;
  credits: number;
  grade: Grade;
  retakeTimes: number;
}

export interface CsvImportResult {
  grades: GradeState;
  retakes: RetakesState;
  imported: number;
  skipped: number;
  errors: string[];
}

function escapeCsvValue(value: string): string {
  const needsQuotes = /[",\r\n]/.test(value);
  const escaped = value.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}

function serializeCsv(rows: string[][]): string {
  return rows.map((row) => row.map(escapeCsvValue).join(",")).join("\r\n");
}

function parseCsvText(csvText: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index++) {
    const char = csvText[index];
    const next = csvText[index + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        index++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        index++;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      continue;
    }

    field += char;
  }

  row.push(field);
  if (row.length > 1 || row[0].trim() !== "") {
    rows.push(row);
  }

  return rows;
}

function normalizeHeader(value: string): string {
  return value.trim().toLowerCase();
}

function buildCourseIndex(semesters: Semester[]): Map<string, Course> {
  const courseIndex = new Map<string, Course>();
  semesters.forEach((semester) => {
    semester.courses.forEach((course) => {
      courseIndex.set(course.code.trim().toUpperCase(), course);
    });
  });
  return courseIndex;
}

function toRows(semesters: Semester[], grades: GradeState, retakes: RetakesState, includeBlankGrades: boolean): string[][] {
  const rows: string[][] = [CSV_HEADERS];

  semesters.forEach((semester) => {
    semester.courses.forEach((course) => {
      const grade = grades[course.code] || "";
      const retakeTimes = retakes[course.code] || 0;

      if (!includeBlankGrades && grade === "") {
        return;
      }

      rows.push([
        course.code,
        course.name,
        String(course.credits),
        grade,
        retakeTimes > 0 ? String(retakeTimes) : "",
      ]);
    });
  });

  return rows;
}

export function exportCurrentStateCSV(
  semesters: Semester[],
  grades: GradeState,
  retakes: RetakesState,
): string {
  return serializeCsv(toRows(semesters, grades, retakes, false));
}

export function exportTemplateCSV(semesters: Semester[]): string {
  return serializeCsv(
    toRows(semesters, {}, {}, true).map((row, index) => {
      if (index === 0) return row;
      return [row[0], row[1], row[2], "", ""];
    }),
  );
}

export function importStateFromCSV(
  csvText: string,
  semesters: Semester[],
  existingGrades: GradeState,
  existingRetakes: RetakesState,
  replaceExisting: boolean = false,
): CsvImportResult {
  const parsedRows = parseCsvText(csvText.trim());
  const result: CsvImportResult = {
    grades: replaceExisting ? {} : { ...existingGrades },
    retakes: replaceExisting ? {} : { ...existingRetakes },
    imported: 0,
    skipped: 0,
    errors: [],
  };

  if (parsedRows.length < 2) {
    result.errors.push("CSV file is empty or missing a header row.");
    return result;
  }

  const headers = parsedRows[0].map(normalizeHeader);
  const codeIndex = headers.indexOf("code");
  const gradeIndex = headers.findIndex((header) => header.includes("grade"));
  const retakeIndex = headers.findIndex((header) => header.includes("retake") || header.includes("backlog") || header.includes("back paper"));
  const legacyAttemptsIndex = headers.findIndex((header) => header.includes("attempt"));

  if (codeIndex === -1) {
    result.errors.push('Missing required column "Code".');
    return result;
  }

  const courseIndex = buildCourseIndex(semesters);

  parsedRows.slice(1).forEach((row, rowOffset) => {
    const rowNumber = rowOffset + 2;
    const code = (row[codeIndex] || "").trim().toUpperCase();

    if (!code) {
      result.skipped++;
      result.errors.push(`Row ${rowNumber}: empty course code.`);
      return;
    }

    const course = courseIndex.get(code);
    if (!course) {
      result.skipped++;
      result.errors.push(`Row ${rowNumber}: course ${code} not found in syllabus.`);
      return;
    }

    const grade = (gradeIndex >= 0 ? (row[gradeIndex] || "").trim() : "") as Grade;
    const retakeValue = retakeIndex >= 0 ? (row[retakeIndex] || "").trim().toLowerCase() : "";
    const legacyAttemptsValue = legacyAttemptsIndex >= 0 ? (row[legacyAttemptsIndex] || "").trim() : "";

    if (grade && !VALID_GRADES.includes(grade)) {
      result.skipped++;
      result.errors.push(`Row ${rowNumber}: invalid grade ${grade} for ${course.code}.`);
      return;
    }

    if (grade === "") {
      result.skipped++;
      return;
    }

    let retakeTimes = 0;
    let hasInvalidRetakeValue = false;
    if (retakeValue) {
      const parsedRetakeTimes = Number.parseInt(retakeValue, 10);
      if (Number.isInteger(parsedRetakeTimes)) {
        retakeTimes = parsedRetakeTimes;
      } else if (["yes", "y", "true", "retake", "back", "backlog"].includes(retakeValue)) {
        retakeTimes = 1;
      } else if (!["no", "n", "false"].includes(retakeValue)) {
        hasInvalidRetakeValue = true;
      }
    } else if (legacyAttemptsValue) {
      const parsedAttempts = Number.parseInt(legacyAttemptsValue, 10);
      if (!Number.isInteger(parsedAttempts) || parsedAttempts < 1 || parsedAttempts > 10) {
        result.skipped++;
        result.errors.push(`Row ${rowNumber}: legacy attempts must be between 1 and 10 for ${course.code}.`);
        return;
      }
      retakeTimes = parsedAttempts - 1;
    }

    if (hasInvalidRetakeValue || !Number.isInteger(retakeTimes) || retakeTimes < 0 || retakeTimes > 10) {
      result.skipped++;
      result.errors.push(`Row ${rowNumber}: retake times must be between 0 and 10 for ${course.code}.`);
      return;
    }

    result.grades[course.code] = grade;
    if (retakeTimes > 0) {
      result.retakes[course.code] = retakeTimes;
    } else {
      delete result.retakes[course.code];
    }
    result.imported++;
  });

  return result;
}

export function downloadCSV(csvContent: string, filename: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function generateExportFilename(prefix: string): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `${prefix}_${timestamp}.csv`;
}
