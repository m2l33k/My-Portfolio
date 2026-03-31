import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Shield, Server, Code, Bug, X, Zap, Lock } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from '@/context/LanguageContext';

interface SkillsMatrixModalProps {
  onClose: () => void;
}

const roles = [
  {
    name: "Foundational",
    icon: Zap,
    color: "from-violet-500 to-purple-600",
    accent: "violet",
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
    color: "from-cyan-500 to-blue-600",
    accent: "cyan",
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
    color: "from-emerald-500 to-green-600",
    accent: "emerald",
    skills: [
      { subject: 'Node.js', A: 80, fullMark: 100 },
      { subject: 'Spring Boot', A: 75, fullMark: 100 },
      { subject: 'Python', A: 80, fullMark: 100 },
      { subject: 'Databases', A: 88, fullMark: 100 },
      { subject: 'API Design', A: 90, fullMark: 100 },
      { subject: 'Docker', A: 70, fullMark: 100 },
    ],
  },
  {
    name: "Security Analyst",
    icon: Shield,
    color: "from-amber-500 to-orange-600",
    accent: "amber",
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
    color: "from-red-500 to-rose-600",
    accent: "red",
    skills: [
      { subject: 'Pentesting', A: 70, fullMark: 100 },
      { subject: 'Red Teaming', A: 65, fullMark: 100 },
      { subject: 'Exploitation', A: 60, fullMark: 100 },
      { subject: 'Enumeration', A: 50, fullMark: 100 },
      { subject: 'Priv Escalation', A: 40, fullMark: 100 },
      { subject: 'Vuln Analysis', A: 30, fullMark: 100 },
    ],
  },
  {
    name: "Security Engineer",
    icon: Lock,
    color: "from-teal-500 to-emerald-600",
    accent: "teal",
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

const accentColors: Record<string, { stroke: string; fill: string; ring: string; bg: string; text: string }> = {
  violet: { stroke: "#8b5cf6", fill: "rgba(139,92,246,0.25)", ring: "ring-violet-500/30", bg: "bg-violet-500/10", text: "text-violet-400" },
  cyan: { stroke: "#06b6d4", fill: "rgba(6,182,212,0.25)", ring: "ring-cyan-500/30", bg: "bg-cyan-500/10", text: "text-cyan-400" },
  emerald: { stroke: "#10b981", fill: "rgba(16,185,129,0.25)", ring: "ring-emerald-500/30", bg: "bg-emerald-500/10", text: "text-emerald-400" },
  amber: { stroke: "#f59e0b", fill: "rgba(245,158,11,0.25)", ring: "ring-amber-500/30", bg: "bg-amber-500/10", text: "text-amber-400" },
  red: { stroke: "#ef4444", fill: "rgba(239,68,68,0.25)", ring: "ring-red-500/30", bg: "bg-red-500/10", text: "text-red-400" },
  teal: { stroke: "#14b8a6", fill: "rgba(20,184,166,0.25)", ring: "ring-teal-500/30", bg: "bg-teal-500/10", text: "text-teal-400" },
};

const SkillsMatrixModal: React.FC<SkillsMatrixModalProps> = ({ onClose }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const isMobile = useIsMobile();
  const { lang } = useLanguage();

  const selected = roles[selectedIdx];
  const colors = accentColors[selected.accent];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl border border-primary/15 bg-card shadow-2xl shadow-black/20"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${selected.color}`}>
              <selected.icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">
                {lang === "en" ? "Skills Matrix" : "Matrice de Competences"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {lang === "en" ? "Technical proficiency across domains" : "Competence technique par domaine"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row overflow-hidden" style={{ maxHeight: "calc(90vh - 73px)" }}>
          {/* Role selector sidebar */}
          <div className="md:w-56 shrink-0 border-b md:border-b-0 md:border-r border-primary/10 overflow-y-auto p-3 space-y-1.5">
            <div className="grid grid-cols-3 md:grid-cols-1 gap-1.5">
              {roles.map((role, i) => {
                const isActive = selectedIdx === i;
                const rc = accentColors[role.accent];
                const Icon = role.icon;
                return (
                  <button
                    key={role.name}
                    onClick={() => setSelectedIdx(i)}
                    className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? `${rc.bg} ${rc.text} ring-1 ${rc.ring}`
                        : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate hidden md:inline">{role.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chart + skills area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col lg:flex-row gap-6"
              >
                {/* Radar chart */}
                <div className="flex-1 min-h-[280px] md:min-h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius={isMobile ? "65%" : "75%"} data={selected.skills}>
                      <PolarGrid stroke="hsl(var(--muted-foreground) / 0.15)" strokeDasharray="3 3" />
                      <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: isMobile ? 9 : 12 }}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name={selected.name}
                        dataKey="A"
                        stroke={colors.stroke}
                        fill={colors.fill}
                        fillOpacity={0.6}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>

                {/* Skill list */}
                <div className="lg:w-56 shrink-0 space-y-2">
                  {selected.skills.map((skill, i) => (
                    <motion.div
                      key={skill.subject}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg ${colors.bg} border border-white/5`}
                    >
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: colors.stroke }} />
                      <span className="text-xs font-medium text-foreground/80">{skill.subject}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsMatrixModal;
