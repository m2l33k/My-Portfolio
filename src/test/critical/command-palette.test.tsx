import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/context/LanguageContext";
import CommandPalette from "@/components/portfolio/CommandPalette";
import { vi } from "vitest";

vi.mock("@vercel/analytics", () => ({
  track: vi.fn(),
}));

const renderPalette = () =>
  render(
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <LanguageProvider>
        <MemoryRouter>
          <CommandPalette />
        </MemoryRouter>
      </LanguageProvider>
    </ThemeProvider>
  );

describe("CommandPalette", () => {
  test("opens and closes with Ctrl+K", async () => {
    const user = userEvent.setup();
    renderPalette();

    expect(screen.queryByPlaceholderText(/type a command or search/i)).not.toBeInTheDocument();

    await user.keyboard("{Control>}k{/Control}");
    expect(await screen.findByPlaceholderText(/type a command or search/i)).toBeInTheDocument();
    expect(screen.getByText("Pages")).toBeInTheDocument();

    await user.keyboard("{Control>}k{/Control}");
    await waitFor(() => {
      expect(screen.queryByPlaceholderText(/type a command or search/i)).not.toBeInTheDocument();
    });
  });
});
