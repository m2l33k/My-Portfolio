import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useRef } from "react";
import emailjs from "emailjs-com";
import { useLanguage } from "@/context/LanguageContext";

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const form = useRef<HTMLFormElement>(null);
  const { t } = useLanguage();
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_USER_ID;

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

