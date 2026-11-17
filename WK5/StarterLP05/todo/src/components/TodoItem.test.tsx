import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem from "./TodoItem";

describe("Unit Testing - TodoItem", () => {
  const todo = { id: 42, text: "Buy milk", done: false };

  it("calls onToggle with the correct ID", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(
      <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
    );

    await user.click(screen.getByRole("checkbox"));

    expect(onToggle).toHaveBeenCalledWith(42);
    expect(onDelete).not.toHaveBeenCalled();
  });

  it("calls onDelete with the correct ID", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(
      <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
    );

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(onDelete).toHaveBeenCalledWith(42);
    expect(onToggle).not.toHaveBeenCalled();
  });
});
