import { Semester } from "./types";

export const electricalNewSemesters: Semester[] = [
  {
    id: 1,
    name: "Semester I",
    courses: [
      { code: "PHY 110", name: "Applied Physics", credits: 3 },
      { code: "ELE 130", name: "Basic Electrical Circuits", credits: 3 },
      { code: "MTH 110", name: "Calculus - I", credits: 3 },
      { code: "CMP 112", name: "Computer Programming", credits: 3 },
      { code: "ELE 132", name: "Electrical Installation Practice and Safety", credits: 2 },
      { code: "MEC 116", name: "Basic Engineering Drawing", credits: 1 },
      { code: "MEC 136", name: "Engineering Workshop", credits: 1 },
    ],
  },
  {
    id: 2,
    name: "Semester II",
    courses: [
      { code: "MTH 150", name: "Algebra and Geometry", credits: 3 },
      { code: "MEC 170", name: "Basic Mechanical Engineering", credits: 3 },
      { code: "ENG 110", name: "Communication Techniques", credits: 2 },
      { code: "ELE 174", name: "Electrical Engineering Material", credits: 3 },
      { code: "ELX 174", name: "Electronic Devices", credits: 3 },
      { code: "ELE 178", name: "Network Theory", credits: 3 },
    ],
  },
  {
    id: 3,
    name: "Semester III",
    courses: [
      { code: "MTH 210", name: "Calculus - II", credits: 3 },
      { code: "ELX 110", name: "Digital Logic", credits: 3 },
      { code: "ELE 230", name: "Electrical Machine I", credits: 3 },
      { code: "ELX 234", name: "Electromagnetic Fields and Waves", credits: 3 },
      { code: "ELX 232", name: "Electronic Circuits", credits: 3 },
      { code: "ELE 172", name: "Instrumentation", credits: 3 },
    ],
  },
  {
    id: 4,
    name: "Semester IV",
    courses: [
      { code: "MTH 250", name: "Applied Mathematics", credits: 3 },
      { code: "ELE 270", name: "Control System", credits: 3 },
      { code: "ELE 272", name: "Electrical Machine II", credits: 2 },
      { code: "ELX 270", name: "Microprocessors", credits: 3 },
      { code: "MTH 252", name: "Numerical Methods", credits: 3 },
      { code: "ELE 274", name: "Transmission and Distribution Systems", credits: 3 },
    ],
  },
  {
    id: 5,
    name: "Semester V",
    courses: [
      { code: "ELE 334", name: "Control System Design", credits: 2 },
      { code: "ELE 336", name: "Electrical Machine Design", credits: 3 },
      { code: "MGT 250", name: "Engineering Economics", credits: 3 },
      { code: "ELE 342", name: "Power Electronics", credits: 3 },
      { code: "ELE 340", name: "Power System Analysis", credits: 3 },
      { code: "ELX 330", name: "Signals and System", credits: 3 },
    ],
  },
  {
    id: 6,
    name: "Semester VI",
    courses: [
      { code: "MGT 320", name: "Engineering Management", credits: 3 },
      { code: "ELE 372", name: "High Voltage Engineering", credits: 3 },
      { code: "ELX 370", name: "Modern Communication System", credits: 3 },
      { code: "MTH 216", name: "Probability and Statistics", credits: 3 },
      { code: "ELE 374", name: "Switch Gear & Protection", credits: 3 },
      { code: "ELE 378", name: "Utilization of Electrical Energy", credits: 3 },
    ],
  },
  {
    id: 7,
    name: "Semester VII",
    courses: [
      { code: "Elective I", name: "Elective I", credits: 3 },
      { code: "Elective II", name: "Elective II", credits: 3 },
      { code: "ELE 434", name: "Power Plant Technology", credits: 3 },
      { code: "ELE 436", name: "Renewable Energy and Grid Integration", credits: 3 },
      { code: "ELE 338", name: "Research Methodology", credits: 2 },
      { code: "ELE 440", name: "Transmission and Distribution Design", credits: 3 },
    ],
  },
  {
    id: 8,
    name: "Semester VIII",
    courses: [
      { code: "Elective III", name: "Elective III", credits: 3 },
      { code: "INT 488", name: "Internship", credits: 3 },
      { code: "PRJ 452", name: "Major Project", credits: 3 },
    ],
  },
];

export const electricalOldSemesters: Semester[] = [
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
      { code: "ELE 112", name: "Electric Circuit Theory", credits: 3 },
      { code: "MEC 114", name: "Engineering Workshop", credits: 1 },
    ],
  },
  {
    id: 3,
    name: "Semester III",
    courses: [
      { code: "MTH 211", name: "Engineering Mathematics III", credits: 3 },
      { code: "ELE 211", name: "Electrical Engineering Materials", credits: 3 },
      { code: "ELX 213", name: "Digital Electronics", credits: 3 },
      { code: "ELE 213", name: "Electromagnetic Fields", credits: 3 },
      { code: "ELE 214", name: "Network Analysis & Synthesis", credits: 3 },
      { code: "ELX 212", name: "Instrumentation", credits: 3 },
    ],
  },
  {
    id: 4,
    name: "Semester IV",
    courses: [
      { code: "MTH 252", name: "Numerical Methods", credits: 3 },
      { code: "ELE 221", name: "Electrical Machines I", credits: 3 },
      { code: "ELX 221", name: "Analog Integrated Circuits", credits: 3 },
      { code: "ELE 222", name: "Control Systems", credits: 3 },
      { code: "ELE 223", name: "Thermal Science", credits: 2 },
      { code: "ELE 224", name: "Power Systems I", credits: 3 },
    ],
  },
  {
    id: 5,
    name: "Semester V",
    courses: [
      { code: "MTH 212", name: "Probability & Statistics", credits: 3 },
      { code: "ELE 311", name: "Electrical Machines II", credits: 3 },
      { code: "ELE 312", name: "Power Systems II", credits: 3 },
      { code: "ELX 311", name: "Microprocessors & Microcontrollers", credits: 3 },
      { code: "ELE 313", name: "Electrical Measurements & Instruments", credits: 3 },
      { code: "ELE 314", name: "Minor Project", credits: 2 },
    ],
  },
  {
    id: 6,
    name: "Semester VI",
    courses: [
      { code: "MGT 250", name: "Engineering Economics", credits: 3 },
      { code: "ELE 321", name: "Power Electronics", credits: 3 },
      { code: "ELE 322", name: "Switchgear & Protection", credits: 3 },
      { code: "ELE 323", name: "Utilization of Electrical Energy", credits: 2 },
      { code: "ELE 324", name: "Signal & Systems", credits: 3 },
      { code: "Elective I", name: "Elective I", credits: 3 },
    ],
  },
  {
    id: 7,
    name: "Semester VII",
    courses: [
      { code: "MGT 411", name: "Organization & Management", credits: 3 },
      { code: "ELE 411", name: "High Voltage Engineering", credits: 3 },
      { code: "ELE 412", name: "Electrical Machine Design", credits: 3 },
      { code: "ELE 413", name: "Power System Reliability", credits: 2 },
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

export const electricalElectivesList: ElectiveSubject[] = [
  { code: "ELE 470", name: "Power System Operation & Control" },
  { code: "ELE 471", name: "Advanced Power Electronics" },
  { code: "ELE 472", name: "High Voltage Transmission (HVDC/FACTS)" },
  { code: "ELE 473", name: "Smart Grid Technology" },
  { code: "ELE 474", name: "Distributed Generation" },
  { code: "ELE 475", name: "Electric Drives" },
  { code: "ELE 476", name: "Reliability Engineering" },
  { code: "ELE 478", name: "Industrial Automation & Control" },
  { code: "ELE 479", name: "Electrical Energy Auditing & Management" },
];
