// src/types.ts

// Enum types for better type safety
export enum EnglishProficiency {
  NATIVE = 'NATIVE',
  IELTS = 'IELTS',
  TOEFL = 'TOEFL',
  PTE = 'PTE',
}

export enum FinancialStatus {
  SUFFICIENT = 'SUFFICIENT',
  SCHOLARSHIP = 'SCHOLARSHIP',
  LOAN = 'LOAN',
  PARTIAL = 'PARTIAL',
}

export interface VisaFormData {
  age: number;
  countryOfOrigin: string;
  intendedStudy: string;
  selectedField: string;
  hasRelatedStudy: boolean;
  priorStudyDetails: string;
  hasWorkExperience: boolean;
  workExperienceYears: number;
  englishProficiency: string;
  englishTestScore: string;
  previousVisa: string;
  healthInsurance: boolean;
  financialStatus: string;
  studyPoints: number;
  educationLevel: string;
}

export interface StepProps {
  data: VisaFormData;
  updateFields: (fields: Partial<VisaFormData>) => void;
}

export interface ResultsProps {
  data: VisaFormData;
}

export interface ScoreDetail {
  category: string;
  score: number;
  maxScore: number;
  notes?: string[];
  explanation: string;
  improvement?: string[];
}

export interface CalculatedScore {
  score: number;
  details: ScoreDetail[];
}

export interface CountryAssessmentLevel {
  name: string;
  level: number;
  riskFactor: number;
}

export interface StudyField {
  id: string;
  name: string;
  priorityLevel: number;
}

export interface StudyLevel {
  id: string;
  name: string;
  requiredScore: number;
}
