import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useGetFormQuery,
  useSubmitResponseMutation,
} from "../api/generated";
import { baseApi } from "../api/baseApi";

export type AnswerMap = Record<string, string[]>;

export function useFormFiller(formId: string | undefined) {
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetFormQuery(
    { id: formId ?? "" },
    { skip: !formId },
  );

  const [
    submitResponse,
    { isLoading: isSubmitting, isSuccess, error: submitError },
  ] = useSubmitResponseMutation();

  const [answers, setAnswers] = useState<AnswerMap>({});

  const setAnswer = (questionId: string, values: string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: values }));
  };

  const submit = async () => {
    if (!formId || !data?.form) return;
    try {
      await submitResponse({
        formId,
        answers: data.form.questions.map((q) => ({
          questionId: q.id,
          values: answers[q.id] ?? [],
        })),
      }).unwrap();
      dispatch(baseApi.util.invalidateTags(["Response"]));
    } catch {
      // captured by submitError
    }
  };

  return {
    form: data?.form ?? null,
    isLoading,
    loadError: error,
    answers,
    setAnswer,
    submit,
    isSubmitting,
    isSuccess,
    submitError,
  };
}
