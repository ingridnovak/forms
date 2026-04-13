import { describe, it, expect } from "vitest";
import { resolvers } from "./resolvers.js";

describe("resolvers", () => {
  it("Mutation.createForm creates a form and makes it queryable", () => {
    const created = resolvers.Mutation.createForm(null, {
      title: "Survey",
      questions: [{ text: "Name?", type: "TEXT", options: [] }],
    });

    expect(created.id).toBeTruthy();
    expect(resolvers.Query.form(null, { id: created.id })).toEqual(created);
  });

  it("Mutation.submitResponse throws when the form does not exist", () => {
    expect(() =>
      resolvers.Mutation.submitResponse(null, {
        formId: "missing-id",
        answers: [],
      }),
    ).toThrow(/Form missing-id not found/);
  });
});
