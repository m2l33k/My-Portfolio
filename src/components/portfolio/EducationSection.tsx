import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";

const EducationSection = () => {
  const education = [
    {
      degree: "B.S. Software Engineering",
      institution: "The High Private School of Engineering and Technology (ESPRIT)",
      location: "Ariana, Tunisia",
      period: "2023 - Present",
      status: "In Progress",
      description: "Comprehensive software engineering education with focus on cybersecurity, AI, and blockchain technologies.",
      coursework: ["Software Architecture", "Cybersecurity", "AI & Machine Learning", "Blockchain Technology", "DevSecOps"],
      achievements: ["Multiple Pentesting Internships", "Active in IEEE Projects"]
    },
    {
      degree: "Preparatory Studies for Engineering",
      institution: "Faculty of Sciences Monastir",
      location: "Monastir, Tunisia",
      period: "2020 - 2023",
      status: "Graduated",
      description: "Foundational engineering studies preparing for advanced computer science and cybersecurity specialization.",
      coursework: ["Mathematics", "Physics", "Computer Science Fundamentals", "Engineering Principles", "Problem Solving"],
      achievements: ["Strong foundation in STEM subjects"]
    }
  ];

  const onlineCourses = [
    { name: "CyberSecurity 101 ", provider: "Tryhackme", year: "2025" },

  ];

  return (
    <section id="education" className="py-24 bg-surface-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <GraduationCap className="h-6 w-6" />
            <span className="text-sm uppercase tracking-wide">Academic Background</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Education</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and academic excellence in cybersecurity and computer science
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {education.map((edu, index) => (
            <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-foreground">{edu.degree}</CardTitle>
                    <p className="text-primary font-semibold">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.location}</p>
                  </div>
                  <div className="flex flex-col gap-2 md:items-end">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {edu.period}
                    </div>
                    <Badge variant="default" className="w-fit bg-primary text-primary-foreground">
                      {edu.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{edu.description}</p>
                
                <div>
                  <h4 className="font-semibold mb-3 text-foreground">Key Coursework:</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, courseIndex) => (
                      <Badge key={courseIndex} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Achievements:
                  </h4>
                  <ul className="space-y-1">
                    {edu.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Online Courses Section */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BookOpen className="h-5 w-5 text-primary" />
              Continuing Education
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {onlineCourses.map((course, index) => (
                <div key={index} className="flex items-start justify-between p-3 bg-secondary/50 rounded-lg gap-4">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{course.name}</p>
                    <p className="text-sm text-primary">{course.provider}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">{course.year}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default EducationSection;