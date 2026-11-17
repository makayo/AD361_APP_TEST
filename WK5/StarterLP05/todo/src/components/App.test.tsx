import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("Loop Coverage - App", () => {
  it("renders zero todos initially", () => {
    render(<App />);
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("renders one todo", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByPlaceholderText(/add a todo/i), "Buy milk");
    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });

  it("renders several todos", async () => {
    const user = userEvent.setup();
    render(<App />);

    for (const text of ["Buy milk", "Walk dog", "Write tests"]) {
      await user.type(screen.getByPlaceholderText(/add a todo/i), text);
      await user.click(screen.getByRole("button", { name: /^add$/i }));
    }

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(screen.getByText("Walk dog")).toBeInTheDocument();
    expect(screen.getByText("Write tests")).toBeInTheDocument();
  });
});

describe("Integration Testing - App", () => {
  it("adds a todo and clears the input", async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByPlaceholderText(/add a todo/i);

    await user.type(input, "Buy milk");
    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(screen.getByText("Buy milk")).toBeInTheDocument();
    expect(input).toHaveValue("");
  });

  it("adds, completes, and deletes a todo", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(
      screen.getByPlaceholderText(/add a todo/i),
      "Buy milk"
    );
    await user.click(screen.getByRole("button", { name: /^add$/i }));

    expect(screen.getByText("Buy milk")).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(screen.getByRole("button", { name: /delete/i }));

    expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
