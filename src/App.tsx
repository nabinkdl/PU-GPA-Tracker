import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { programRegistry } from "./registry";
import {
  Program,
  SyllabusType,
  Grade,
  Course,
  GradeState,
  RetakesState,
  SemesterResult,
  CumulativeResult,
} from "./types";
import { calculateSemesterGPA, calculateCumulativeGPA } from "./utils";
import { SemesterView } from "./components/SemesterView";
import { GPAResults } from "./components/GPAResults";
import PrintReportSheet from "./components/PrintReportSheet";
import {
  Calendar,
  GraduationCap,
  ExternalLink,
} from "lucide-react";

function normalizeRetakesLedger(rawLedger: unknown, isLegacyAttemptsLedger = false): RetakesState {
  if (!rawLedger || typeof rawLedger !== "object") return {};

  return Object.entries(rawLedger as Record<string, unknown>).reduce<RetakesState>(
    (ledger, [courseCode, value]) => {
      if (value === true) {
        ledger[courseCode] = 1;
      } else if (typeof value === "number") {
        const retakeTimes = isLegacyAttemptsLedger ? value - 1 : value;
        if (retakeTimes > 0) {
          ledger[courseCode] = Math.min(10, Math.max(1, Math.trunc(retakeTimes)));
        }
      } else if (typeof value === "string") {
        const parsedValue = Number.parseInt(value, 10);
        if (Number.isInteger(parsedValue) && parsedValue > 0) {
          ledger[courseCode] = Math.min(10, parsedValue);
        }
      }
      return ledger;
    },
    {},
  );
}

export default function App() {
  const [activeSemId, setActiveSemId] = useState<number>(1);
  const [excludeF, setExcludeF] = useState<boolean>(false);
  const [grades, setGrades] = useState<GradeState>({});
  const [retakes, setRetakes] = useState<RetakesState>({});

  const [program, setProgram] = useState<Program>(() => {
    try {
      const savedProgram = localStorage.getItem("pu_gpa_program");
      return (savedProgram as Program) || "software";
    } catch {
      return "software";
    }
  });

  const [syllabusMode, setSyllabusMode] = useState<SyllabusType>(() => {
    try {
      const savedMode = localStorage.getItem("pu_gpa_syllabus_mode");
      return (savedMode as SyllabusType) || "new";
    } catch {
      return "new";
    }
  });

  const [electiveSelections, setElectiveSelections] = useState<
    Record<string, string>
  >({});

  const [studentDetails, setStudentDetails] = useState({
    name: "",
    examRoll: "",
    regNo: "",
  });

  // Hydrate state from localStorage based on active program and syllabusMode
  useEffect(() => {
    try {
      const scopedSuffix = `_${program}_${syllabusMode}`;
      const legacySuffix = syllabusMode === "old" ? "_old" : "_new";

      // Migrate existing un-scoped software grades if present
      if (program === "software") {
        const legacyGrades = localStorage.getItem(`pu_gpa_grades_ledger${legacySuffix}`);
        if (legacyGrades && !localStorage.getItem(`pu_gpa_grades_ledger${scopedSuffix}`)) {
          localStorage.setItem(`pu_gpa_grades_ledger${scopedSuffix}`, legacyGrades);
        }
        const legacyRetakes = localStorage.getItem(`pu_gpa_retakes_ledger${legacySuffix}`);
        if (legacyRetakes && !localStorage.getItem(`pu_gpa_retakes_ledger${scopedSuffix}`)) {
          localStorage.setItem(`pu_gpa_retakes_ledger${scopedSuffix}`, legacyRetakes);
        }
        const legacyElectives = localStorage.getItem(`pu_gpa_electives${legacySuffix}`);
        if (legacyElectives && !localStorage.getItem(`pu_gpa_electives${scopedSuffix}`)) {
          localStorage.setItem(`pu_gpa_electives${scopedSuffix}`, legacyElectives);
        }
      }

      let persistedGrades = localStorage.getItem(`pu_gpa_grades_ledger${scopedSuffix}`);
      // Final fallback for extremely old legacy software data
      if (!persistedGrades && program === "software" && syllabusMode === "old") {
        persistedGrades = localStorage.getItem("pu_gpa_grades_ledger");
      }
      setGrades(persistedGrades ? JSON.parse(persistedGrades) : {});

      let isLegacyAttemptsLedger = false;
      let persistedRetakes = localStorage.getItem(`pu_gpa_retakes_ledger${scopedSuffix}`);
      if (!persistedRetakes && program === "software") {
        persistedRetakes = localStorage.getItem(`pu_gpa_attempts_ledger${legacySuffix}`);
        isLegacyAttemptsLedger = !!persistedRetakes;
      }
      if (!persistedRetakes && program === "software" && syllabusMode === "old") {
        persistedRetakes = localStorage.getItem("pu_gpa_retakes_ledger");
        if (!persistedRetakes) {
          persistedRetakes = localStorage.getItem("pu_gpa_attempts_ledger");
          isLegacyAttemptsLedger = !!persistedRetakes;
        }
      }
      setRetakes(
        persistedRetakes
          ? normalizeRetakesLedger(JSON.parse(persistedRetakes), isLegacyAttemptsLedger)
          : {},
      );

      const persistedElectives = localStorage.getItem(`pu_gpa_electives${scopedSuffix}`);
      setElectiveSelections(persistedElectives ? JSON.parse(persistedElectives) : {});

      const persistedExclude = localStorage.getItem("pu_gpa_exclude_f_mode");
      if (persistedExclude) {
        setExcludeF(JSON.parse(persistedExclude));
      }

      const persistedStudentDetails = localStorage.getItem("pu_gpa_student_details");
      if (persistedStudentDetails) {
        setStudentDetails(JSON.parse(persistedStudentDetails));
      }
    } catch (e) {
      console.error("Local storage restoration error", e);
    }
  }, [program, syllabusMode]);

  // Write changes to localStorage immediately on modification
  const saveGrades = (newGrades: GradeState) => {
    setGrades(newGrades);
    const scopedSuffix = `_${program}_${syllabusMode}`;
    localStorage.setItem(`pu_gpa_grades_ledger${scopedSuffix}`, JSON.stringify(newGrades));
  };

  const saveRetakes = (newRetakes: RetakesState) => {
    setRetakes(newRetakes);
    const scopedSuffix = `_${program}_${syllabusMode}`;
    localStorage.setItem(`pu_gpa_retakes_ledger${scopedSuffix}`, JSON.stringify(newRetakes));
  };

  const handleStudentDetailsChange = (field: string, value: string) => {
    const updated = { ...studentDetails, [field]: value };
    setStudentDetails(updated);
    localStorage.setItem("pu_gpa_student_details", JSON.stringify(updated));
  };

  const handleToggleChange = (val: boolean) => {
    setExcludeF(val);
    localStorage.setItem("pu_gpa_exclude_f_mode", JSON.stringify(val));
  };

  // Grade placement callback
  const handleGradeChange = (courseCode: string, grade: Grade) => {
    const updatedGrades = { ...grades, [courseCode]: grade };
    saveGrades(updatedGrades);

    if (grade === "") {
      const updatedRetakes = { ...retakes };
      delete updatedRetakes[courseCode];
      saveRetakes(updatedRetakes);
    }
  };

  const handleRetakeChange = (courseCode: string, retakeTimes: number) => {
    const updatedRetakes = { ...retakes };
    if (retakeTimes > 0) {
      updatedRetakes[courseCode] = Math.min(10, Math.max(1, Math.trunc(retakeTimes)));
    } else {
      delete updatedRetakes[courseCode];
    }
    saveRetakes(updatedRetakes);
  };

  const handleElectiveChange = (placeholderCode: string, selectedCode: string) => {
    const updated = { ...electiveSelections, [placeholderCode]: selectedCode };
    setElectiveSelections(updated);
    const scopedSuffix = `_${program}_${syllabusMode}`;
    localStorage.setItem(`pu_gpa_electives${scopedSuffix}`, JSON.stringify(updated));
  };

  // Resolve courses lists dynamically replacing placeholders with selected electives
  const activeProgramData = programRegistry[program];
  const activeSemestersList = activeProgramData[syllabusMode];
  const electivesList = activeProgramData.electives;

  const resolvedSemestersData = useMemo(() => {
    const resolveCourses = (courses: Course[]) => {
      return courses.map((course) => {
        if (course.code.startsWith("Elective")) {
          const selectedCode = electiveSelections[course.code];
          if (selectedCode) {
            const matchedElective = electivesList.find(
              (el) => el.code === selectedCode,
            );
            if (matchedElective) {
              return {
                ...course,
                code: matchedElective.code,
                name: matchedElective.name,
              };
            }
          }
        }
        return course;
      });
    };

    return activeSemestersList.map((sem) => ({
      ...sem,
      courses: resolveCourses(sem.courses),
    }));
  }, [activeSemestersList, electivesList, electiveSelections]);

  // Clear current active semester coursework
  const handleClearSemester = () => {
    const activeSem = resolvedSemestersData.find((s) => s.id === activeSemId);
    if (!activeSem) return;

    const updatedGrades = { ...grades };
    const updatedRetakes = { ...retakes };
    activeSem.courses.forEach((course) => {
      delete updatedGrades[course.code];
      delete updatedRetakes[course.code];
    });
    saveGrades(updatedGrades);
    saveRetakes(updatedRetakes);
  };

  // Clear all entered grade states
  const handleClearAll = () => {
    saveGrades({});
    saveRetakes({});
  };

  // Import custom backup payload
  const handleGradesImport = (importedLedger: GradeState) => {
    saveGrades(importedLedger);
    saveRetakes({});
  };

  // Calculations
  const activeSemester =
    resolvedSemestersData.find((s) => s.id === activeSemId) ||
    resolvedSemestersData[0] ||
    { id: activeSemId || 1, name: `Semester ${activeSemId || 1}`, courses: [] };
  const rawActiveSemester =
    activeSemestersList.find((s) => s.id === activeSemId) ||
    activeSemestersList[0] ||
    { id: activeSemId || 1, name: `Semester ${activeSemId || 1}`, courses: [] };
  const activeSemesterResult: SemesterResult = calculateSemesterGPA(
    activeSemester.courses,
    grades,
    retakes,
    excludeF,
  );
  const cumulativeResult: CumulativeResult = calculateCumulativeGPA(
    resolvedSemestersData,
    grades,
    retakes,
    excludeF,
  );

  // Quick lookup helper for the tabs
  const getSubResult = (semId: number) => {
    const sem = resolvedSemestersData.find((s) => s.id === semId);
    if (!sem) return null;
    return calculateSemesterGPA(sem.courses, grades, retakes, excludeF);
  };

  return (
    <div
      id="full_app_container"
      className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased font-sans"
    >
      {/* PROFESSIONAL HEADER */}
      <header
        id="main_gpa_header"
        className="bg-white border-b border-slate-200 shadow-xs no-print py-6 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-slate-100 border border-slate-200 rounded-2xl">
              <GraduationCap className="w-8 h-8 text-slate-700" />
            </div>
            <div className="flex-1">
              <h1 id="app_branding_title" className="font-bold text-2xl md:text-3xl text-slate-900 mb-1.5 tracking-tight">PU {activeProgramData.name} GPA</h1>
              <p className="text-slate-500 text-sm md:text-base font-medium">
                Pokhara University • Bachelor of Engineering
              </p>
            </div>
          </div>

          {/* Header controls row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col items-start gap-1">
              <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-md text-slate-700 text-xs font-semibold">
                {activeProgramData.name} • {syllabusMode === "new" ? "New Syllabus" : "Old Syllabus"}
              </span>
              <span className="text-slate-500 text-xs font-medium">
                {activeSemestersList.length} Semesters • {resolvedSemestersData.reduce((sum, sem) => sum + sem.courses.length, 0)} Courses
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Select Program */}
              <select
                value={program}
                onChange={(e) => {
                  const newProgram = e.target.value as Program;
                  setProgram(newProgram);
                  localStorage.setItem("pu_gpa_program", newProgram);
                  setActiveSemId(1);
                }}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 shadow-xs outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all cursor-pointer"
              >
                <option value="software">Software</option>
                <option value="computer">Computer</option>
                <option value="civil">Civil</option>
                <option value="electrical">Electrical</option>
              </select>

              {/* Select Syllabus */}
              <select
                value={syllabusMode}
                onChange={(e) => {
                  const newMode = e.target.value as SyllabusType;
                  setSyllabusMode(newMode);
                  localStorage.setItem("pu_gpa_syllabus_mode", newMode);
                  setActiveSemId(1);
                }}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 shadow-xs outline-none focus:border-slate-500 focus:ring-1 focus:ring-slate-500 transition-all cursor-pointer"
              >
                <option value="new">New Syllabus</option>
                <option value="old">Old Syllabus</option>
              </select>

              <a
                href="https://buymemomo.com/nabinkdl"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
              >
                Donation ♥️
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* PRINT REPORT ONLY CARD */}
      <PrintReportSheet
        program={program}
        syllabusMode={syllabusMode}
        studentDetails={studentDetails}
        cumulativeResult={cumulativeResult}
        resolvedSemestersData={resolvedSemestersData}
        grades={grades}
        retakes={retakes}
        excludeF={excludeF}
      />

      {/* MAIN CONTENT */}
      <main
        id="main_gpa_content"
        className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 no-print"
      >
        {/* LEFT SIDEBAR: Navigation & Summary */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">

          {/* SEMESTER NAVIGATION */}
          <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 sticky top-4 z-30 lg:relative lg:top-auto lg:z-auto">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Semesters
            </h2>
            <div className="relative">
              <div className="flex overflow-x-auto lg:flex-col gap-2 pb-2 lg:pb-0 scroll-smooth pr-8 lg:pr-0">
                {resolvedSemestersData.map((sem) => {
                  const isActive = activeSemId === sem.id;
                  const subResult = getSubResult(sem.id);
                  const hasData = subResult !== null && subResult.sgpa !== null;
                  const isPassed = hasData && subResult.passedAll;
                  const isFailed = hasData && !subResult.passedAll;

                  let badgeColors = '';
                  if (isActive) {
                    if (isPassed) badgeColors = 'bg-emerald-500 text-white';
                    else if (isFailed) badgeColors = 'bg-amber-50 text-white';
                    else badgeColors = 'bg-white/20 text-white';
                  } else {
                    if (isPassed) badgeColors = 'bg-emerald-50 text-emerald-600 border border-emerald-200 group-hover:bg-emerald-100';
                    else if (isFailed) badgeColors = 'bg-amber-50 text-amber-600 border border-amber-200 group-hover:bg-amber-100';
                    else badgeColors = 'bg-slate-100 text-slate-500 border border-slate-200 group-hover:bg-slate-200';
                  }

                  return (
                    <button
                      key={sem.id}
                      onClick={() => setActiveSemId(sem.id)}
                      className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all text-left flex justify-between items-center group shrink-0 lg:shrink w-auto lg:w-full gap-4 ${isActive
                        ? "bg-slate-900 text-white shadow-md border border-slate-800"
                        : "bg-slate-50 border border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                    >
                      <span className="font-semibold whitespace-nowrap">Semester {sem.id}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${badgeColors} transition-colors`}>
                        {hasData && subResult?.sgpa !== null ? subResult?.sgpa?.toFixed(2) : "—"}
                      </span>
                    </button>
                  );
                })}
              </div>
              {/* Right gradient fade overlay for mobile */}
              <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-r from-transparent to-white pointer-events-none lg:hidden" />
            </div>
          </div>

          {/* GPA RESULTS SUMMARY CARDS (SIDEBAR) */}
          <div className="flex flex-col gap-5">
            {/* Active Semester Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm transition p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Calendar className="w-16 h-16 text-slate-400" />
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  Current SGPA
                </h3>
              </div>
              <div className="flex items-baseline gap-2 relative z-10">
                <div className="text-4xl font-black text-slate-900 tracking-tight">
                  {activeSemesterResult.sgpa !== null
                    ? activeSemesterResult.sgpa.toFixed(2)
                    : "—"}
                </div>
                <span className="text-slate-400 font-medium">/4.0</span>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-2 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Credits</span>
                  <span className="font-bold text-slate-700 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-full">{activeSemesterResult.totalCredits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Quality Pts</span>
                  <span className="font-bold text-slate-700">{activeSemesterResult.qualityPoints.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Backs</span>
                  <span className={`font-bold ${activeSemesterResult.backlogsCount > 0 ? 'text-rose-600 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full' : 'text-slate-700'}`}>
                    {activeSemesterResult.backlogsCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Retakes</span>
                  <span className={`font-bold ${activeSemesterResult.retakeTimesCount > 0 ? 'text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full' : 'text-slate-700'}`}>
                    {activeSemesterResult.retakeTimesCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Cumulative CGPA Card */}
            <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-lg p-6 text-white relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <GraduationCap className="w-32 h-32" />
              </div>
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Grand CGPA
                </h3>
              </div>
              <div className="flex items-baseline gap-2 relative z-10">
                <div className="text-5xl font-black text-white tracking-tight">
                  {cumulativeResult.cgpa !== null
                    ? cumulativeResult.cgpa.toFixed(2)
                    : "—"}
                </div>
                <span className="text-slate-400 font-medium">/4.0</span>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-800 text-xs text-slate-300 space-y-2.5 relative z-10">
                <div className="flex justify-between items-center">
                  <span>Total Credits</span>
                  <span className="font-bold text-white bg-slate-800 px-2 py-0.5 rounded-full">{cumulativeResult.totalCredits}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Percentage</span>
                  <span className="font-bold text-white">{cumulativeResult.percentage ? `${cumulativeResult.percentage.toFixed(1)}%` : "—"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Grade</span>
                  <span className="font-black text-slate-100 text-sm">{cumulativeResult.grade}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Backs</span>
                  <span className={`font-bold ${cumulativeResult.backPapersCount > 0 ? 'text-rose-400' : 'text-slate-100'}`}>
                    {cumulativeResult.backPapersCount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Retakes</span>
                  <span className={`font-bold ${cumulativeResult.retakeTimesCount > 0 ? 'text-amber-400' : 'text-slate-100'}`}>
                    {cumulativeResult.retakeTimesCount}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT MAIN AREA */}
        <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-8">
          {/* COURSE ENTRY TABLE */}
          <div className="mb-8">
            <SemesterView
              courses={activeSemester.courses}
              grades={grades}
              retakes={retakes}
              onGradeChange={handleGradeChange}
              onRetakeChange={handleRetakeChange}
              semesterName={activeSemester.name}
              electives={electivesList}
              electiveSelections={electiveSelections}
              onElectiveChange={handleElectiveChange}
              rawCourses={rawActiveSemester.courses}
            />
          </div>

          {/* RESULTS & ACTIONS */}
          <GPAResults
            excludeF={excludeF}
            onToggleChange={handleToggleChange}
            onClearSemester={handleClearSemester}
            onClearAll={handleClearAll}
            grades={grades}
            retakes={retakes}
            onGradesImport={handleGradesImport}
            onRetakesImport={saveRetakes}
            semesters={resolvedSemestersData}
            studentDetails={studentDetails}
            onStudentDetailsChange={handleStudentDetailsChange}
          />
        </div>
      </main>

      {/* SEO KNOWLEDGE BASE SECTION */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200 mt-6 no-print">
        <h2 className="text-xl font-bold text-slate-800 mb-6 font-sans tracking-tight">
          Pokhara University BE GPA Calculation & Grading System
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Official PU BE Grading Scale</h3>
            <div className="overflow-x-auto text-xs">
              <table className="w-full text-slate-600">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50 text-slate-700 font-semibold">
                    <th className="py-2 px-3 text-left">Letter Grade</th>
                    <th className="py-2 px-3 text-center">Grade Point</th>
                    <th className="py-2 px-3 text-left">Performance Classification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="py-2 px-3 font-semibold text-emerald-700">A</td><td className="py-2 px-3 text-center">4.0</td><td className="py-2 px-3">Outstanding (90% and above)</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-emerald-600">A-</td><td className="py-2 px-3 text-center">3.7</td><td className="py-2 px-3">Excellent (85% to &lt;90%)</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-indigo-700">B+</td><td className="py-2 px-3 text-center">3.3</td><td className="py-2 px-3">Very Good (80% to &lt;85%)</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-indigo-600">B</td><td className="py-2 px-3 text-center">3.0</td><td className="py-2 px-3">Good (75% to &lt;80%)</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-indigo-500">B-</td><td className="py-2 px-3 text-center">2.7</td><td className="py-2 px-3">Satisfactory (70% to &lt;75%)</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-amber-700">C+</td><td className="py-2 px-3 text-center">2.3</td><td className="py-2 px-3">Fair (65% to &lt;70%)</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-amber-600">C</td><td className="py-2 px-3 text-center">2.0</td><td className="py-2 px-3">Pass (60% to &lt;65%)</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-amber-500">C-</td><td className="py-2 px-3 text-center">1.7</td><td className="py-2 px-3">Weak (55% to &lt;60%)</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-rose-600">D+</td><td className="py-2 px-3 text-center">1.3</td><td className="py-2 px-3">Poor (50% to &lt;55%)</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-rose-600">D</td><td className="py-2 px-3 text-center">1.0</td><td className="py-2 px-3">Marginal Pass (45% to &lt;50%)</td></tr>
                  <tr><td className="py-2 px-3 font-semibold text-rose-700">F</td><td className="py-2 px-3 text-center">0.0</td><td className="py-2 px-3">Fail (Below 45%)</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-3">Formula For SGPA & CGPA Calculation</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Pokhara University uses a credit-weighted average system. The grade point scored is multiplied by the course credit hours to obtain the <strong>Quality Points</strong>.
              </p>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4 text-center">
                <span className="block text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1">SGPA Calculation Mathematical Formula</span>
                <code className="text-xs font-mono font-bold text-indigo-600">
                  SGPA = Σ(Course Credit × Grade Point) / Σ(Total Credit Hours)
                </code>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                For CGPA (Cumulative Grade Point Average), the same formula is computed across all semesters. If you toggle option to exclude Fail grades using our <strong>Backlog Toggle</strong>, the denominator will only count the credits of courses you have successfully cleared.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4 mt-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Official Syllabus Frameworks</span>
              <p className="text-xs text-slate-500 leading-relaxed">
                Course structures differ between older intakes and the new restructured semesters (utilizing modern electives across Software, Computer, Civil, and Electrical streams). This calculator dynamically handles both mode settings.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs">
          <h3 className="font-bold text-slate-800 text-sm mb-4">Frequently Asked Questions — Pokhara University BE Students</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div>
              <h4 className="font-bold text-slate-800 mb-2">Can I calculate GPA for back exams?</h4>
              <p className="text-slate-500 leading-relaxed">
                Yes! By specifying letter grades in this calculator, you can toggle individual course grades and edit the <strong>retake multiplier count</strong> to precisely simulate how retake grades and cleared back papers lift your final cumulative CGPA.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-2">How do elective choices affect GPA?</h4>
              <p className="text-slate-500 leading-relaxed">
                Electives (Elective I, II, III in Seventh and Eighth semesters) hold a standard weight of <strong>3 Credit Hours</strong>. This calculator allows selecting specific elective titles (such as Machine Learning, Environmental Impact Assessment, or Advanced Power Electronics) to replace the placeholders.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-800 mb-2">Is my academic data secure?</h4>
              <p className="text-slate-500 leading-relaxed">
                Absolutely! Our Pokhara University SGPA & CGPA tracker runs entirely client-side. All grade ledgers and student information are securely saved in your browser's private localStorage and are never sent to external servers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SUPPORT */}
      <section className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 no-print">
        <div className="rounded-2xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-5 text-center shadow-xs">
          <p className="text-sm text-slate-700">
            If this tool helped you, consider{" "}
            <a
              href="https://buymemomo.com/nabinkdl"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-amber-700 hover:text-amber-800 underline underline-offset-2 transition-colors"
            >
              consider supporting
            </a>{" "}
            🥟☕️
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        id="main_gpa_footer"
        className="bg-white border-t border-slate-200 py-8 mt-12 no-print"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>
              © 2026 GPA Calculator • Made with ❤️ for PU BE Students.
            </div>

            <div className="flex items-center gap-4">
              <Link
                to="/about"
                className="text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                About
              </Link>
              <Link
                to="/privacy"
                className="text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Privacy Policy
              </Link>
              <a
                href="https://pu.edu.np"
                target="_blank"
                rel="noreferrer"
                className="text-indigo-600 hover:text-indigo-500 transition-colors"
              >
                Pokhara University
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
