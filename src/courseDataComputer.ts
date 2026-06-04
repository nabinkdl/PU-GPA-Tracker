import { Semester } from "./types";

export const computerNewSemesters: Semester[] = [
  {
    id: 1,
    name: "Semester I",
    courses: [
      { code: "MTH 110", name: "Calculus I", credits: 3 },
      { code: "ELX 110 (DL)", name: "Digital Logic", credits: 3 },
      { code: "CMP 124", name: "Programming in C", credits: 3 },
      { code: "ELE 120", name: "Basic Electrical Engineering", credits: 3 },
      { code: "CMP 122", name: "Computer Workshop", credits: 1 },
      { code: "ENG 110", name: "Communication Technique", credits: 2 },
      { code: "ELX 110 (EDC)", name: "Electronics Devices & Circuits", credits: 3 },
    ],
  },
  {
    id: 2,
    name: "Semester II",
    courses: [
      { code: "MTH 150", name: "Algebra & Geometry", credits: 3 },
      { code: "PHY 110", name: "Applied Physics", credits: 3 },
      { code: "CHM 110", name: "Applied Chemistry", credits: 2 },
      { code: "MEC 116", name: "Basic Engineering Drawing", credits: 1 },
      { code: "CMP 162", name: "Object Oriented Programming in C++", credits: 3 },
      { code: "CMP 160", name: "Data Structure & Algorithm", credits: 3 },
      { code: "ELE 172", name: "Instrumentation", credits: 3 },
    ],
  },
  {
    id: 3,
    name: "Semester III",
    courses: [
      { code: "MTH 210", name: "Calculus II", credits: 3 },
      { code: "CMP 222", name: "Database Management System", credits: 3 },
      { code: "CMP 232", name: "Operating Systems", credits: 3 },
      { code: "CMP 224", name: "Microprocessor & Assembly Language Programming", credits: 3 },
      { code: "CMP 234", name: "Computer Graphics", credits: 3 },
      { code: "CMP 220", name: "Data Communication", credits: 3 },
    ],
  },
  {
    id: 4,
    name: "Semester IV",
    courses: [
      { code: "MTH 250", name: "Applied Mathematics", credits: 3 },
      { code: "MTH 257", name: "Numerical Methods", credits: 2 },
      { code: "CMP 228", name: "Advanced Programming with Java", credits: 3 },
      { code: "CMP 254", name: "Theory of Computation", credits: 3 },
      { code: "CMP 262", name: "Computer Architecture", credits: 3 },
      { code: "CMP 270", name: "Research Fundamentals", credits: 2 },
    ],
  },
  {
    id: 5,
    name: "Semester V",
    courses: [
      { code: "MTH 216", name: "Probability & Statistics", credits: 2 },
      { code: "ELX 320", name: "Embedded System", credits: 2 },
      { code: "MGT 320", name: "Engineering Management", credits: 2 },
      { code: "CMP 346 (AI)", name: "Artificial Intelligence", credits: 3 },
      { code: "CMM 344", name: "Digital Signal Analysis Processing", credits: 3 },
      { code: "CMP 346 (SE)", name: "Software Engineering", credits: 3 },
    ],
  },
  {
    id: 6,
    name: "Semester VI",
    courses: [
      { code: "CMP 362", name: "Image Processing & Pattern Recognition", credits: 3 },
      { code: "CMP 364", name: "Machine Learning", credits: 2 },
      { code: "CMP 360", name: "Data Science & Analytics", credits: 2 },
      { code: "CMP 344", name: "Computer Networks", credits: 3 },
      { code: "CMP 338", name: "Simulation & Modeling", credits: 3 },
      { code: "Elective I", name: "Elective I", credits: 3 },
      { code: "PRJ 360", name: "Project I", credits: 2 },
    ],
  },
  {
    id: 7,
    name: "Semester VII",
    courses: [
      { code: "MGT 332", name: "Entrepreneurship & Professional Practice", credits: 2 },
      { code: "MGT 250", name: "Engineering Economics", credits: 3 },
      { code: "CMP 426", name: "Network & Cyber Security", credits: 3 },
      { code: "CMP 424", name: "Cloud Computing & Virtualization", credits: 2 },
      { code: "CMP 422", name: "Compiler Design", credits: 2 },
      { code: "Elective II", name: "Elective II", credits: 3 },
    ],
  },
  {
    id: 8,
    name: "Semester VIII",
    courses: [
      { code: "Elective III", name: "Elective III", credits: 3 },
      { code: "INT 492", name: "Internship", credits: 3 },
      { code: "PRJ 452", name: "Project II", credits: 3 },
    ],
  },
];

export const computerOldSemesters: Semester[] = [
  {
    id: 1,
    name: "Semester I",
    courses: [
      { code: "MTH 111", name: "Engineering Mathematics I", credits: 3 },
      { code: "CHM 111", name: "Chemistry", credits: 3 },
      { code: "ENG 111", name: "Communication Techniques", credits: 2 },
      { code: "CMP 111", name: "Computer Programming in C", credits: 3 },
      { code: "ELE 111", name: "Basic Electrical Engineering", credits: 3 },
      { code: "MEC 111", name: "Engineering Drawing", credits: 1 },
    ],
  },
  {
    id: 2,
    name: "Semester II",
    courses: [
      { code: "MTH 112", name: "Engineering Mathematics II", credits: 3 },
      { code: "PHY 111", name: "Physics", credits: 3 },
      { code: "MEC 112", name: "Applied Mechanics", credits: 3 },
      { code: "ELX 111", name: "Electronic Devices & Circuits", credits: 3 },
      { code: "CMP 112", name: "Object Oriented Programming in C++", credits: 3 },
      { code: "CMP 113", name: "Digital Logic Design", credits: 3 },
    ],
  },
  {
    id: 3,
    name: "Semester III",
    courses: [
      { code: "MTH 211", name: "Engineering Mathematics III", credits: 3 },
      { code: "CMP 211", name: "Data Structure and Algorithms", credits: 3 },
      { code: "ELE 211", name: "Electrical Machines", credits: 3 },
      { code: "ELX 211", name: "Microprocessors", credits: 3 },
      { code: "ELX 212", name: "Instrumentation & Control System", credits: 3 },
      { code: "CMP 212", name: "Discrete Structure", credits: 3 },
    ],
  },
  {
    id: 4,
    name: "Semester IV",
    courses: [
      { code: "MTH 212", name: "Probability & Statistics", credits: 3 },
      { code: "CMP 221", name: "Database Management System", credits: 3 },
      { code: "CMP 222", name: "Data Communication", credits: 3 },
      { code: "CMP 223", name: "System Analysis and Design", credits: 3 },
      { code: "CMP 224", name: "Numerical Methods", credits: 3 },
      { code: "CMP 225", name: "Computer Graphics", credits: 3 },
    ],
  },
  {
    id: 5,
    name: "Semester V",
    courses: [
      { code: "CMP 311", name: "Operating Systems", credits: 3 },
      { code: "CMP 312", name: "Theory of Computation", credits: 3 },
      { code: "CMP 313", name: "Computer Architecture", credits: 3 },
      { code: "CMP 314", name: "Software Engineering", credits: 3 },
      { code: "CMP 315", name: "Computer Networks", credits: 3 },
      { code: "CMP 316", name: "Minor Project", credits: 2 },
    ],
  },
  {
    id: 6,
    name: "Semester VI",
    courses: [
      { code: "MGT 311", name: "Engineering Economics", credits: 3 },
      { code: "CMP 321", name: "Artificial Intelligence", credits: 3 },
      { code: "CMP 322", name: "Object Oriented Software Development", credits: 3 },
      { code: "CMP 323", name: "E-Commerce", credits: 3 },
      { code: "Elective I", name: "Elective I", credits: 3 },
    ],
  },
  {
    id: 7,
    name: "Semester VII",
    courses: [
      { code: "CMP 411", name: "Network & Information Security", credits: 3 },
      { code: "CMP 412", name: "Distributed Systems", credits: 3 },
      { code: "CMP 413", name: "Compiler Design", credits: 3 },
      { code: "MGT 411", name: "Organization & Management", credits: 3 },
      { code: "Elective II", name: "Elective II", credits: 3 },
      { code: "PRJ 411", name: "Major Project (Phase I)", credits: 2 },
    ],
  },
  {
    id: 8,
    name: "Semester VIII",
    courses: [
      { code: "MGT 412", name: "Professional Practice", credits: 2 },
      { code: "PRJ 412", name: "Major Project (Phase II)", credits: 4 },
      { code: "Elective III", name: "Elective III", credits: 3 },
    ],
  },
];

export interface ElectiveSubject {
  code: string;
  name: string;
}

export const computerElectivesList: ElectiveSubject[] = [
  { code: "CMP 470", name: "Mobile Application Development" },
  { code: "CMP 471", name: "Advanced Java Programming" },
  { code: "CMP 472", name: "Data Datawarehousing & Data Mining" },
  { code: "CMP 474", name: "Cryptography & Network Security" },
  { code: "CMP 475", name: "Digital System Design" },
  { code: "CMP 476", name: "Real Time Systems" },
  { code: "CMP 478", name: "Cloud Computing" },
  { code: "CMP 481", name: "Wireless Communications" },
  { code: "CMP 482", name: "Image Processing & Pattern Recognition" },
  { code: "CMP 483", name: "Machine Learning" },
];
