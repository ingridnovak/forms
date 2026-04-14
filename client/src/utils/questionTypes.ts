import type { QuestionType } from "../api/generated";

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  TEXT: "Short text",
  MULTIPLE_CHOICE: "Multiple choice",
  CHECKBOX: "Checkboxes",
  DATE: "Date",
};

export const ALL_QUESTION_TYPES: QuestionType[] = [
  "TEXT",
  "MULTIPLE_CHOICE",
  "CHECKBOX",
  "DATE",
];

export const questionNeedsOptions = (type: QuestionType): boolean =>
  type === "MULTIPLE_CHOICE" || type === "CHECKBOX";
