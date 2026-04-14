import { describe, it, expect } from "vitest";
import { store } from "./store.js";

describe("store", () => {
  it("createForm generates unique ids for the form and each question", () => {
    const form = store.createForm({
      title: "My form",
      questions: [
        { text: "Q1", type: "TEXT", options: [] },
        { text: "Q2", type: "MULTIPLE_CHOICE", options: ["A", "B"] },
      ],
    });

    expect(form.id).toBeTruthy();
    expect(form.questions.map((q) => q.id)).toHaveLength(2);
    expect(form.questions[0].id).not.toBe(form.questions[1].id);
  });

  it("listResponses returns only responses for the requested form", () => {
    const formA = store.createForm({ title: "A", questions: [] });
    const formB = store.createForm({ title: "B", questions: [] });

    store.createResponse(formA.id, [{ questionId: "q", values: ["x"] }]);
    store.createResponse(formB.id, [{ questionId: "q", values: ["y"] }]);
    store.createResponse(formA.id, [{ questionId: "q", values: ["z"] }]);

    const responses = store.listResponses(formA.id);
    expect(responses).toHaveLength(2);
    expect(responses.every((r) => r.formId === formA.id)).toBe(true);
  });
});
