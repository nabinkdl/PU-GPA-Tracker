import { Semester, Program } from "./types";
import { semestersData as softwareOldSemesters } from "./courseData";
import { newSemestersData as softwareNewSemesters, electivesList as softwareNewElectives } from "./courseDataNew";
import { computerNewSemesters, computerOldSemesters, computerElectivesList } from "./courseDataComputer";
import { civilNewSemesters, civilOldSemesters, civilElectivesList } from "./courseDataCivil";
import { electricalNewSemesters, electricalOldSemesters, electricalElectivesList } from "./courseDataElectrical";

export const programRegistry: Record<
  Program,
  {
    name: string;
    new: Semester[];
    old: Semester[];
    electives: { code: string; name: string }[];
  }
> = {
  software: {
    name: "Software Engineering",
    new: softwareNewSemesters,
    old: softwareOldSemesters,
    electives: softwareNewElectives,
  },
  computer: {
    name: "Computer Engineering",
    new: computerNewSemesters,
    old: computerOldSemesters,
    electives: computerElectivesList,
  },
  civil: {
    name: "Civil Engineering",
    new: civilNewSemesters,
    old: civilOldSemesters,
    electives: civilElectivesList,
  },
  electrical: {
    name: "Electrical Engineering",
    new: electricalNewSemesters,
    old: electricalOldSemesters,
    electives: electricalElectivesList,
  },
};
