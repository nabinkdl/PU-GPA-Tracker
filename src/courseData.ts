import { Semester } from "./types";

export const semestersData: Semester[] = [
  {
    id: 1,
    name: "Semester I",
    courses: [
      { code: "MTH 112", name: "Engineering Mathematics I", credits: 3 },
      { code: "PHY 111", name: "Physics", credits: 4 },
      { code: "ENG 111", name: "Communication Techniques", credits: 2 },
      { code: "CMP 110", name: "Fundamentals of IT", credits: 2 },
      { code: "CMP 113", name: "Programming in C", credits: 3 },
      { code: "CMP 114", name: "Problem Solving Techniques", credits: 3 },
    ],
  },
  {
    id: 2,
    name: "Semester II",
    courses: [
      { code: "MTH 114", name: "Engineering Mathematics II", credits: 3 },
      { code: "ELX 212", name: "Logic Circuits", credits: 3 },
      {
        code: "MTH 130",
        name: "Mathematical Foundation of Software Science",
        credits: 3,
      },
      { code: "MEC 120", name: "Engineering Drawing", credits: 2 },
      {
        code: "CMP 115",
        name: "Object Oriented Programming in C++",
        credits: 3,
      },
      { code: "CMP 213", name: "Web Technology", credits: 3 },
    ],
  },
  {
    id: 3,
    name: "Semester III",
    courses: [
      { code: "MTH 212", name: "Engineering Mathematics III", credits: 3 },
      {
        code: "CMP 220",
        name: "Software Engineering Fundamentals",
        credits: 3,
      },
      { code: "CMP 225", name: "Data Structure and Algorithms", credits: 3 },
      { code: "MTH 221", name: "Probability and Queuing Theory", credits: 2 },
      { code: "CMP 212", name: "Programming in Java", credits: 3 },
      {
        code: "CMP 214",
        name: "Microprocessor and Assembly Language Programming",
        credits: 3,
      },
    ],
  },
  {
    id: 4,
    name: "Semester IV",
    courses: [
      { code: "MTH 230", name: "Numerical Methods", credits: 3 },
      { code: "CMP 241", name: "Software Graphics", credits: 3 },
      {
        code: "CMP 334",
        name: "Computer Organization and Architecture",
        credits: 3,
      },
      { code: "CMP 226", name: "Database Management Systems", credits: 3 },
      {
        code: "CMP 321",
        name: "Object Oriented Design and Modeling through UML",
        credits: 3,
      },
      { code: "CMP 290", name: "Project I", credits: 1 },
    ],
  },
  {
    id: 5,
    name: "Semester V",
    courses: [
      { code: "CMP 331", name: "Applied Operating Systems", credits: 3 },
      { code: "CMP 350", name: "Simulation and Modeling", credits: 3 },
      {
        code: "CMP 457",
        name: "Artificial Intelligence and Neural Networks",
        credits: 3,
      },
      { code: "MGT 321", name: "Organization and Management", credits: 2 },
      {
        code: "CMP 325",
        name: "Analysis and Design of Algorithms",
        credits: 3,
      },
      { code: "CMP 311", name: "System Programming", credits: 3 },
    ],
  },
  {
    id: 6,
    name: "Semester VI",
    courses: [
      { code: "CMP 335", name: "Computer Networks", credits: 3 },
      {
        code: "CMP 312",
        name: "Principles of Programming Languages",
        credits: 3,
      },
      { code: "ECO 411", name: "Engineering Economics", credits: 3 },
      {
        code: "CMP 322",
        name: "Object Oriented Software Development",
        credits: 3,
      },
      { code: "CMP 341", name: "Multimedia Systems", credits: 3 },
      { code: "CMP 390", name: "Project II", credits: 2 },
    ],
  },
  {
    id: 7,
    name: "Semester VII",
    courses: [
      { code: "CMP 430", name: "Real Time Systems", credits: 3 },
      { code: "CMP 435", name: "Distributed Systems", credits: 3 },
      {
        code: "CMP 480",
        name: "Enterprise Application Development",
        credits: 3,
      },
      {
        code: "CMP 441",
        name: "Image Processing & Pattern Recognition",
        credits: 3,
      },
      {
        code: "CMP 421",
        name: "Software Testing, Verification, Validation and Quality Assurance",
        credits: 3,
      },
      { code: "Elective I", name: "Elective I", credits: 3 },
    ],
  },
  {
    id: 8,
    name: "Semester VIII",
    courses: [
      { code: "CMP 436", name: "Network Programming", credits: 3 },
      { code: "CMP 420", name: "Software Project Management", credits: 3 },
      { code: "Elective II", name: "Elective II", credits: 3 },
      { code: "CMP 490", name: "Project III", credits: 5 },
    ],
  },
];
