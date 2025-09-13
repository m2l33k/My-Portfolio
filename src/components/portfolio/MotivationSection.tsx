import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Target, Lightbulb, Shield, Globe, Users, Zap, BookOpen } from "lucide-react";

const MotivationSection = () => {
  const motivations = [
    {
      icon: Shield,
      title: "Protecting Digital Lives",
      description: "Every day, millions of people rely on digital systems for their personal and professional lives. I'm motivated by the opportunity to protect these systems and the people who depend on them from cyber threats."
    },
    {
      icon: Lightbulb,
      title: "Solving Complex Puzzles",
      description: "Cybersecurity is like solving an ever-evolving puzzle. Each new vulnerability, attack vector, or security challenge presents a unique problem that requires creative thinking and technical expertise to solve."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Cyber threats know no borders. Working in cybersecurity means contributing to global digital safety and helping build a more secure internet for everyone, regardless of location or background."
    },
    {
      icon: Users,
      title: "Community & Mentorship",
      description: "The cybersecurity community is incredibly collaborative. I'm passionate about sharing knowledge, mentoring newcomers, and building stronger security teams through education and collaboration."
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Continuous Learning",
      description: "Technology evolves rapidly, and so do threats. I'm committed to staying current with the latest security trends, tools, and techniques through ongoing education and hands-on practice."
    },
    {
      icon: Heart,
      title: "Ethical Foundation",
      description: "Using my skills responsibly and ethically is paramount. I believe in defensive security, responsible disclosure, and using hacking skills only for protective purposes."
    },
    {
      icon: Zap,
      title: "Innovation & Automation",
      description: "I'm driven to find new ways to automate security processes, develop innovative tools, and improve efficiency in security operations to stay ahead of evolving threats."
    },
    {
      icon: BookOpen,
      title: "Knowledge Sharing",
      description: "Security is strengthened when knowledge is shared. I'm passionate about documenting findings, teaching others, and contributing to the collective cybersecurity knowledge base."
    }
  ];

  const personalStory = {
    title: "My Journey Into Cybersecurity",
    content: `My fascination with cybersecurity began during my computer science studies when I first learned about buffer overflow attacks. The idea that a simple programming mistake could lead to system compromise was both terrifying and fascinating.

This curiosity led me to participate in my first Capture The Flag (CTF) competition, where I experienced the thrill of ethical hacking and the satisfaction of finding and fixing vulnerabilities. The collaborative nature of the cybersecurity community, where people freely shared knowledge and helped each other grow, convinced me this was the field where I belonged.

Today, every project I work on and every vulnerability I discover reinforces my belief that cybersecurity is not just a career—it's a calling to protect and serve the digital world we all depend on.`
  };

  return (
    <section id="motivation" className="py-24 bg-surface-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Heart className="h-6 w-6" />
            <span className="text-sm uppercase tracking-wide">What Drives Me</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Motivation & Values</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The passion and principles that guide my cybersecurity journey
          </p>
        </div>

        {/* Personal Story */}
        <Card className="mb-16 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{personalStory.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg prose-invert max-w-none">
              {personalStory.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What Motivates Me */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Motivates Me</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {motivations.map((motivation, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <motivation.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {motivation.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {motivation.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Core Values</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {value.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quote */}
        <Card className="mt-16 bg-gradient-dark border-border text-center">
          <CardContent className="p-8">
            <blockquote className="text-xl italic text-foreground mb-4">
              "Security is not a product, but a process. It's not about perfection, but about continuous improvement and adaptation to new challenges."
            </blockquote>
            <cite className="text-primary font-semibold">- My Personal Philosophy</cite>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MotivationSection;