import { describe, it, expect } from "vitest";
import { addTodo } from "./todoUtils";

describe("Statement Coverage - addTodo", () => {
  it("creates a todo with the correct values", () => {
    const result = addTodo([], "Buy milk");

    expect(result).toHaveLength(1);
    expect(result[0].text).toBe("Buy milk");
    expect(result[0].done).toBe(false);
    expect(typeof result[0].id).toBe("number");
  });
});

describe("Branch Coverage - addTodo", () => {
  it("rejects blank input", () => {
    const result = addTodo([], "   ");
    expect(result).toEqual([]);
  });

  it("accepts valid input", () => {
    const result = addTodo([], "Write tests");

    expect(result).toHaveLength(1);
    expect(result[0].text).toBe("Write tests");
  });
});
