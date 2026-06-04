import { Semester } from "./types";

export const civilNewSemesters: Semester[] = [
  {
    id: 1,
    name: "Semester I",
    courses: [
      { code: "CHM 110", name: "Applied Chemistry", credits: 2 },
      { code: "PHY 110", name: "Applied Physics", credits: 3 },
      { code: "MTH 110", name: "Calculus I", credits: 3 },
      { code: "ENG 110", name: "Communication Techniques", credits: 2 },
      { code: "CMP 112", name: "Computer Programming", credits: 3 },
      { code: "MEC 112", name: "Engineering Drawing", credits: 2 },
    ],
  },
  {
    id: 2,
    name: "Semester II",
    courses: [
      { code: "MTH 150", name: "Algebra & Geometry", credits: 3 },
      { code: "MEC 150", name: "Applied Mechanics", credits: 4 },
      { code: "ELE 112", name: "Basic Electrical & Electronics Engineering", credits: 3 },
      { code: "CVL 110", name: "Civil Engineering Materials", credits: 2 },
      { code: "CVL 112", name: "Civil Engineering Workshop", credits: 1 },
      { code: "GTE 150", name: "Engineering Geology", credits: 3 },
      { code: "MEC 114", name: "Introduction to Energy Engineering", credits: 2 },
    ],
  },
  {
    id: 3,
    name: "Semester III",
    courses: [
      { code: "ARC 150", name: "Building Technology", credits: 2 },
      { code: "MTH 210", name: "Calculus II", credits: 3 },
      { code: "WRE 212", name: "Fluid Mechanics", credits: 3 },
      { code: "MTH 252", name: "Numerical Method", credits: 2 },
      { code: "STR 216", name: "Strength of Materials", credits: 3 },
      { code: "CVL 216", name: "Surveying I", credits: 3 },
    ],
  },
  {
    id: 4,
    name: "Semester IV",
    courses: [
      { code: "MGT 250", name: "Engineering Economics", credits: 3 },
      { code: "WRE 250 (HYD)", name: "Hydraulics", credits: 3 },
      { code: "MTH 216", name: "Probability & Statistics", credits: 2 },
      { code: "GTE 252", name: "Soil Mechanics", credits: 3 },
      { code: "STR 252", name: "Structural Analysis I", credits: 3 },
      { code: "CVL 252", name: "Surveying II", credits: 3 },
    ],
  },
  {
    id: 5,
    name: "Semester V",
    courses: [
      { code: "WRE 310", name: "Engineering Hydrology", credits: 2 },
      { code: "STR 320", name: "Design of Steel & Timber Structure", credits: 3 },
      { code: "GTE 310", name: "Foundation Engineering", credits: 3 },
      { code: "STR 314", name: "Structural Analysis II", credits: 3 },
      { code: "TRP 310", name: "Transportation Engineering I", credits: 3 },
      { code: "ENV 310", name: "Water Supply Engineering", credits: 3 },
    ],
  },
  {
    id: 6,
    name: "Semester VI",
    courses: [
      { code: "CVL 350", name: "Civil Engineering Project I", credits: 1 },
      { code: "STR 214", name: "Concrete Technology & Masonry Structure", credits: 3 },
      { code: "WRE 250 (EST)", name: "Estimating & Valuation", credits: 3 },
      { code: "WRE 352", name: "Irrigation & Drainage Engineering", credits: 3 },
      { code: "ENV 352", name: "Sanitary Engineering", credits: 3 },
      { code: "CVL 316", name: "Survey Field Project", credits: 1 },
      { code: "TRP 352", name: "Transportation Engineering II", credits: 3 },
      { code: "Elective I", name: "Elective I", credits: 3 },
    ],
  },
  {
    id: 7,
    name: "Semester VII",
    courses: [
      { code: "CVL 450", name: "Civil Engineering Project II", credits: 3 },
      { code: "CVL 412", name: "Construction Project Management", credits: 3 },
      { code: "STR 352", name: "Design of R.C.C. Structure", credits: 3 },
      { code: "CVL 416", name: "Engineering Professional Practice", credits: 2 },
      { code: "WRE 410", name: "Hydropower Engineering", credits: 3 },
      { code: "Elective II", name: "Elective II", credits: 3 },
    ],
  },
  {
    id: 8,
    name: "Semester VIII",
    courses: [
      { code: "INT 484", name: "Internship", credits: 6 },
      { code: "Elective III", name: "Elective III", credits: 3 },
    ],
  },
];

export const civilOldSemesters: Semester[] = [
  {
    id: 1,
    name: "Semester I",
    courses: [
      { code: "MTH 111", name: "Engineering Mathematics I", credits: 3 },
      { code: "CHM 111", name: "Chemistry", credits: 3 },
      { code: "ENG 111", name: "Communication Techniques", credits: 2 },
      { code: "CMP 114", name: "Introduction to Computers & C Programming", credits: 2 },
      { code: "MEC 111", name: "Engineering Drawing", credits: 1.5 },
      { code: "MEC 112", name: "Applied Mechanics I (Statics)", credits: 3 },
    ],
  },
  {
    id: 2,
    name: "Semester II",
    courses: [
      { code: "MTH 112", name: "Engineering Mathematics II", credits: 3 },
      { code: "PHY 111", name: "Physics", credits: 3 },
      { code: "MEC 113", name: "Applied Mechanics II (Dynamics)", credits: 3 },
      { code: "ELE 111", name: "Basic Electrical Engineering", credits: 2 },
      { code: "CVL 111", name: "Civil Engineering Materials", credits: 3 },
      { code: "MEC 114", name: "Engineering Workshop", credits: 1.5 },
    ],
  },
  {
    id: 3,
    name: "Semester III",
    courses: [
      { code: "MTH 211", name: "Engineering Mathematics III", credits: 3 },
      { code: "CVL 211", name: "Fluid Mechanics", credits: 3 },
      { code: "CVL 212", name: "Surveying I", credits: 3 },
      { code: "CVL 213", name: "Strength of Materials", credits: 3 },
      { code: "CVL 214", name: "Engineering Geology", credits: 3 },
      { code: "CVL 215", name: "Building Technology", credits: 2 },
    ],
  },
  {
    id: 4,
    name: "Semester IV",
    courses: [
      { code: "MTH 252", name: "Numerical Methods", credits: 3 },
      { code: "CVL 221", name: "Hydraulics", credits: 3 },
      { code: "CVL 222", name: "Surveying II", credits: 3 },
      { code: "CVL 223", name: "Theory of Structures I", credits: 3 },
      { code: "CVL 224", name: "Concrete Technology & Masonry", credits: 3 },
      { code: "CVL 225", name: "Water Supply Engineering", credits: 3 },
    ],
  },
  {
    id: 5,
    name: "Semester V",
    courses: [
      { code: "MTH 212", name: "Probability & Statistics", credits: 3 },
      { code: "CVL 311", name: "Theory of Structures II", credits: 3 },
      { code: "CVL 312", name: "Soil Mechanics", credits: 3 },
      { code: "CVL 313", name: "Design of Steel & Timber Structures", credits: 3 },
      { code: "CVL 314", name: "Engineering Hydrology", credits: 2 },
      { code: "CVL 315", name: "Sanitary Engineering", credits: 3 },
    ],
  },
  {
    id: 6,
    name: "Semester VI",
    courses: [
      { code: "CVL 321", name: "Safety Engineering & Risk Management", credits: 2 },
      { code: "CVL 322", name: "Foundation Engineering", credits: 3 },
      { code: "CVL 323", name: "Design of R.C.C. Structures", credits: 3 },
      { code: "CVL 324", name: "Transportation Engineering I", credits: 3 },
      { code: "CVL 325", name: "Irrigation & Drainage Engineering", credits: 3 },
      { code: "Elective I", name: "Elective I", credits: 3 },
    ],
  },
  {
    id: 7,
    name: "Semester VII",
    courses: [
      { code: "MGT 250", name: "Engineering Economics", credits: 3 },
      { code: "CVL 411", name: "Transportation Engineering II", credits: 3 },
      { code: "CVL 412", name: "Estimating & Costing", credits: 3 },
      { code: "CVL 413", name: "Hydropower Engineering", credits: 3 },
      { code: "Elective II", name: "Elective II", credits: 3 },
      { code: "PRJ 411", name: "Project Work (Phase I)", credits: 2 },
    ],
  },
  {
    id: 8,
    name: "Semester VIII",
    courses: [
      { code: "MGT 322", name: "Construction Management", credits: 3 },
      { code: "MGT 412", name: "Professional Practice", credits: 2 },
      { code: "PRJ 412", name: "Project Work (Phase II)", credits: 4 },
      { code: "Elective III", name: "Elective III", credits: 3 },
    ],
  },
];

export interface ElectiveSubject {
  code: string;
  name: string;
}

export const civilElectivesList: ElectiveSubject[] = [
  { code: "CVL 470", name: "Environmental Impact Assessment (EIA)" },
  { code: "CVL 471", name: "Earthquake Engineering" },
  { code: "CVL 472", name: "GIS & Remote Sensing" },
  { code: "CVL 474", name: "Structural Dynamics" },
  { code: "CVL 475", name: "Traffic Engineering & Planning" },
  { code: "CVL 476", name: "Bio-Engineering" },
  { code: "CVL 478", name: "Soil Dynamics" },
  { code: "CVL 479", name: "Rock Mechanics" },
  { code: "CVL 480", name: "Solid Waste Management" },
];
