import React, { useState, useRef, useCallback } from "react";
import { GradeState, RetakesState, Semester } from "../types";
import {
  AlertCircle,
  Download,
  FileUp,
  Printer,
  ShieldAlert,
  Trash2,
  TrendingUp,
  Upload,
  User,
} from "lucide-react";
import {
  downloadCSV,
  exportCurrentStateCSV,
  exportTemplateCSV,
  generateExportFilename,
  importStateFromCSV,
} from "../exportImport";
import { calculateCumulativeGPA, calculateRequiredSGPA } from "../utils";

interface GPAResultsProps {
  excludeF: boolean;
  onToggleChange: (val: boolean) => void;
  onClearSemester: () => void;
  onClearAll: () => void;
  grades: GradeState;
  retakes: RetakesState;
  onGradesImport: (newGrades: GradeState) => void;
  onRetakesImport: (newRetakes: RetakesState) => void;
  semesters: Semester[];
  studentDetails: { name: string; examRoll: string; regNo: string };
  onStudentDetailsChange: (field: string, value: string) => void;
}

export function GPAResults({
  excludeF,
  onToggleChange,
  onClearSemester,
  onClearAll,
  grades,
  retakes,
  onGradesImport,
  onRetakesImport,
  semesters,
  studentDetails,
  onStudentDetailsChange,
}: GPAResultsProps) {
  const [showCSVImport, setShowCSVImport] = useState(false);
  const [targetCGPA, setTargetCGPA] = useState<string>("3.50");
  const [replaceExisting, setReplaceExisting] = useState<boolean>(false);
  const [csvImportError, setCSVImportError] = useState<string | null>(null);
  const [csvImportSummary, setCSVImportSummary] = useState<{
    imported: number;
    skipped: number;
    messages: string[];
  } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCurrentCSV = () => {
    const csvContent = exportCurrentStateCSV(semesters, grades, retakes);
    downloadCSV(csvContent, generateExportFilename("PU_Grades_Backup"));
  };

  const handleExportTemplateCSV = () => {
    const csvContent = exportTemplateCSV(semesters);
    downloadCSV(csvContent, generateExportFilename("PU_Grades_Template"));
  };

  const processCSVContent = useCallback(
    (csvText: string, fileName: string) => {
      setCSVImportError(null);
      setCSVImportSummary(null);
      setIsProcessing(true);

      try {
        const parsed = importStateFromCSV(csvText, semesters, grades, retakes, replaceExisting);

        if (parsed.errors.length > 0 && parsed.imported === 0) {
          setCSVImportError(parsed.errors.slice(0, 3).join(" | "));
          setIsProcessing(false);
          return;
        }

        if (parsed.imported > 0) {
          onGradesImport(parsed.grades);
          onRetakesImport(parsed.retakes);
        }

        setCSVImportSummary({
          imported: parsed.imported,
          skipped: parsed.skipped,
          messages: parsed.errors,
        });
        setUploadedFileName(fileName);
      } catch {
        setCSVImportError("Failed to parse the CSV file. Please check the format.");
      } finally {
        setIsProcessing(false);
      }
    },
    [semesters, grades, retakes, replaceExisting, onGradesImport, onRetakesImport]
  );

  const readFile = useCallback(
    (file: File) => {
      if (!file.name.toLowerCase().endsWith(".csv")) {
        setCSVImportError("Please upload a .csv file.");
        return;
      }
      if (file.size > 1024 * 1024) {
        setCSVImportError("File too large. Maximum size is 1 MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result;
        if (typeof text === "string") {
          processCSVContent(text, file.name);
        }
      };
      reader.onerror = () => {
        setCSVImportError("Failed to read the file. Please try again.");
      };
      reader.readAsText(file);
    },
    [processCSVContent]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) readFile(file);
    // Reset file input so the same file can be re-selected
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) readFile(file);
  };

  const cumulativeResult = calculateCumulativeGPA(semesters, grades, retakes, excludeF);
  const allCourses = semesters.flatMap((sem) => sem.courses);
  const earnedCredits = allCourses
    .filter((c) => (grades[c.code] || "") !== "")
    .reduce((sum, c) => sum + c.credits, 0);
  const remainingCredits = allCourses
    .filter((c) => (grades[c.code] || "") === "")
    .reduce((sum, c) => sum + c.credits, 0);

  const targetVal = parseFloat(targetCGPA) || 0;
  const projection = calculateRequiredSGPA(
    targetVal,
    cumulativeResult.cgpa,
    earnedCredits,
    remainingCredits
  );

  return (
    <div className="flex flex-col gap-5">

      {/* ── F Grade Handling ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-bold text-slate-800 mb-1 flex items-center gap-2 text-sm">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 border border-slate-200">
                <ShieldAlert className="h-3.5 w-3.5 text-slate-600" />
              </span>
              F Grade Handling
            </h3>
            <p className="text-xs text-slate-500 ml-[2.125rem]">
              {excludeF
                ? "F grades excluded from denominator"
                : "F grades included in calculation (standard)"}
            </p>
          </div>

          {/* Pill toggle switch */}
          <button
            onClick={() => onToggleChange(!excludeF)}
            className="group relative flex h-9 items-center gap-2.5 rounded-full border border-slate-200 bg-slate-50 px-1.5 transition-all duration-300 hover:shadow-sm"
            aria-label={excludeF ? "Switch to include F grades" : "Switch to exclude F grades"}
          >
            <span
              className={`absolute h-[1.75rem] w-[5.25rem] rounded-full bg-white border border-slate-200 shadow-sm transition-all duration-300 ease-in-out ${
                excludeF
                  ? "left-1"
                  : "left-[calc(100%-5.25rem-0.25rem)]"
              }`}
            />
            <span
              className={`relative z-10 px-3 py-1 text-xs font-semibold transition-colors duration-300 ${
                excludeF ? "text-slate-900" : "text-slate-400"
              }`}
            >
              Exclude F
            </span>
            <span
              className={`relative z-10 px-3 py-1 text-xs font-semibold transition-colors duration-300 ${
                !excludeF ? "text-slate-900" : "text-slate-400"
              }`}
            >
              Include F
            </span>
          </button>
        </div>
      </div>

      {/* ── Required GPA Target Projection ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-50 border border-indigo-100">
            <TrendingUp className="h-3.5 w-3.5 text-indigo-600" />
          </span>
          <h3 className="font-bold text-slate-800 text-sm">Required GPA Target Projection</h3>
        </div>

        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5 border border-slate-100 p-4 rounded-xl bg-slate-50/50">
          <div className="flex-1 space-y-1">
            <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
              Find out what average SGPA is required in your remaining semesters component courses to reach a target CGPA.
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-[11px] font-medium text-slate-400">
              <span>Earned Credits: <strong className="text-slate-600">{earnedCredits} cr</strong></span>
              <span>•</span>
              <span>Remaining Credits: <strong className="text-slate-600">{remainingCredits} cr</strong></span>
              {cumulativeResult.cgpa !== null && (
                <>
                  <span>•</span>
                  <span>Current CGPA: <strong className="text-slate-600">{cumulativeResult.cgpa.toFixed(2)}</strong></span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            {/* Input field */}
            <div className="w-full sm:w-32 relative">
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Target CGPA
              </label>
              <input
                type="number"
                min="0.0"
                max="4.0"
                step="0.01"
                placeholder="3.5"
                value={targetCGPA}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === "" || (parseFloat(val) >= 0 && parseFloat(val) <= 4.0)) {
                    setTargetCGPA(val);
                  }
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:border-slate-400"
              />
            </div>

            {/* Visual badge indicator */}
            <div className="w-full sm:w-auto">
              {remainingCredits === 0 ? (
                <div className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 text-xs text-center font-bold">
                  Syllabus complete
                </div>
              ) : projection.feasible ? (
                <div className="px-4 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex flex-col items-center sm:items-end justify-center min-w-[140px]">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-600/90 leading-none">
                    Required SGPA
                  </span>
                  <span className="text-xl font-extrabold tracking-tight mt-1">
                    {projection.requiredSGPA !== null ? projection.requiredSGPA.toFixed(2) : "—"}
                  </span>
                </div>
              ) : (
                <div className="px-4 py-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex flex-col items-center sm:items-end justify-center min-w-[140px]" title={projection.message}>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-rose-500 leading-none">
                    Unfeasible
                  </span>
                  <span className="text-sm font-bold mt-1 text-center leading-none text-rose-600">
                    Exceeded Limit ✖
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Informative description banner */}
        {remainingCredits > 0 && (
          <div className={`mt-3 p-3.5 rounded-xl border text-xs font-semibold ${
            projection.feasible 
              ? 'bg-slate-100 border-slate-200/60 text-slate-700' 
              : 'bg-rose-50 border-rose-100 text-rose-700'
          }`}>
            {projection.message}
          </div>
        )}
      </div>

      {/* ── Student Details ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2 text-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 border border-slate-200">
            <User className="h-3.5 w-3.5 text-slate-600" />
          </span>
          Student Details
          <span className="ml-1 text-[0.65rem] font-semibold text-slate-400 tracking-wide uppercase bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200">For Print Report</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Floating-label input: Name */}
          <div className="group relative">
            <input
              type="text"
              id="student-name"
              placeholder=" "
              value={studentDetails.name}
              onChange={(e) => onStudentDetailsChange("name", e.target.value)}
              className="peer w-full rounded-xl border border-slate-300 bg-transparent px-4 pt-5 pb-2 text-sm text-slate-900 outline-none transition-all duration-200 placeholder-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:border-slate-400"
            />
            <label
              htmlFor="student-name"
              className="pointer-events-none absolute left-4 top-2 text-[0.625rem] font-semibold uppercase tracking-wider text-slate-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:uppercase peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[0.625rem] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-indigo-600"
            >
              Student Name
            </label>
          </div>

          {/* Floating-label input: Exam Roll */}
          <div className="group relative">
            <input
              type="text"
              id="exam-roll"
              placeholder=" "
              value={studentDetails.examRoll}
              onChange={(e) => onStudentDetailsChange("examRoll", e.target.value)}
              className="peer w-full rounded-xl border border-slate-300 bg-transparent px-4 pt-5 pb-2 text-sm text-slate-900 outline-none transition-all duration-200 placeholder-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:border-slate-400"
            />
            <label
              htmlFor="exam-roll"
              className="pointer-events-none absolute left-4 top-2 text-[0.625rem] font-semibold uppercase tracking-wider text-slate-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:uppercase peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[0.625rem] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-indigo-600"
            >
              Exam Roll No.
            </label>
          </div>

          {/* Floating-label input: Registration */}
          <div className="group relative">
            <input
              type="text"
              id="reg-no"
              placeholder=" "
              value={studentDetails.regNo}
              onChange={(e) => onStudentDetailsChange("regNo", e.target.value)}
              className="peer w-full rounded-xl border border-slate-300 bg-transparent px-4 pt-5 pb-2 text-sm text-slate-900 outline-none transition-all duration-200 placeholder-transparent focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:border-slate-400"
            />
            <label
              htmlFor="reg-no"
              className="pointer-events-none absolute left-4 top-2 text-[0.625rem] font-semibold uppercase tracking-wider text-slate-500 transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-xs peer-placeholder-shown:font-medium peer-placeholder-shown:uppercase peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[0.625rem] peer-focus:font-semibold peer-focus:uppercase peer-focus:tracking-wider peer-focus:text-indigo-600"
            >
              Registration No. (Opt.)
            </label>
          </div>
        </div>
      </div>

      {/* ── CSV Import / Export ── */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="font-bold text-slate-800 mb-5 flex items-center gap-2 text-sm">
          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 border border-slate-200">
            <Download className="h-3.5 w-3.5 text-slate-600" />
          </span>
          CSV Import / Export
        </h3>

        {/* 4-column icon card grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Export Backup */}
          <button
            onClick={handleExportCurrentCSV}
            className="group relative flex flex-col items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 hover:bg-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <Download className="h-4 w-4 text-slate-700" />
            </span>
            <span className="text-xs font-semibold text-slate-700">Export Backup</span>
            <span className="text-[0.625rem] text-slate-500 leading-tight">Save current grades</span>
          </button>

          {/* Download Template */}
          <button
            onClick={handleExportTemplateCSV}
            className="group relative flex flex-col items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-slate-300 hover:bg-white"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <Download className="h-4 w-4 text-slate-700" />
            </span>
            <span className="text-xs font-semibold text-slate-700">Template CSV</span>
            <span className="text-[0.625rem] text-slate-500 leading-tight">Blank fill-in sheet</span>
          </button>

          {/* Import CSV */}
          <button
            onClick={() => setShowCSVImport((value) => !value)}
            className={`group relative flex flex-col items-center gap-2.5 rounded-2xl border p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
              showCSVImport
                ? "border-slate-400 bg-slate-100 shadow-sm ring-2 ring-slate-200"
                : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
            }`}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <Upload className="h-4 w-4 text-slate-700" />
            </span>
            <span className="text-xs font-semibold text-slate-700">Import CSV</span>
            <span className="text-[0.625rem] text-slate-500 leading-tight">Upload grade file</span>
          </button>

          {/* Print */}
          <button
            onClick={handlePrint}
            className="group relative flex flex-col items-center gap-2.5 rounded-2xl border border-slate-200 bg-slate-900 p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-slate-800"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 border border-slate-700 shadow-sm transition-transform duration-300 group-hover:scale-110">
              <Printer className="h-4 w-4 text-white" />
            </span>
            <span className="text-xs font-semibold text-white">Print Report</span>
            <span className="text-[0.625rem] text-slate-300 leading-tight">Generate printout</span>
          </button>
        </div>

        {/* ── Clear Actions ── */}
        <div className="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={onClearSemester}
            className="group relative flex items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-600 transition-all duration-200 hover:bg-rose-100 hover:border-rose-300"
          >
            <Trash2 className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
            Clear Semester
          </button>

          <button
            onClick={() => {
              if (window.confirm("Clear ALL grades? This cannot be undone.")) {
                onClearAll();
              }
            }}
            className="group relative flex items-center justify-center gap-2 rounded-xl border border-rose-600 bg-rose-600 px-4 py-3 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-rose-700 hover:border-rose-700 hover:shadow-md"
          >
            <Trash2 className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />
            Clear All Data
          </button>
        </div>
      </div>

      {/* ── CSV Import Panel (expandable) ── */}
      {showCSVImport && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-inner">
          <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-2 text-sm">
            <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white border border-slate-200">
              <FileUp className="h-3.5 w-3.5 text-slate-600" />
            </span>
            Import CSV File
          </h4>
          <p className="text-xs text-slate-500 mb-4 ml-[2.125rem]">
            Upload a CSV file with columns: Code, Course Title, Credits, Grade
            Entry, Retake Times.
          </p>

          {/* Import strategy selector toggle */}
          <div className="mb-5 ml-0 sm:ml-[2.125rem] bg-white border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <span className="block text-xs font-bold text-slate-800">Duplicate Handling Option</span>
              <span className="block text-[10px] text-slate-500">Choose whether to keep or overwrite existing ledger grades</span>
            </div>
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 self-stretch sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => setReplaceExisting(false)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all flex-1 text-center whitespace-nowrap ${
                  !replaceExisting
                    ? "bg-slate-900 border border-slate-800 text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Merge with Existing
              </button>
              <button
                type="button"
                onClick={() => setReplaceExisting(true)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all flex-1 text-center whitespace-nowrap ${
                  replaceExisting
                    ? "bg-slate-900 border border-slate-800 text-white shadow-xs"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Replace/Overwrite
              </button>
            </div>
          </div>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="csv-file-upload"
          />

          {/* Drag & drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed cursor-pointer p-10 transition-all duration-200 ${
              isDragging
                ? "border-slate-400 bg-slate-200/50 scale-[1.01]"
                : "border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50"
            }`}
          >
            {isProcessing ? (
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-10 w-10">
                  <div className="absolute inset-0 rounded-full border-[3px] border-slate-200" />
                  <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-slate-800 animate-spin" />
                </div>
                <span className="text-xs font-semibold text-slate-700 tracking-wide">
                  Processing…
                </span>
              </div>
            ) : (
              <>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${
                    isDragging
                      ? "bg-slate-800 text-white shadow-md scale-110"
                      : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}
                >
                  <Upload className={`h-5 w-5 transition-all duration-300 ${isDragging ? "animate-bounce" : ""}`} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-slate-700">
                    {isDragging
                      ? "Drop your CSV file here"
                      : "Click to browse or drag & drop"}
                  </p>
                  <p className="text-[0.6875rem] text-slate-500 mt-1.5">
                    Accepts <span className="font-mono text-slate-600">.csv</span> files up to 1 MB
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Error feedback */}
          {csvImportError && (
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-3.5">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-100">
                <AlertCircle className="h-3.5 w-3.5 text-rose-600" />
              </div>
              <p className="text-rose-700 text-xs font-medium leading-relaxed">
                {csvImportError}
              </p>
            </div>
          )}

          {/* Success summary */}
          {csvImportSummary && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                {uploadedFileName && (
                  <span className="text-emerald-700 font-medium truncate">
                    {uploadedFileName}
                  </span>
                )}
              </div>
              <div className="text-xs text-emerald-700">
                ✓ Imported {csvImportSummary.imported} row(s) · Skipped{" "}
                {csvImportSummary.skipped} row(s)
              </div>
              {csvImportSummary.messages.length > 0 && (
               <div className="text-[0.6875rem] text-emerald-600/90 leading-relaxed">
                  {csvImportSummary.messages.slice(0, 3).join(" | ")}
                </div>
              )}
            </div>
          )}

          {/* Close button */}
          <div className="flex gap-2 mt-5">
            <button
              onClick={() => {
                setShowCSVImport(false);
                setCSVImportError(null);
                setCSVImportSummary(null);
                setUploadedFileName(null);
              }}
              className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-all duration-200 hover:bg-slate-50 hover:border-slate-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── CSV Format Info ── */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-700 mb-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white border border-slate-200">
            <AlertCircle className="h-3.5 w-3.5 text-slate-500" />
          </span>
          CSV Format
        </div>
        <p className="text-xs text-slate-500 leading-relaxed ml-[2.125rem]">
          Exported CSV always includes: Code, Course Title, Credits, Grade
          Entry, Retake Times. Import also understands older backup CSV files.
        </p>
      </div>
    </div>
  );
}
