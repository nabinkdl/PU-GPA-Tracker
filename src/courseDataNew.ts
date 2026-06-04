import { Semester } from "./types";

export interface ElectiveSubject {
  code: string;
  name: string;
}

export const newSemestersData: Semester[] = [
  {
    id: 1,
    name: "Semester I",
    courses: [
      { code: "MTH 110", name: "Calculus I", credits: 3 },
      { code: "MEC 116", name: "Basic Engineering Drawing", credits: 1 },
      { code: "CMP 116", name: "Discrete Structure", credits: 3 },
      { code: "ELX 110", name: "Digital Logic", credits: 3 },
      { code: "CMP 124", name: "Programming in C", credits: 3 },
      { code: "MTH 120", name: "Problem Solving Techniques", credits: 3 },
      { code: "CMP 122", name: "Software Workshop", credits: 1 },
    ],
  },
  {
    id: 2,
    name: "Semester II",
    courses: [
      { code: "MTH 150", name: "Algebra & Geometry", credits: 3 },
      {
        code: "ELX 176",
        name: "Microprocessor & Software Architecture",
        credits: 3,
      },
      { code: "PHY 110", name: "Applied Physics", credits: 3 },
      { code: "ENG 110", name: "Communication Technique", credits: 2 },
      {
        code: "CMP 162",
        name: "Object Oriented Programming in C++",
        credits: 3,
      },
      { code: "CMP 168", name: "Web Technology", credits: 3 },
    ],
  },
  {
    id: 3,
    name: "Semester III",
    courses: [
      { code: "MTH 210", name: "Calculus II", credits: 3 },
      { code: "CMP 222", name: "Database Management System", credits: 3 },
      { code: "CMP 160", name: "Data Structure & Algorithm", credits: 3 },
      { code: "MTH 216", name: "Probability & Statistics", credits: 2 },
      { code: "CMP 228", name: "Advanced Programming with Java", credits: 3 },
      {
        code: "CMP 230",
        name: "Software Engineering Fundamentals",
        credits: 3,
      },
    ],
  },
  {
    id: 4,
    name: "Semester IV",
    courses: [
      { code: "CMP 274", name: "Software Graphics & Multimedia", credits: 3 },
      { code: "CMP 280", name: "System Programming", credits: 3 },
      { code: "MTH 252", name: "Numerical Methods", credits: 2 },
      { code: "CMP 272", name: "Analysis & Design of Algorithms", credits: 3 },
      {
        code: "CMP 278",
        name: "Object Oriented Design & Modeling Using UML",
        credits: 3,
      },
      { code: "CMP 270", name: "Research Fundamentals", credits: 2 },
    ],
  },
  {
    id: 5,
    name: "Semester V",
    courses: [
      { code: "CMP 226", name: "Applied Operating System", credits: 3 },
      { code: "CMP 334", name: "Software Network", credits: 3 },
      { code: "CMP 338", name: "Simulation & Modeling", credits: 3 },
      { code: "CMP 340", name: "Software Design & Architecture", credits: 3 },
      {
        code: "CMM 342",
        name: "Artificial Intelligence & Neural Network",
        credits: 3,
      },
      { code: "CMM 336", name: "Data Science & Machine Learning", credits: 3 },
    ],
  },
  {
    id: 6,
    name: "Semester VI",
    courses: [
      { code: "CMP 376", name: "Agile Software Development", credits: 3 },
      { code: "MGT 320", name: "Engineering Management", credits: 2 },
      { code: "CMP 382", name: "Software Dependability", credits: 3 },
      { code: "Elective I", name: "Elective I", credits: 3 },
      { code: "PRJ 360", name: "Project I", credits: 1 },
      {
        code: "CMP 378",
        name: "Cloud Application Development Foundation",
        credits: 3,
      },
      { code: "CMP 380", name: "Network Programming", credits: 3 },
    ],
  },
  {
    id: 7,
    name: "Semester VII",
    courses: [
      { code: "CMP 420", name: "Software Project Management", credits: 3 },
      {
        code: "CMP 442",
        name: "Distributed System & Cloud Computing",
        credits: 3,
      },
      {
        code: "CMP 440",
        name: "Software Testing, Verification, Validation & Quality",
        credits: 3,
      },
      { code: "Elective II", name: "Elective II", credits: 3 },
      {
        code: "CMP 438",
        name: "Entrepreneurship & Professional Practice",
        credits: 2,
      },
      { code: "ECO 411", name: "Engineering Economics", credits: 3 },
    ],
  },
  {
    id: 8,
    name: "Semester VIII",
    courses: [
      { code: "Elective III", name: "Elective III", credits: 3 },
      { code: "INT 469", name: "Internship", credits: 3 },
      { code: "PRJ 452", name: "Project II", credits: 3 },
    ],
  },
];

export const electivesList: ElectiveSubject[] = [
  // Software Development & Programming
  { code: "CMP 416", name: ".NET Technologies" },
  { code: "CMP 417", name: "Advance Java" },
  { code: "CMP 429", name: "Compiler Design" },
  { code: "CMP 422", name: "Formal Methods in Software Engineering" },
  { code: "CMP 411", name: "Mobile Apps Development" },
  { code: "CMP 485", name: "Web Services & Applications" },
  { code: "CMP 418", name: "Advanced Web Technology" },
  { code: "MTH 481", name: "Statistical Quality Control" },
  // Application
  { code: "CMP 413", name: "e-Commerce" },
  { code: "MGT 421", name: "Engineering Entrepreneurship" },
  { code: "ENV 487", name: "Environmental Impact Assessment" },
  { code: "CMP 423", name: "ERP" },
  { code: "CMP 424", name: "Geographic Information System" },
  { code: "CMP 412", name: "Management Information System" },
  { code: "CMP 486", name: "Mobile Computing" },
];
