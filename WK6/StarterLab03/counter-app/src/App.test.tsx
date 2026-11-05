import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Counter App", () => {
  it("starts at 0 and shows all buttons", () => {
    render(<App />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
    expect(screen.getByText("Increment")).toBeInTheDocument();
    expect(screen.getByText("Decrement")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  it("increments from 0 to 1", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });

  it("decrements from 0 to -1", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Decrement"));
    expect(screen.getByText("Count: -1")).toBeInTheDocument();
  });

  it("resets to 0 after changing", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("handles a sequence of actions", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Increment"));
    fireEvent.click(screen.getByText("Increment"));
    expect(screen.getByText("Count: 2")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Decrement"));
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Reset"));
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });
});
