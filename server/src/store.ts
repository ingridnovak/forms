import { randomUUID } from "node:crypto";

export type QuestionType = "TEXT" | "MULTIPLE_CHOICE" | "CHECKBOX" | "DATE";

export type Question = {
  id: string;
  text: string;
  type: QuestionType;
  options?: string[];
};

export type Form = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};

export type Answer = {
  questionId: string;
  values: string[];
};

export type Response = {
  id: string;
  formId: string;
  answers: Answer[];
  submittedAt: string;
};

const forms = new Map<string, Form>();
const responses = new Map<string, Response>();

export const store = {
  listForms: (): Form[] => Array.from(forms.values()),

  getForm: (id: string): Form | undefined => forms.get(id),

  createForm: (input: {
    title: string;
    description?: string;
    questions: Omit<Question, "id">[];
  }): Form => {
    const form: Form = {
      id: randomUUID(),
      title: input.title,
      description: input.description,
      questions: input.questions.map((q) => ({ ...q, id: randomUUID() })),
    };
    forms.set(form.id, form);
    return form;
  },

  listResponses: (formId: string): Response[] =>
    Array.from(responses.values()).filter((r) => r.formId === formId),

  createResponse: (formId: string, answers: Answer[]): Response => {
    const response: Response = {
      id: randomUUID(),
      formId,
      answers,
      submittedAt: new Date().toISOString(),
    };
    responses.set(response.id, response);
    return response;
  },
};
