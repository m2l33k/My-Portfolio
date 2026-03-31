import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LanguageProvider } from "@/context/LanguageContext";
import ContactForm from "@/components/portfolio/ContactForm";
import emailjs from "emailjs-com";
import { vi } from "vitest";

vi.mock("emailjs-com", () => ({
  default: {
    send: vi.fn(),
  },
}));

const renderForm = (onClose = vi.fn()) =>
  render(
    <LanguageProvider>
      <ContactForm onClose={onClose} />
    </LanguageProvider>
  );

describe("ContactForm critical flows", () => {
  beforeEach(() => {
    localStorage.clear();
    Object.assign(import.meta.env, {
      VITE_EMAILJS_SERVICE_ID: "service_test",
      VITE_EMAILJS_TEMPLATE_ID: "template_test",
      VITE_EMAILJS_USER_ID: "public_test",
    });
    vi.spyOn(window, "alert").mockImplementation(() => {});
    vi.mocked(emailjs.send).mockReset();
  });

  test("shows validation alert when required fields are missing", () => {
    const { container } = renderForm();
    const form = container.querySelector("form");

    fireEvent.submit(form!);

    expect(window.alert).toHaveBeenCalledWith("Please fill all fields before sending.");
    expect(emailjs.send).not.toHaveBeenCalled();
  });

  test("rate limit blocks second immediate send", async () => {
    vi.mocked(emailjs.send).mockResolvedValue({ status: 200, text: "OK" } as never);
    const onClose = vi.fn();
    const { container } = renderForm(onClose);
    const form = container.querySelector("form");

    fireEvent.change(screen.getByPlaceholderText("Your Name"), { target: { value: "Malek" } });
    fireEvent.change(screen.getByPlaceholderText("Your Email"), { target: { value: "malek@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Your Message"), { target: { value: "Hello there" } });

    fireEvent.submit(form!);

    await waitFor(() => {
      expect(emailjs.send).toHaveBeenCalledTimes(1);
    });
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.submit(form!);

    expect(emailjs.send).toHaveBeenCalledTimes(1);
    expect(window.alert).toHaveBeenCalledWith(expect.stringMatching(/^Please wait \d+s before sending another message\.$/));
  });
});
