import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import { useLanguage } from "@/context/LanguageContext";

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const form = useRef<HTMLFormElement>(null);
  const [lastSent, setLastSent] = useState(0);
  const { t, lang } = useLanguage();
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_USER_ID;

  const RATE_LIMIT_MS = 60_000; // 1 minute between sends

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!serviceId || !templateId || !publicKey) {
      console.error("EmailJS is not configured. Missing environment variables.", {
        hasServiceId: Boolean(serviceId),
        hasTemplateId: Boolean(templateId),
        hasPublicKey: Boolean(publicKey),
      });
      alert("Email service is not configured. Set VITE_EMAILJS_* in .env and restart dev server.");
      return;
    }

    if (!form.current) {
      return;
    }

    const formData = new FormData(form.current);

    // Honeypot: if this hidden field is filled, it's a bot
    const honeypot = String(formData.get("website") ?? "").trim();
    if (honeypot) {
      alert(t("hero.contactSuccess")); // fake success for bots
      onClose();
      return;
    }

    // Rate limiting
    const now = Date.now();
    if (now - lastSent < RATE_LIMIT_MS) {
      const wait = Math.ceil((RATE_LIMIT_MS - (now - lastSent)) / 1000);
      alert(lang === "en"
        ? `Please wait ${wait}s before sending another message.`
        : `Veuillez patienter ${wait}s avant d'envoyer un autre message.`);
      return;
    }

    const userName = String(formData.get("user_name") ?? "").trim();
    const userEmail = String(formData.get("user_email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!userName || !userEmail || !message) {
      alert("Please fill all fields before sending.");
      return;
    }

    emailjs
      .send(
        serviceId,
        templateId,
        {
          user_name: userName,
          user_email: userEmail,
          message,
          title: message,
          from_name: userName,
          from_email: userEmail,
          reply_to: userEmail,
          name: userName,
          email: userEmail,
        },
        publicKey
      )
      .then(
        () => {
          setLastSent(Date.now());
          alert(t("hero.contactSuccess"));
          onClose();
        },
        (error) => {
          const status = (error as { status?: number })?.status;
          const text = (error as { text?: string })?.text;
          console.error("EmailJS send failed", { status, text, error });
          alert(`${t("hero.contactError")} (${status ?? "?"}: ${text ?? "unknown error"})`);
        }
      );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg mx-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{t("hero.contactForm")}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            {/* Honeypot field - hidden from real users, bots will fill it */}
            <input
              type="text"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
              aria-hidden="true"
            />
            <Input placeholder={t("hero.contactName")} name="user_name" required />
            <Input type="email" placeholder={t("hero.contactEmail")} name="user_email" required />
            <Textarea placeholder={t("hero.contactMessage")} name="message" required />
            <Button type="submit" className="w-full">
              {t("hero.contactSend")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;

