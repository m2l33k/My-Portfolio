import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Target, Lightbulb, Shield, Globe, Users, Zap, BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useLanguage } from "@/context/LanguageContext";

const MotivationSection = () => {
  const { t } = useLanguage();

  const motivations = [
    { icon: Shield, title: t("motivation.m1.title"), description: t("motivation.m1.desc") },
    { icon: Lightbulb, title: t("motivation.m2.title"), description: t("motivation.m2.desc") },
    { icon: Globe, title: t("motivation.m3.title"), description: t("motivation.m3.desc") },
    { icon: Users, title: t("motivation.m4.title"), description: t("motivation.m4.desc") },
  ];

  const values = [
    { icon: Target, title: t("motivation.v1.title"), description: t("motivation.v1.desc") },
    { icon: Heart, title: t("motivation.v2.title"), description: t("motivation.v2.desc") },
    { icon: Zap, title: t("motivation.v3.title"), description: t("motivation.v3.desc") },
    { icon: BookOpen, title: t("motivation.v4.title"), description: t("motivation.v4.desc") },
  ];

  const storyParagraphs = [t("motivation.story.p1"), t("motivation.story.p2"), t("motivation.story.p3")];

  return (
    <section id="motivation" className="py-24 bg-surface-dark">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <Heart className="h-6 w-6" />
              <span className="text-sm uppercase tracking-wide">{t("motivation.eyebrow")}</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">{t("motivation.title")}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("motivation.subtitle")}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Card className="mb-16 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-center">{t("motivation.story.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg prose-invert max-w-none">
                {storyParagraphs.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </ScrollReveal>

        <div className="mb-16">
          <ScrollReveal delay={0.3}>
            <h3 className="text-2xl font-bold text-center mb-8">{t("motivation.section.motivates")}</h3>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {motivations.map((motivation, index) => (
              <ScrollReveal key={index} delay={0.3 + index * 0.1}>
                <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <motivation.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{motivation.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">{motivation.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <div>
          <ScrollReveal delay={0.4}>
            <h3 className="text-2xl font-bold text-center mb-8">{t("motivation.section.values")}</h3>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <ScrollReveal key={index} delay={0.4 + index * 0.1}>
                <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300 group h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{value.title}</h4>
                        <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.6}>
          <Card className="mt-16 bg-gradient-dark border-border text-center">
            <CardContent className="p-8">
              <blockquote className="text-xl italic text-foreground mb-4">{t("motivation.quote")}</blockquote>
              <cite className="text-primary font-semibold">{t("motivation.quote.author")}</cite>
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MotivationSection;
