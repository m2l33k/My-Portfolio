import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Shield, Server, Code, Bug } from 'lucide-react';

interface SkillsMatrixModalProps {
  onClose: () => void;
}

const roles = [
  {
    name: "Foundational",
    icon: Code,
    skills: [
      { subject: 'Networking', A: 70, fullMark: 100 },
      { subject: 'OS Concepts', A: 75, fullMark: 100 },
      { subject: 'Scripting', A: 75, fullMark: 100 },
      { subject: 'Databases', A: 70, fullMark: 100 },
      { subject: 'Web Basics', A: 85, fullMark: 100 },
      { subject: 'Security Principles', A: 95, fullMark: 100 },
    ],
  },
  {
    name: "Frontend",
    icon: Code,
    skills: [
      { subject: 'React', A: 70, fullMark: 100 },
      { subject: 'Angular', A: 75, fullMark: 100 },
      { subject: 'Vue.js', A: 40, fullMark: 100 },
      { subject: 'TypeScript', A: 70, fullMark: 100 },
      { subject: 'Symfony', A: 60, fullMark: 100 },
    ],
  },
  {
    name: "Backend",
    icon: Server,
    skills: [
      { subject: 'Node.js', A: 80, fullMark: 100 },
      { subject: 'Spring Boot', A: 75, fullMark: 100 },
      { subject: 'Python (Django/Flask)', A: 80, fullMark: 100 },
      { subject: 'Databases (SQL/NoSQL)', A: 88, fullMark: 100 },
      { subject: 'API Design', A: 90, fullMark: 100 },
      { subject: 'Docker', A: 70, fullMark: 100 },
    ],
  },
  {
    name: "Security Analyst",
    icon: Shield,
    skills: [
        { subject: 'Threat Intel', A: 50, fullMark: 100 },
        { subject: 'SIEM', A: 40, fullMark: 100 },
        { subject: 'Incident Response', A: 25, fullMark: 100 },
        { subject: 'Forensics', A: 30, fullMark: 100 },
        { subject: 'Log Analysis', A: 40, fullMark: 100 },
        { subject: 'Malware Analysis', A: 10, fullMark: 100 },
    ],
  },
  {
    name: "Penetration Tester",
    icon: Bug,
    skills: [
      { subject: 'Penetration Testing', A: 70, fullMark: 100 },
      { subject: 'Red Teaming', A: 65, fullMark: 100 },
      { subject: 'Exploitation', A: 60, fullMark: 100 },
      { subject: 'Enumeration', A: 50, fullMark: 100 },
      { subject: 'Privilege Escalation', A: 40, fullMark: 100 },
      { subject: 'Vulnerability Analysis', A: 30, fullMark: 100 },
    ],
  },
  {
    name: "Security Engineer",
    icon: Server,
    skills: [
        { subject: 'Network Security', A: 70, fullMark: 100 },
        { subject: 'Cloud Security', A: 60, fullMark: 100 },
        { subject: 'App Security', A: 65, fullMark: 100 },
        { subject: 'Cryptography', A: 60, fullMark: 100 },
        { subject: 'IAM', A: 60, fullMark: 100 },
        { subject: 'DevSecOps', A: 60, fullMark: 100 },
    ],
  },
];

const SkillsMatrixModal: React.FC<SkillsMatrixModalProps> = ({ onClose }) => {
  const [selectedRole, setSelectedRole] = useState(roles[2]); // Default to Penetration Tester

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-6xl h-[90vh] flex flex-col relative">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl text-primary">Skills Matrix</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="absolute top-4 right-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col md:flex-row gap-6 mt-6">
          {/* Left Panel: Role Selector */}
          <div className="w-full md:w-1/4 space-y-2">
            {roles.map((role) => (
              <Button
                key={role.name}
                variant={selectedRole.name === role.name ? "default" : "outline"}
                className="w-full justify-start gap-2"
                onClick={() => setSelectedRole(role)}
              >
                <role.icon className="h-5 w-5" />
                {role.name}
              </Button>
            ))}
          </div>

          {/* Right Panel: Radar Chart */}
          <div className="w-full md:w-3/4 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={selectedRole.skills}>
                <PolarGrid stroke="hsl(var(--muted-foreground) / 0.2)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'hsl(var(--foreground))', fontSize: 14 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name={selectedRole.name} dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.4)" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillsMatrixModal;
