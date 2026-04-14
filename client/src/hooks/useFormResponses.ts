import {
  useGetFormQuery,
  useGetResponsesQuery,
} from "../api/generated";

export function useFormResponses(formId: string | undefined) {
  const formQuery = useGetFormQuery(
    { id: formId ?? "" },
    { skip: !formId },
  );

  const responsesQuery = useGetResponsesQuery(
    { formId: formId ?? "" },
    { skip: !formId },
  );

  const isLoading = formQuery.isLoading || responsesQuery.isLoading;
  const error = formQuery.error || responsesQuery.error;

  const form = formQuery.data?.form ?? null;
  const responses = responsesQuery.data?.responses ?? [];

  const questionTextById = new Map<string, string>(
    form?.questions.map((q) => [q.id, q.text]) ?? [],
  );

  return {
    form,
    responses,
    questionTextById,
    isLoading,
    error,
  };
}
