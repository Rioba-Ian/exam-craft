export type Grade = "PP1" | "PP2" | "PP3";
export type PageId = "home" | "polish" | "builder" | "bank" | "exams";
export type QType = "Multiple Choice" | "Fill in Blank" | "True / False" | "Match" | "Circle Correct" | "Short Answer";
export type Source = "Easy Elimu" | "Shulefiti" | "KNEC Papers" | "Teachers Plus" | "Maktaba" | "Manual Entry";
export type TagVariant = "green" | "orange" | "blue" | "amber" | "muted";
export type BtnVariant = "primary" | "sienna" | "ghost" | "amber";
export type Dim1Step = 0 | 1 | 2 | 3 | 4;

export interface NavItem {
  id: PageId;
  icon: string;
  label: string;
  badge?: string;
}

export interface Question {
  id: number;
  grade: Grade;
  subject: string;
  topic: string;
  type: QType;
  text: string;
  answer: string;
  source: Source;
  hasImage: boolean;
}

export interface ExamSection {
  id: string;
  name: string;
  questions: Question[];
}

export interface ExamMeta {
  title: string;
  grade: Grade;
  subject: string;
  school: string;
}

export interface DetectedQuestion {
  id: number;
  text: string;
  hasDrawing: boolean;
  drawingLabel?: string;
  position?: { x: number; y: number };
}

export interface DetectedSection {
  id: string;
  name: string;
  questions: DetectedQuestion[];
}

export interface ScanResult {
  title: string;
  grade: Grade;
  subject: string;
  school: string;
  term: string;
  sections: DetectedSection[];
}

export interface ImageOption {
  id: number;
  url: string;
  label: string;
  source: string;
}

export interface SelectedImages {
  [drawingLabel: string]: ImageOption;
}

export interface PageMeta {
  title: string;
  subtitle: string;
}

export interface StatCard {
  label: string;
  value: string;
  icon: string;
}

export interface DimCardData {
  dim: string;
  color: string;
  light: string;
  icon: string;
  title: string;
  label: string;
  desc: string;
  steps: string[];
  cta: string;
  page: PageId;
}

export interface SourceInfo {
  name: Source;
  icon: string;
  url: string;
}
