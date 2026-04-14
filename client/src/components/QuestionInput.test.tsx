import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import QuestionInput from "./QuestionInput";

const makeQuestion = (
  overrides: Partial<Parameters<typeof QuestionInput>[0]["question"]> = {},
) => ({
  id: "q1",
  text: "Your name",
  type: "TEXT" as const,
  options: null,
  ...overrides,
});

describe("QuestionInput", () => {
  it("TEXT: emits a single-element array when the user types", () => {
    const onChange = vi.fn();
    render(
      <QuestionInput
        question={makeQuestion({ type: "TEXT" })}
        value={[]}
        onChange={onChange}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Your answer"), {
      target: { value: "Alice" },
    });
    expect(onChange).toHaveBeenCalledWith(["Alice"]);
  });

  it("MULTIPLE_CHOICE: emits a single-element array when a radio is picked", () => {
    const onChange = vi.fn();
    render(
      <QuestionInput
        question={makeQuestion({
          type: "MULTIPLE_CHOICE",
          options: ["Red", "Blue"],
        })}
        value={[]}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByLabelText("Red"));
    expect(onChange).toHaveBeenCalledWith(["Red"]);
  });

  it("CHECKBOX: toggles values in and out of the array", () => {
    const onChange = vi.fn();
    const { rerender } = render(
      <QuestionInput
        question={makeQuestion({
          type: "CHECKBOX",
          options: ["Apples", "Bananas"],
        })}
        value={[]}
        onChange={onChange}
      />,
    );

    fireEvent.click(screen.getByLabelText("Apples"));
    expect(onChange).toHaveBeenCalledWith(["Apples"]);

    rerender(
      <QuestionInput
        question={makeQuestion({
          type: "CHECKBOX",
          options: ["Apples", "Bananas"],
        })}
        value={["Apples"]}
        onChange={onChange}
      />,
    );
    fireEvent.click(screen.getByLabelText("Apples"));
    expect(onChange).toHaveBeenLastCalledWith([]);
  });
});
