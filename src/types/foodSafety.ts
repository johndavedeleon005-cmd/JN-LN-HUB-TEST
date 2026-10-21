export type DocumentType = 'policy' | 'sop' | 'guide';

export type DepartmentCategory =
  | 'All'
  | 'Corporate & Quality'
  | 'Temperature & Cold Chain'
  | 'Allergens & Health'
  | 'Sanitation & Pest'
  | 'Receiving & Storage'
  | 'Operations & Maintenance'
  | 'Uniform & Visitor';

export interface PolicySection {
  id: string;
  title: string;
  content: string;
  bulletPoints?: string[];
  subsections?: {
    id: string;
    title: string;
    content: string;
    bulletPoints?: string[];
  }[];
}

export interface PolicyTable {
  title: string;
  headers: string[];
  rows: (string | { color?: string; text: string; bg?: string })[][];
}

export interface PolicySignatories {
  preparedBy: string;
  reviewedBy: string[];
  approvedBy: string;
}

export interface ChangeHistoryItem {
  rev: number;
  date: string;
  author: string;
  purpose: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface QuickRule {
  title: string;
  rule: string;
  type: 'critical' | 'warning' | 'info';
}

export interface FoodSafetyDoc {
  id: string;
  code: string; // e.g. "IKQAP#001" or "IKQA-SOP#010"
  title: string;
  type: DocumentType;
  category: DepartmentCategory;
  revision: number;
  effectiveDate: string;
  pdfUrl: string; // e.g. "/assets/aistudio/..."
  summary: string;
  keyTakeaways: string[];
  quickRules?: QuickRule[];
  tables?: PolicyTable[];
  sections: PolicySection[];
  signatories: PolicySignatories;
  changeHistory: ChangeHistoryItem[];
  quizQuestions?: QuizQuestion[];
  tags: string[];
  isCustom?: boolean;
}

export interface ComplianceStats {
  totalDocs: number;
  policiesCount: number;
  sopsCount: number;
  guidesCount: number;
  readCount: number;
  bookmarkedCount: number;
}
