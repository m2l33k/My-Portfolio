import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_USER_ID
      )
      .then((result) => {
          console.log(result.text);
          alert('Message sent successfully!');
          onClose(); // Close the modal on success
      }, (error) => {
          console.log(error.text);
          alert('Failed to send message, please try again.');
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-lg mx-4">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Contact Me</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form ref={form} onSubmit={sendEmail} className="space-y-4">
            <Input placeholder="Your Name" name="user_name" />
            <Input type="email" placeholder="Your Email" name="user_email" />
            <Textarea placeholder="Your Message" name="message" />
            <Button type="submit" className="w-full">Send Message</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactForm;
