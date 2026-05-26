import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@/test/test-utils";
import Button from "./Button";

describe("Button", () => {
  it("renders button with children", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i }),
    ).toBeInTheDocument();
  });
  it("calls onClick when button is clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Submit</Button>);
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(onClick).toHaveBeenCalledOnce();
  });
  it("creates button snapshot", () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.innerHTML).toMatchSnapshot();
  });
});
