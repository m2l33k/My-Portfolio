import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, ArrowLeft, Loader2 } from "lucide-react";
import { projects, internships, certifications, education, onlineCourses } from "@/data/portfolio";

interface Message {
  role: "user" | "assistant" | "developer";
  content: string;
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Hello! I'm Malek's AI assistant. I can tell you about his projects, internships, certifications, and skills. What would you like to know?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const generateResponse = async (query: string, history: Message[]) => {
    
    const systemContext = `
    You are an AI assistant for Malek Hassayoun's portfolio. 
    Your goal is to answer questions about Malek's professional background, skills, and projects based strictly on the data provided below.
    Be professional, concise, and helpful.
    
    Data:
    Projects: ${JSON.stringify(projects.map(p => ({ title: p.title, description: p.description, technologies: p.technologies, highlights: p.highlights })))}
    Internships: ${JSON.stringify(internships.map(i => ({ company: i.company, role: i.role, period: i.period, description: i.description, technologies: i.technologies })))}
    Certifications: ${JSON.stringify(certifications.map(c => ({ name: c.name, issuer: c.issuer, date: c.date, skills: c.skills })))}
    Education: ${JSON.stringify(education.map(e => ({ degree: e.degree, institution: e.institution, period: e.period, description: e.description, coursework: e.coursework })))}
    Online Courses: ${JSON.stringify(onlineCourses)}
    
    If the user asks about something not in this data, politely say you don't have that information.
    `;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemContext },
            ...history.map(m => ({ role: m.role === "assistant" ? "assistant" : "user" as const, content: m.content })),
            { role: "user", content: query }
          ]
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      console.log("AI Response:", data);

      if (!data.choices || data.choices.length === 0) {
        return "Error: No response choices returned from the AI.";
      }

      const choice = data.choices[0];
      
      // Note: Llama models might not return finish_reason as "content_filter" in the same way, but keeping the check is safe.
      if (choice.finish_reason === "content_filter") {
        return "I apologize, but I cannot answer that request due to content safety filters.";
      }

      return choice.message.content || "Error: The AI returned an empty response.";
    } catch (error: any) {
      console.error("AI Error:", error);
      return `Sorry, I encountered an error: ${error.message || "Unknown error"}. Please check your network or API token.`;
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Pass the recent history (excluding the initial greeting) to context window if needed, 
      // or just pass the current conversation so far.
      // We filter out the 'developer' role from state messages if we had any, but we only have user/assistant in state.
      const responseContent = await generateResponse(userMessage.content, messages);
      setMessages(prev => [...prev, { role: "assistant", content: responseContent }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "assistant", content: "Sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Portfolio
          </Button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            Portfolio AI Assistant
          </h1>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden border-primary/20 shadow-lg bg-card/50 backdrop-blur-sm">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <Avatar className="h-8 w-8 border border-primary/50">
                      <AvatarImage src="/bot-avatar.png" />
                      <AvatarFallback className="bg-primary/10 text-primary"><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground ml-auto"
                        : "bg-muted/50 border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                  {msg.role === "user" && (
                     <Avatar className="h-8 w-8 border border-border">
                     <AvatarFallback className="bg-muted text-muted-foreground"><User className="h-4 w-4" /></AvatarFallback>
                   </Avatar>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 justify-start">
                   <Avatar className="h-8 w-8 border border-primary/50">
                      <AvatarFallback className="bg-primary/10 text-primary"><Bot className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="bg-muted/50 border border-border rounded-lg p-3 flex items-center">
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t border-border bg-background/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about my projects, skills..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
