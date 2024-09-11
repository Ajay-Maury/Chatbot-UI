import { Dispatch, SetStateAction } from "react";

// Define types for personal details
export interface IPersonalDetails {
  firstName: string;
  lastName: string;
  phone: string;
  dob: null | Date;
  gender: string;
  linkedinUrl: string;
  profileImage: string;
  city: string;
  state: string;
  country: string;
}

export interface FileObject {
  file: File | null;
  url: string;
  id: string;
}

export interface FilesState {
  curriculumVitae: string;
  highSchoolCertificate: string;
}

export type applicationQuestionType = {
  startup_overview: string;
  startup_inspiration: string;
  startup_differentiation: string;
};

export interface User {
  personalDetails: IPersonalDetails;
  academicDetails: FilesState;
  applicationQuestion: {
    startup_overview: string;
    startup_inspiration: string;
    startup_differentiation: string;
  };
  navigator_state: number;
}

export interface IPersonalDetailsError {
  name: string;
  mobileNumber: string;
  dob: string;
  gender: string;
  linkdinUrl: string;
  profileFile: string;
}

export interface IAcademicDetailsError {
  curriculumVitae: string;
  highSchoolCertificate: string;
}

export interface IApplicationError {
  personalDetails: IPersonalDetailsError;
  academicDetails: IAcademicDetailsError;
}

export type ApplicationDetailsErrorType = {
  firstName: string;
  lastName: string;
  phone: string;
  dob: string;
  gender: string;
  linkedinUrl: string;
  profileImage: string;
  [key: string]: string;
};

export type academicDetailsErrorType = {
  curriculumVitae: string;
  highSchoolCertificate: string;
};

export type academicDetailsType = {
  curriculumVitae: string;
  highSchoolCertificate: string;
};

export type applicationQuestionErrorType = {
  startup_overview: string;
  startup_inspiration: string;
  startup_differentiation: string;
  [key: string]: string;
};
