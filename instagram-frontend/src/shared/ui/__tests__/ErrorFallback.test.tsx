import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ErrorFallback } from "../ErrorFallback";

describe("ErrorFallback", () => {
  it("renders the default title and a reload button", () => {
    render(<ErrorFallback />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reload page/i }),
    ).toBeInTheDocument();
  });

  it("renders a custom title and message", () => {
    render(<ErrorFallback title="Page not found" message="It's gone" />);
    expect(screen.getByText("Page not found")).toBeInTheDocument();
    expect(screen.getByText("It's gone")).toBeInTheDocument();
  });

  it("calls onReload when the button is clicked", async () => {
    const onReload = vi.fn();
    const user = userEvent.setup();

    render(<ErrorFallback onReload={onReload} />);
    await user.click(screen.getByRole("button", { name: /reload page/i }));

    expect(onReload).toHaveBeenCalledOnce();
  });
});
