import React from "react";
import { Course, Grade, GradeState, RetakesState } from "../types";
import { gradeToHonorPoint } from "../mapping";
import { BookOpen, RotateCcw } from "lucide-react";

interface SemesterViewProps {
  courses: Course[];
  grades: GradeState;
  retakes: RetakesState;
  onGradeChange: (courseCode: string, grade: Grade) => void;
  onRetakeChange: (courseCode: string, retakeTimes: number) => void;
  semesterName: string;
  electives?: { code: string; name: string }[];
  electiveSelections?: Record<string, string>;
  onElectiveChange?: (placeholderCode: string, selectedCode: string) => void;
  rawCourses?: Course[];
}

/* ── Grade color helpers ──────────────────────────────────────────────────── */

function gradeColorClasses(grade: Grade): string {
  if (grade === "") return "border-slate-300 bg-white text-slate-700";
  if (grade.startsWith("A"))
    return "border-emerald-300 bg-emerald-50 text-emerald-800 focus:ring-emerald-500/20";
  if (grade.startsWith("B"))
    return "border-blue-300 bg-blue-50 text-blue-800 focus:ring-blue-500/20";
  if (grade.startsWith("C"))
    return "border-amber-300 bg-amber-50 text-amber-800 focus:ring-amber-500/20";
  if (grade.startsWith("D"))
    return "border-orange-300 bg-orange-50 text-orange-800 focus:ring-orange-500/20";
  return "border-rose-300 bg-rose-50 text-rose-800 focus:ring-rose-500/20"; // F
}

function gradeBadgeDot(grade: Grade): string {
  if (grade === "") return "bg-slate-300";
  if (grade.startsWith("A")) return "bg-emerald-500";
  if (grade.startsWith("B")) return "bg-blue-500";
  if (grade.startsWith("C")) return "bg-amber-500";
  if (grade.startsWith("D")) return "bg-orange-500";
  return "bg-rose-500";
}

function qpGradient(qp: number): string {
  if (qp >= 12) return "text-emerald-700 font-bold";
  if (qp >= 8) return "text-blue-700 font-bold";
  if (qp >= 4) return "text-amber-700 font-bold";
  return "text-slate-500 font-medium";
}

/* ── Mobile grade color (lighter for glass cards) ─────────────────────────── */

function mobileGradeColor(grade: Grade): string {
  if (grade === "") return "border-slate-200 bg-white text-slate-700";
  if (grade.startsWith("A")) return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (grade.startsWith("B")) return "border-blue-200 bg-blue-50 text-blue-800";
  if (grade.startsWith("C")) return "border-amber-200 bg-amber-50 text-amber-800";
  if (grade.startsWith("D")) return "border-orange-200 bg-orange-50 text-orange-800";
  return "border-rose-200 bg-rose-50 text-rose-800";
}

/* ── Component ────────────────────────────────────────────────────────────── */

export function SemesterView({
  courses,
  grades,
  retakes,
  onGradeChange,
  onRetakeChange,
  semesterName,
  electives,
  electiveSelections,
  onElectiveChange,
  rawCourses,
}: SemesterViewProps) {
  const gradesList: Grade[] = [
    "A",
    "A-",
    "B+",
    "B",
    "B-",
    "C+",
    "C",
    "C-",
    "D+",
    "D",
    "F",
  ];
  const retakeTimesOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  /* summary calculations */
  const totalCredits = courses.reduce((s, c) => s + c.credits, 0);
  const gradedCourses = courses.filter((c) => grades[c.code] && grades[c.code] !== "");
  const totalQP = gradedCourses.reduce((s, c) => {
    const g = grades[c.code];
    if (!g) return s;
    return s + gradeToHonorPoint[g] * c.credits;
  }, 0);
  const gradedCredits = gradedCourses.reduce((s, c) => s + c.credits, 0);

  const electivePlaceholders = rawCourses?.filter((c) => c.code.toLowerCase().startsWith("elective")) || [];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm">
              <BookOpen className="h-4 w-4 text-slate-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                {semesterName}
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium tracking-wide">
                {courses.length} courses&ensp;·&ensp;{totalCredits} credits
              </p>
            </div>
          </div>

          {gradedCredits > 0 && (
            <div className="flex items-center gap-4 text-xs">
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  Quality Pts
                </span>
                <span className="text-base font-bold text-slate-800">
                  {totalQP.toFixed(1)}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  Graded
                </span>
                <span className="text-base font-bold text-slate-800">
                  {gradedCourses.length}
                  <span className="text-slate-400 font-normal">/{courses.length}</span>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="p-12 text-center flex flex-col items-center justify-center gap-4 bg-slate-50/55">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 shadow-sm font-semibold">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Syllabus Not Available</h3>
            <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
              The old syllabus is currently not available for this engineering program. Please switch to the <strong className="text-slate-700">New Syllabus</strong> option in the header controls to examine and enter courses.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* ── Electives Config Panel ── */}
          {electivePlaceholders.length > 0 && electives && onElectiveChange && (
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Semester Elective Configuration
                </span>
                <span className="text-[9px] bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold px-1.5 py-0.5 rounded-md">
                  Action Required
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {electivePlaceholders.map((ph) => {
                  const currentValue = electiveSelections?.[ph.code] || "";
                  return (
                    <div key={ph.code} className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                      <span className="text-xs font-bold text-slate-700">
                        {ph.code} Subject:
                      </span>
                      <select
                        value={currentValue}
                        onChange={(e) => onElectiveChange(ph.code, e.target.value)}
                        className="text-xs font-semibold border border-slate-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500 bg-white cursor-pointer w-full sm:w-56"
                      >
                        <option value="">-- Choose {ph.code} --</option>
                        {electives.map((el) => (
                          <option key={el.code} value={el.code}>
                            {el.code} &middot; {el.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* ══════════ Desktop Table ══════════════════════════════════════ */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="sticky top-0 z-10 bg-white border-b border-slate-200">
                  <th className="px-4 py-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] w-12">
                    #
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em]">
                    Code
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em]">
                    Course
                  </th>
                  <th className="px-4 py-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] w-20">
                    Credits
                  </th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] w-44">
                    Grade
                  </th>
                  <th className="px-4 py-3 text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] w-28">
                    Retake
                  </th>
                  <th className="px-5 py-3 text-right text-[10px] font-bold text-slate-400 uppercase tracking-[0.12em] w-24">
                    QP
                  </th>
                </tr>
              </thead>

              <tbody>
                {courses.map((course, index) => {
                  const currentGrade = grades[course.code] || "";
                  const hp =
                    currentGrade !== "" ? gradeToHonorPoint[currentGrade] : null;
                  const qp =
                    hp !== null ? (hp * course.credits).toFixed(1) : null;
                  const retakeTimes = retakes[course.code] || 0;
                  const isRetake = retakeTimes > 0;
                  const isEven = index % 2 === 0;

                  return (
                    <tr
                      key={course.code}
                      className={`group border-b border-slate-100 transition-all duration-200
                        ${isEven ? "bg-white" : "bg-slate-50"}
                        ${isRetake && currentGrade !== "" ? "bg-amber-50/50" : ""}
                        hover:bg-slate-100/50`}
                    >
                      {/* Row number */}
                      <td className="px-4 py-3.5 text-center">
                        <span className="text-[11px] font-medium text-slate-400 tabular-nums">
                          {index + 1}
                        </span>
                      </td>

                      {/* Code pill */}
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg tracking-wide">
                          {course.code}
                        </span>
                      </td>

                      {/* Course name */}
                      <td className="px-5 py-3.5">
                        <span className="text-sm text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                          {course.name}
                        </span>
                      </td>

                      {/* Credits */}
                      <td className="px-4 py-3.5 text-center">
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 border border-slate-200">
                          {course.credits}
                        </span>
                      </td>

                      {/* Grade select */}
                      <td className="px-5 py-3.5">
                        <div className="relative inline-flex items-center">
                          <span
                            className={`absolute left-2.5 h-1.5 w-1.5 rounded-full ${gradeBadgeDot(currentGrade)} transition-colors`}
                          />
                          <select
                            value={currentGrade}
                            onChange={(e) =>
                              onGradeChange(
                                course.code,
                                e.target.value as Grade
                              )
                            }
                            className={`appearance-none pl-6 pr-7 py-1.5 text-xs font-semibold rounded-lg border cursor-pointer transition-all duration-200
                              focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                              ${gradeColorClasses(currentGrade)}`}
                            style={{
                              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "right 8px center",
                            }}
                          >
                            <option value="">– Select –</option>
                            {gradesList.map((g) => (
                              <option key={g} value={g}>
                                {g} ({gradeToHonorPoint[g].toFixed(1)})
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>

                      {/* Retake select */}
                      <td className="px-4 py-3.5 text-center">
                        {currentGrade !== "" ? (
                          <div className="inline-flex items-center gap-1.5">
                            <RotateCcw
                              className={`h-3 w-3 transition-colors ${
                                isRetake ? "text-amber-500" : "text-slate-400"
                              }`}
                            />
                            <select
                              value={retakeTimes}
                              onChange={(e) =>
                                onRetakeChange(
                                  course.code,
                                  Number(e.target.value)
                                )
                              }
                              className={`appearance-none px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-pointer transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-amber-500/30
                                ${
                                  isRetake
                                    ? "bg-amber-50 text-amber-700 border-amber-300"
                                    : "bg-slate-50 text-slate-600 border-slate-200"
                                }`}
                              title="Number of retake times"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 6px center",
                                paddingRight: "22px",
                              }}
                            >
                              {retakeTimesOptions.map((times) => (
                                <option key={times} value={times}>
                                  {times === 0 ? "No" : `${times}×`}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <span className="text-slate-300">–</span>
                        )}
                      </td>

                      {/* Quality Points */}
                      <td className="px-5 py-3.5 text-right">
                        {qp ? (
                          <span
                            className={`text-sm font-bold tabular-nums ${qpGradient(
                              parseFloat(qp)
                            )}`}
                          >
                            {qp}
                          </span>
                        ) : (
                          <span className="text-slate-700">–</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              {/* ── Summary footer ─────────────────────────────────────── */}
              {gradedCredits > 0 && (
                <tfoot>
                  <tr className="border-t border-slate-200 bg-slate-50">
                    <td className="px-4 py-3.5" />
                    <td className="px-5 py-3.5" />
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
                        Totals
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-center">
                      <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg bg-slate-200 text-xs font-bold text-slate-700 ring-1 ring-slate-300 px-1.5">
                        {gradedCredits}
                        <span className="text-slate-500 font-normal">
                          /{totalCredits}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="text-[11px] text-slate-500">
                        {gradedCourses.length} graded
                      </span>
                    </td>
                    <td className="px-4 py-3.5" />
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm font-bold text-slate-800">
                        {totalQP.toFixed(1)}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>

          {/* ══════════ Mobile Card View ═══════════════════════════════════ */}
          <div className="lg:hidden divide-y divide-slate-100">
            {courses.map((course, index) => {
              const currentGrade = grades[course.code] || "";
              const hp =
                currentGrade !== "" ? gradeToHonorPoint[currentGrade] : null;
              const qp = hp !== null ? (hp * course.credits).toFixed(1) : null;
              const retakeTimes = retakes[course.code] || 0;
              const isRetake = retakeTimes > 0;

              return (
                <div
                  key={course.code}
                  className={`relative p-4 transition-all duration-200
                    ${isRetake && currentGrade !== "" ? "bg-amber-50/50" : ""}
                    hover:bg-slate-50`}
                >
                  {/* Row number floating badge */}
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-slate-400 tabular-nums bg-slate-100 rounded-md px-1.5 py-0.5 border border-slate-200">
                    #{index + 1}
                  </span>

                  {/* Course header */}
                  <div className="flex items-start gap-3 mb-3 pr-8">
                    <span className="inline-flex items-center font-mono text-[11px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg tracking-wide shrink-0">
                      {course.code}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-slate-800 leading-tight truncate">
                        {course.name}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {course.credits} credits
                      </span>
                    </div>
                  </div>

                  {/* Controls row */}
                  <div className="flex gap-2.5 flex-wrap items-end">
                    {/* Grade */}
                    <div className="flex-1 min-w-[120px]">
                      <label className="block text-[9px] font-bold text-slate-500 uppercase tracking-[0.15em] mb-1.5">
                        Grade
                      </label>
                      <div className="relative">
                        <span
                          className={`absolute left-2.5 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full ${gradeBadgeDot(currentGrade)}`}
                        />
                        <select
                          value={currentGrade}
                          onChange={(e) =>
                            onGradeChange(
                              course.code,
                              e.target.value as Grade
                            )
                          }
                          className={`w-full appearance-none pl-6 pr-8 py-2 text-xs font-semibold rounded-xl border cursor-pointer transition-all
                            focus:outline-none focus:ring-2 focus:ring-indigo-500/40
                            ${mobileGradeColor(currentGrade)}`}
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 10px center",
                          }}
                        >
                          <option value="">Select</option>
                          {gradesList.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Retake */}
                    {currentGrade !== "" && (
                      <div className="w-24">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">
                          Retake
                        </label>
                        <div
                          className={`flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl text-xs font-bold border transition-all
                            ${
                              isRetake
                                ? "bg-amber-50 text-amber-700 border-amber-300"
                                : "bg-slate-50 text-slate-600 border-slate-200"
                            }`}
                        >
                          <RotateCcw
                            className={`h-3 w-3 ${
                              isRetake ? "text-amber-500" : "text-slate-400"
                            }`}
                          />
                          <select
                            value={retakeTimes}
                            onChange={(e) =>
                              onRetakeChange(
                                course.code,
                                Number(e.target.value)
                              )
                            }
                            className="bg-transparent font-bold focus:outline-none cursor-pointer text-inherit"
                          >
                            {retakeTimesOptions.map((times) => (
                              <option key={times} value={times}>
                                {times === 0 ? "No" : `${times}×`}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    {/* QP */}
                    {qp && (
                      <div className="w-16">
                        <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em] mb-1.5">
                          QP
                        </label>
                        <div
                          className={`px-2 py-2 rounded-xl text-sm font-bold text-center border border-slate-200 bg-slate-50
                            ${qpGradient(parseFloat(qp))}`}
                        >
                          {qp}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Mobile summary footer */}
            {gradedCredits > 0 && (
              <div className="px-4 py-4 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="text-[11px]">
                    <span className="font-bold uppercase tracking-widest text-slate-500">
                      Summary
                    </span>
                    <span className="text-slate-500 ml-2">
                      {gradedCourses.length}/{courses.length} graded&ensp;·&ensp;
                      {gradedCredits}/{totalCredits} cr
                    </span>
                  </div>
                  <span className="text-base font-bold text-slate-800">
                    {totalQP.toFixed(1)} QP
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
