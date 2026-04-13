import { describe, it, expect } from "vitest";
import { questionNeedsOptions } from "./questionTypes";

describe("questionNeedsOptions", () => {
  it("identifies which question types require options", () => {
    expect(questionNeedsOptions("MULTIPLE_CHOICE")).toBe(true);
    expect(questionNeedsOptions("CHECKBOX")).toBe(true);
    expect(questionNeedsOptions("TEXT")).toBe(false);
    expect(questionNeedsOptions("DATE")).toBe(false);
  });
});
