import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCreateFormMutation, type QuestionType } from "../api/generated";
import { baseApi } from "../api/baseApi";
import { questionNeedsOptions } from "../utils/questionTypes";

export type DraftQuestion = {
  id: string;
  text: string;
  type: QuestionType;
  options: string[];
};

const newId = () => crypto.randomUUID();

const createEmptyQuestion = (): DraftQuestion => ({
  id: newId(),
  text: "",
  type: "TEXT",
  options: [],
});

export function useFormBuilder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [createForm, { isLoading: isSubmitting, error: submitError }] =
    useCreateFormMutation();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<DraftQuestion[]>([
    createEmptyQuestion(),
  ]);

  const addQuestion = () => {
    setQuestions((prev) => [...prev, createEmptyQuestion()]);
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const updateQuestion = (id: string, patch: Partial<DraftQuestion>) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== id) return q;
        const next = { ...q, ...patch };
        if (patch.type && !questionNeedsOptions(patch.type)) {
          next.options = [];
        }
        if (patch.type && questionNeedsOptions(patch.type) && next.options.length === 0) {
          next.options = [""];
        }
        return next;
      }),
    );
  };

  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId ? { ...q, options: [...q.options, ""] } : q,
      ),
    );
  };

  const removeOption = (questionId: string, index: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((_, i) => i !== index) }
          : q,
      ),
    );
  };

  const updateOption = (questionId: string, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, i) => (i === index ? value : opt)),
            }
          : q,
      ),
    );
  };

  const validationErrors = validateDraft(title, questions);
  const canSubmit =
    Object.keys(validationErrors).length === 0 && questions.length > 0;

  const submit = async () => {
    if (!canSubmit) return;
    try {
      await createForm({
        title: title.trim(),
        description: description.trim() || null,
        questions: questions.map((q) => ({
          text: q.text.trim(),
          type: q.type,
          options: questionNeedsOptions(q.type) ? q.options : null,
        })),
      }).unwrap();
      dispatch(baseApi.util.invalidateTags(["Form"]));
      navigate("/");
    } catch {
      // error is captured in submitError
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    questions,
    addQuestion,
    removeQuestion,
    updateQuestion,
    addOption,
    removeOption,
    updateOption,
    submit,
    canSubmit,
    validationErrors,
    isSubmitting,
    submitError,
  };
}

export type ValidationErrors = {
  title?: string;
  questions?: Record<string, string>;
};

function validateDraft(
  title: string,
  questions: DraftQuestion[],
): ValidationErrors {
  const errors: ValidationErrors = {};

  if (title.trim().length === 0) {
    errors.title = "Title is required";
  }

  const questionErrors: Record<string, string> = {};
  for (const q of questions) {
    if (q.text.trim().length === 0) {
      questionErrors[q.id] = "Question text is required";
      continue;
    }
    if (questionNeedsOptions(q.type)) {
      const nonEmptyOptions = q.options.filter((o) => o.trim().length > 0);
      if (nonEmptyOptions.length === 0) {
        questionErrors[q.id] = "Add at least one option";
      }
    }
  }

  if (Object.keys(questionErrors).length > 0) {
    errors.questions = questionErrors;
  }

  return errors;
}
