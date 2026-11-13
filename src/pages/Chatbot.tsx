import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, ArrowLeft, Sparkles } from "lucide-react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { useLanguage } from "@/context/LanguageContext";
import usePageTitle from "@/hooks/usePageTitle";

interface Message {
  role: "user" | "assistant" | "developer";
  content: string;
}

// ---- Markdown renderer with themed, compact styles ----
const MarkdownView = ({ content }: { content: string }) => (
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
      ul: ({ children }) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
      ol: ({ children }) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
      li: ({ children }) => <li className="leading-relaxed">{children}</li>,
      strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      h1: ({ children }) => <h1 className="text-base font-bold mb-2">{children}</h1>,
      h2: ({ children }) => <h2 className="text-sm font-bold mb-2">{children}</h2>,
      h3: ({ children }) => <h3 className="text-sm font-semibold mb-1">{children}</h3>,
      a: ({ href, children }) => (
        <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2 hover:opacity-80">
          {children}
        </a>
      ),
      code: ({ children }) => (
        <code className="bg-background/70 border border-border px-1.5 py-0.5 rounded text-xs font-mono">{children}</code>
      ),
      table: ({ children }) => (
        <div className="overflow-x-auto my-2">
          <table className="text-xs border-collapse w-full">{children}</table>
        </div>
      ),
      th: ({ children }) => <th className="border border-border px-2 py-1 bg-muted/60 text-left font-semibold">{children}</th>,
      td: ({ children }) => <td className="border border-border px-2 py-1 align-top">{children}</td>,
    }}
  >
    {content}
  </ReactMarkdown>
);

// ---- Typewriter that reveals word-by-word, then renders markdown ----
const TypedMarkdown = ({ content, onTick }: { content: string; onTick?: () => void }) => {
  const [shown, setShown] = useState("");

  useEffect(() => {
    const tokens = content.split(/(\s+)/); // keep whitespace
    let i = 0;
    setShown("");
    const id = setInterval(() => {
      i++;
      setShown(tokens.slice(0, i).join(""));
      onTick?.();
      if (i >= tokens.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return <MarkdownView content={shown} />;
};

const SUGGESTIONS = [
  "Who is Malek? 👋",
  "Show me his coolest projects 🚀",
  "What are his cybersecurity skills? 🛡️",
  "Tell me about his work experience 💼",
  "Which certifications does he have? 🏆",
];

const Chatbot = () => {
  usePageTitle("AI Chat");
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { projects, internships, certifications, education, onlineCourses } = usePortfolioData();
  const [messages, setMessages] = useState<Message[]>([{ role: "assistant", content: t("chat.greeting") }]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    const el = scrollAreaRef.current?.querySelector("[data-radix-scroll-area-viewport]");
    if (el) el.scrollTop = el.scrollHeight;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const generateResponse = async (query: string, history: Message[]) => {
    const systemContext = `
    You are Malek Hassayoun's witty AI sidekick on his portfolio site.
    Answer questions about Malek's background, skills, and projects using ONLY the data below.

    STYLE RULES (important):
    - Keep it SHORT. 2-4 sentences max, or a few quick bullet points. Never dump giant tables or walls of text.
    - Be cool, friendly, and a little funny. Light emojis are welcome (don't overdo it). 😎
    - Hit the highlights, skip the exhaustive detail. If they want more, invite them to ask a follow-up.
    - Sound human and conversational, not like a resume or a corporate bot.
    - Use light markdown (bold for names, short bullets) but keep it tidy.

    Data:
    Projects: ${JSON.stringify(projects.map((p) => ({ title: p.title, description: p.description, technologies: p.technologies, highlights: p.highlights })))}
    Internships: ${JSON.stringify(internships.map((i) => ({ company: i.company, role: i.role, period: i.period, description: i.description, technologies: i.technologies })))}
    Certifications: ${JSON.stringify(certifications.map((c) => ({ name: c.name, issuer: c.issuer, date: c.date, skills: c.skills })))}
    Education: ${JSON.stringify(education.map((e) => ({ degree: e.degree, institution: e.institution, period: e.period, description: e.description, coursework: e.coursework })))}
    Online Courses: ${JSON.stringify(onlineCourses)}

    If the user asks about something not in this data, just say you don't have that info — with a friendly shrug. 🤷
    `;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: systemContext },
            ...history.map((m) => ({ role: m.role === "assistant" ? "assistant" : ("user" as const), content: m.content })),
            { role: "user", content: query },
          ],
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error || `Request failed (${response.status})`);
      }

      const data = await response.json();

      if (!data.choices || data.choices.length === 0) {
        return "Error: No response choices returned from the AI.";
      }

      const choice = data.choices[0];

      if (choice.finish_reason === "content_filter") {
        return "I apologize, but I cannot answer that request due to content safety filters.";
      }

      return choice.message.content || "Error: The AI returned an empty response.";
    } catch (error: any) {
      return `Sorry, I hit a snag: ${error.message || "Unknown error"}. Try again in a sec. 🙏`;
    }
  };

  const sendMessage = async (text: string) => {
    const content = text.trim();
    if (!content || isLoading) return;

    const userMessage: Message = { role: "user", content };
    const history = messages;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const responseContent = await generateResponse(content, history);
      setMessages((prev) => [...prev, { role: "assistant", content: responseContent }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: t("chat.error") }]);
    } finally {
      setIsLoading(false);
    }
  };

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-4xl flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" onClick={() => navigate("/portfolio")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> {t("hero.backToPortfolio")}
          </Button>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" />
            {t("hero.chatbot")}
          </h1>
        </div>

        <Card className="flex-1 flex flex-col overflow-hidden border-primary/20 shadow-lg bg-card/50 backdrop-blur-sm">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((msg, index) => {
                const isAssistant = msg.role === "assistant";
                const isLastAssistant = isAssistant && index === messages.length - 1 && index !== 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {isAssistant && (
                      <Avatar className="h-8 w-8 border border-primary/50 shrink-0">
                        <AvatarImage src="/bot-avatar.png" />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 text-sm shadow-sm ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-muted/60 border border-border rounded-bl-sm"
                      }`}
                    >
                      {isAssistant ? (
                        isLastAssistant ? (
                          <TypedMarkdown content={msg.content} onTick={scrollToBottom} />
                        ) : (
                          <MarkdownView content={msg.content} />
                        )
                      ) : (
                        <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <Avatar className="h-8 w-8 border border-border shrink-0">
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </motion.div>
                );
              })}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 justify-start"
                >
                  <Avatar className="h-8 w-8 border border-primary/50 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted/60 border border-border rounded-2xl rounded-bl-sm p-4 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
                    <span className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" />
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>

          {/* Suggested prompt chips */}
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-1"
              >
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
                  <Sparkles className="h-3.5 w-3.5" /> Try asking:
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => sendMessage(s)}
                      className="text-xs px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary/15 hover:border-primary/50 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-4 border-t border-border bg-background/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat.input")}
                className="flex-1 rounded-full"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !input.trim()} className="rounded-full">
                <Send className="h-4 w-4" />
                <span className="sr-only">{t("chat.send")}</span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;
