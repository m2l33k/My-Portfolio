import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { vi } from "vitest";

const Harness = () => {
  useKeyboardShortcuts();
  const location = useLocation();

  return (
    <div>
      <div data-testid="path">{location.pathname}</div>
      <section id="about">about</section>
      <section id="certifications">certifications</section>
      <section id="projects">projects</section>
      <section id="internships">internships</section>
      <section id="education">education</section>
      <section id="languages">languages</section>
      <section id="motivation">motivation</section>
    </div>
  );
};

const renderWithRoute = (route: string) =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Harness />
    </MemoryRouter>
  );

describe("useKeyboardShortcuts", () => {
  test("number shortcuts scroll to mapped section on home route", () => {
    const spy = vi.spyOn(Element.prototype, "scrollIntoView");
    renderWithRoute("/portfolio");

    fireEvent.keyDown(window, { key: "1" });

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });

  test("Escape navigates back to home when user is on another route", async () => {
    renderWithRoute("/chat");

    fireEvent.keyDown(window, { key: "Escape" });

    await waitFor(() => {
      expect(screen.getByTestId("path")).toHaveTextContent("/");
    });
  });

  test("Escape scrolls to top on home route", () => {
    renderWithRoute("/portfolio");

    fireEvent.keyDown(window, { key: "Escape" });

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });
});
