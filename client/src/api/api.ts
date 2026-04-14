import { api as injectedApi } from "./generated";

const enhancedApi = injectedApi.enhanceEndpoints({
  endpoints: {
    GetForms: {
      providesTags: ["Form"],
    },
    GetForm: {
      providesTags: (_result, _error, { id }) => [{ type: "Form", id }],
    },
    CreateForm: {
      invalidatesTags: ["Form"],
    },
    GetResponses: {
      providesTags: (_result, _error, { formId }) => [
        { type: "Response", id: formId },
      ],
    },
    SubmitResponse: {
      invalidatesTags: (_result, _error, { formId }) => [
        { type: "Response", id: formId },
      ],
    },
  },
});

export const {
  useGetFormsQuery,
  useGetFormQuery,
  useCreateFormMutation,
  useGetResponsesQuery,
  useSubmitResponseMutation,
} = enhancedApi;
