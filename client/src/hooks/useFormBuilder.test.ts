import { describe, it, expect } from "vitest";
import { validateDraft, type DraftQuestion } from "./useFormBuilder";

const makeQuestion = (
  overrides: Partial<DraftQuestion> = {},
): DraftQuestion => ({
  id: "q1",
  text: "A question",
  type: "TEXT",
  options: [],
  ...overrides,
});

describe("validateDraft", () => {
  it("requires a non-empty title", () => {
    const errors = validateDraft("", [makeQuestion()]);
    expect(errors.title).toBe("Title is required");
  });

  it("requires every question to have text", () => {
    const errors = validateDraft("My form", [
      makeQuestion({ id: "q1", text: "" }),
    ]);
    expect(errors.questions?.q1).toBe("Question text is required");
  });

  it("requires MULTIPLE_CHOICE and CHECKBOX questions to have at least one option", () => {
    const errors = validateDraft("My form", [
      makeQuestion({
        id: "q1",
        text: "Pick one",
        type: "MULTIPLE_CHOICE",
        options: ["", ""],
      }),
    ]);
    expect(errors.questions?.q1).toBe("Add at least one option");
  });

  it("returns no errors for a valid draft", () => {
    const errors = validateDraft("My form", [
      makeQuestion({ id: "q1", text: "Your name", type: "TEXT" }),
      makeQuestion({
        id: "q2",
        text: "Pick one",
        type: "MULTIPLE_CHOICE",
        options: ["A", "B"],
      }),
    ]);
    expect(errors).toEqual({});
  });
});
