import { store, type QuestionType } from "./store.js";

export const resolvers = {
  Query: {
    forms: () => store.listForms(),
    form: (_: unknown, args: { id: string }) => store.getForm(args.id),
    responses: (_: unknown, args: { formId: string }) =>
      store.listResponses(args.formId),
  },

  Mutation: {
    createForm: (
      _: unknown,
      args: {
        title: string;
        description?: string;
        questions: { text: string; type: QuestionType; options?: string[] }[];
      },
    ) => store.createForm(args),

    submitResponse: (
      _: unknown,
      args: {
        formId: string;
        answers: { questionId: string; values: string[] }[];
      },
    ) => {
      const form = store.getForm(args.formId);
      if (!form) throw new Error(`Form ${args.formId} not found`);
      return store.createResponse(args.formId, args.answers);
    },
  },
};
