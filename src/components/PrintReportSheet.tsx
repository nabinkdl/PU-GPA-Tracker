import React from "react";
import { Semester, GradeState, RetakesState, CumulativeResult } from "../types";
import { calculateSemesterGPA } from "../utils";

interface PrintReportSheetProps {
  program: string;
  syllabusMode: "new" | "old";
  studentDetails: {
    name: string;
    examRoll: string;
    regNo: string;
  };
  cumulativeResult: CumulativeResult;
  resolvedSemestersData: Semester[];
  grades: GradeState;
  retakes: RetakesState;
  excludeF: boolean;
}

export default function PrintReportSheet({
  program,
  syllabusMode,
  studentDetails,
  cumulativeResult,
  resolvedSemestersData,
  grades,
  retakes,
  excludeF,
}: PrintReportSheetProps) {
  // Determine Program Label
  const getProgramName = (progId: string) => {
    switch (progId) {
      case "software":
        return "B.E. Software Engineering";
      case "computer":
        return "B.E. Computer Engineering";
      case "civil":
        return "B.E. Civil Engineering";
      case "electrical":
        return "B.E. Electrical Engineering";
      default:
        return "Bachelor of Engineering";
    }
  };

  // Filter semesters showing only those with recorded grades
  const activeSemestersForPrint = resolvedSemestersData.filter((sem) =>
    sem.courses.some((c) => (grades[c.code] || "") !== "")
  );

  return (
    <div
      id="print_report_sheet"
      className="hidden print-only print:block w-full bg-white text-slate-900 font-sans p-8 print:p-0"
      style={{
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        color: "#0f172a",
      }}
    >
      {/* ── DOCUMENT TITLE & INSTITUTION BRANDING ───────────────────── */}
      <div className="border-b-[2px] border-slate-900 pb-5 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-extrabold tracking-[0.25em] text-slate-500 uppercase block mb-1">
              Semester Study Planning & GPA Estimation
            </span>
            <h1 className="text-2xl font-black text-slate-950 tracking-tight leading-none mb-1">
              POKHARA UNIVERSITY
            </h1>
            <p className="text-sm font-bold text-slate-700">
              {getProgramName(program)} &middot; Grade Ledger
            </p>
            <div className="text-[11px] text-slate-500 mt-2 flex items-center gap-2">
              <span className="bg-slate-100 font-semibold px-2 py-0.5 rounded text-slate-700">
                Syllabus Mode: {syllabusMode.toUpperCase()}
              </span>
              <span>&bull;</span>
              <span>Report Generated: {new Date().toLocaleDateString("en-NP", { year: "numeric", month: "long", day: "numeric" })}</span>
            </div>
          </div>

          {/* ESTIMATED CUMULATIVE GPA BADGE */}
          <div className="text-right border-l border-slate-200 pl-6 flex flex-col justify-center">
            <span className="text-[9px] font-black tracking-widest text-slate-400 uppercase block mb-1">
              ESTIMATED CGPA
            </span>
            <div className="text-4xl font-black text-slate-950 leading-none">
              {cumulativeResult.cgpa !== null ? cumulativeResult.cgpa.toFixed(2) : "0.00"}
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1">
              Grade Letter: {cumulativeResult.grade}
            </span>
          </div>
        </div>
      </div>

      {/* ── STUDENT IDENTITY & PLANNER DETAILS ─────────── */}
      <div className="grid grid-cols-12 gap-5 mb-6">
        {/* Student Details Grid */}
        <div className="col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
              Academic Record Profile
            </span>
            <div className="font-extrabold text-base text-slate-900 pr-2 leading-snug">
              {studentDetails.name || "Student Grade Estimate Planner"}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-3 border-t border-slate-200/60 pt-3 text-xs text-slate-600">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">Exam Roll Number</span>
              <strong className="text-slate-800 font-mono text-xs">{studentDetails.examRoll || "—"}</strong>
            </div>
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase block mb-0.5">PU Registration Number</span>
              <strong className="text-slate-800 font-mono text-xs">{studentDetails.regNo || "—"}</strong>
            </div>
          </div>
        </div>

        {/* Academic Analytics Cards */}
        <div className="col-span-5 grid grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Syllabus Credits
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              {cumulativeResult.totalCredits} CH
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Estimation Percent
            </span>
            <span className="text-xl font-extrabold text-slate-900">
              {cumulativeResult.percentage ? `${cumulativeResult.percentage.toFixed(1)}%` : "—"}
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Backlog Subjects
            </span>
            <span className={`text-xl font-extrabold ${cumulativeResult.backPapersCount > 0 ? "text-rose-600" : "text-emerald-700"}`}>
              {cumulativeResult.backPapersCount}
            </span>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center flex flex-col justify-center">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Retake Attempts
            </span>
            <span className="text-xl font-extrabold text-slate-800">
              {cumulativeResult.retakeTimesCount}×
            </span>
          </div>
        </div>
      </div>

      {/* ── SEMESTER-BY-SEMESTER LEDGER SHEETS ─────────────────────────── */}
      <div className="space-y-6 mb-8">
        {activeSemestersForPrint.length === 0 ? (
          <div className="border border-dashed border-slate-200 rounded-xl p-10 text-center text-slate-400 text-sm italic">
            No grades recorded yet. Please input grades to generate printable ledger transcripts.
          </div>
        ) : (
          activeSemestersForPrint.map((sem) => {
            const gpaRes = calculateSemesterGPA(sem.courses, grades, retakes, excludeF);

            return (
              <div
                key={sem.id}
                className="border border-slate-300 rounded-xl overflow-hidden shadow-xs"
                style={{ pageBreakInside: "avoid" }}
              >
                {/* Semester Header Line */}
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-350 flex justify-between items-center">
                  <h3 className="font-extrabold text-slate-900 text-xs">
                    {sem.name.toUpperCase()} PERFORMANCE LEDGER
                  </h3>
                  <div className="flex gap-4 font-mono text-[10px] text-slate-700 font-bold">
                    <span>
                      SGPA: <strong className="text-indigo-700 text-[11px]">{gpaRes.sgpa !== null ? gpaRes.sgpa.toFixed(2) : "0.00"}</strong>
                    </span>
                    <span>Credits: {gpaRes.totalCredits} CH</span>
                    <span>Points: {gpaRes.qualityPoints.toFixed(1)}</span>
                    {gpaRes.backlogsCount > 0 && (
                      <span className="text-rose-600 font-bold">Fails: {gpaRes.backlogsCount}</span>
                    )}
                  </div>
                </div>

                {/* Courses Matrix */}
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                      <th className="py-2 px-4 text-[10px] uppercase font-bold tracking-wider w-[18%]">Subject Code</th>
                      <th className="py-2 px-4 text-[10px] uppercase font-bold tracking-wider">Course Name</th>
                      <th className="py-2 px-4 text-[10px] uppercase font-bold tracking-wider text-center w-[10%]">Credits</th>
                      <th className="py-2 px-4 text-[10px] uppercase font-bold tracking-wider text-center w-[12%]">Letter Grade</th>
                      <th className="py-2 px-4 text-[10px] uppercase font-bold tracking-wider text-center w-[12%]">Retake Logs</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sem.courses.map((course) => {
                      const grVal = grades[course.code];
                      if (!grVal) return null;
                      const hasRetake = (retakes[course.code] || 0) > 0;
                      const isF = grVal === "F";

                      return (
                        <tr key={course.code} className="hover:bg-slate-50/50">
                          <td className="py-2 px-4 font-mono font-bold text-slate-700 whitespace-nowrap">
                            {course.code}
                          </td>
                          <td className="py-2 px-4 text-slate-800 font-medium">
                            {course.name}
                          </td>
                          <td className="py-2 px-4 text-center font-semibold text-slate-600">
                            {course.credits}
                          </td>
                          <td
                            className={`py-2 px-4 text-center font-black text-sm ${
                              isF ? "text-rose-600" : "text-emerald-700"
                            }`}
                          >
                            {grVal}
                          </td>
                          <td className="py-2 px-4 text-center">
                            {hasRetake ? (
                              <span className="inline-block px-1.5 py-0.5 rounded bg-amber-50 text-[10px] text-amber-800 font-bold border border-amber-200">
                                {retakes[course.code]} Retakes
                              </span>
                            ) : (
                              <span className="text-slate-300 font-normal">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })
        )}
      </div>

      {/* ── FOOTER GRID: OFFICIAL GRADING LEGEND REFERENCE ── */}
      <div className="border border-slate-200 rounded-xl p-4 bg-slate-50" style={{ pageBreakInside: "avoid" }}>
        <span className="text-[9px] font-extrabold text-slate-400 tracking-wider uppercase block mb-3">
          Pokhara University Letter Grading System Reference Index
        </span>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 text-[10px]">
          <div className="border-b border-slate-200 pb-1 flex justify-between">
            <strong className="text-slate-800">A</strong> <span>4.0</span>
          </div>
          <div className="border-b border-slate-200 pb-1 flex justify-between">
            <strong className="text-slate-800">A-</strong> <span>3.7</span>
          </div>
          <div className="border-b border-slate-200 pb-1 flex justify-between">
            <strong className="text-slate-800">B+</strong> <span>3.3</span>
          </div>
          <div className="border-b border-slate-200 pb-1 flex justify-between">
            <strong className="text-slate-800">B</strong> <span>3.0</span>
          </div>
          <div className="border-b border-slate-200 pb-1 flex justify-between">
            <strong className="text-slate-800">B-</strong> <span>2.7</span>
          </div>
          <div className="border-b border-slate-200 pb-1 flex justify-between">
            <strong className="text-slate-800">C+</strong> <span>2.3</span>
          </div>
          <div className="border-b border-slate-200 pb-1 flex justify-between">
            <strong className="text-slate-800">C</strong> <span>2.0</span>
          </div>
          <div className="border-b border-slate-200 pb-1 flex justify-between text-rose-600 font-bold">
            <span>F</span> <span>0.0</span>
          </div>
        </div>
        <p className="text-[9px] text-slate-500 leading-normal mt-3">
          * This scorecard sheet is an unofficial academic grade estimation, intended solely for planning and simulation of undergraduate credit evaluations.
        </p>
      </div>
    </div>
  );
}
