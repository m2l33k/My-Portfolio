import {
  onlineCourses as onlineCoursesEn,
  education as educationEn,
  projects as projectsEn,
  internships as internshipsEn,
  certifications as certificationsEn,
} from "./portfolio";

const onlineCourseNameAr: Record<string, string> = {
  "CyberSecurity 101 ": "أساسيات الأمن السيبراني 101",
  "Global Education Program Focused on AI": "برنامج تعليمي عالمي يركز على الذكاء الاصطناعي",
};

const educationAr: Record<
  string,
  {
    degree?: string;
    institution?: string;
    location?: string;
    period?: string;
    description?: string;
    coursework?: string[];
    achievements?: string[];
    status?: string;
  }
> = {
  "B.S. Software Engineering": {
    degree: "إجازة في هندسة البرمجيات",
    institution: "المدرسة العليا الخاصة للهندسة والتكنولوجيا (ESPRIT)",
    location: "أريانة، تونس",
    period: "2023 - الآن",
    description: "تكوين شامل في هندسة البرمجيات مع تركيز على الأمن السيبراني والذكاء الاصطناعي وتقنيات البلوكشين.",
    coursework: ["هندسة البرمجيات", "الأمن السيبراني", "الذكاء الاصطناعي وتعلم الآلة", "تقنيات البلوكشين", "DevSecOps"],
    achievements: ["عدة تدريبات في اختبار الاختراق", "مشاركة فعالة في مشاريع IEEE"],
    status: "قيد الدراسة",
  },
  "Preparatory Studies for Engineering": {
    degree: "دراسات تحضيرية للهندسة",
    institution: "كلية العلوم بالمنستير",
    location: "المنستير، تونس",
    period: "2020 - 2023",
    description: "دراسات هندسية أساسية مهدت للتخصص المتقدم في علوم الحاسوب والأمن السيبراني.",
    coursework: ["الرياضيات", "الفيزياء", "أساسيات الإعلامية", "مبادئ الهندسة", "حل المشكلات"],
    achievements: ["قاعدة قوية في مواد STEM"],
    status: "متخرج",
  },
};

const projectAr: Record<
  string,
  {
    title?: string;
    description?: string;
    highlights?: string[];
  }
> = {
  "Cognicare": {
    title: "كوجني كير",
    description: "منصة صحة رقمية تربط بين التقييم السريري للتطور والعلاج المنزلي باستخدام ذكاء اصطناعي متعدد الوسائط.",
    highlights: ["كشف اضطرابات التطور بالذكاء الاصطناعي", "دمج علاج تفاعلي مُلعب", "متابعة التقدم لحظيًا"],
  },
  "ZenFlow Sanctuary": {
    title: "زين فلو سانكشوري",
    description: "تطبيق ويب حديث لتحسين التركيز والإنتاجية عبر مزج الأصوات المحيطة وتقنية البومودورو.",
    highlights: ["مُزج أصوات متقدم", "مؤقت بومودورو قابل للتخصيص", "حفظ المشاهد وواجهة زجاجية"],
  },
  "Code Arena AI: Multi-Agent Coding Tournament": {
    title: "كود أرينا AI: بطولة ترميز متعددة الوكلاء",
    description: "نظام متعدد الوكلاء تتنافس فيه نماذج الذكاء الاصطناعي على حل مسائل خوارزمية مع واجهة لحظية.",
    highlights: ["نظام متعدد الوكلاء", "واجهة منافسة لحظية", "دمج الإنسان في الحلقة"],
  },
  "Decentralized Swarm Logistics Simulation": {
    title: "محاكاة لوجستية سربية لامركزية",
    description: "محاكاة Python لأسطول توصيل ذاتي لامركزي باستخدام ذكاء السرب وبلوكشين PoA ونموذج لغوي محلي.",
    highlights: ["نموذج ذكاء بثلاث طبقات", "بروتوكول مزايدة لامركزي", "بلوكشين موفر للطاقة"],
  },
  "Offensive Message Filter System": {
    title: "نظام فلترة الرسائل المسيئة",
    description: "نظام ذكي لاكتشاف الرسائل المسيئة في تطبيقات الدردشة باستخدام تعلم الآلة.",
    highlights: ["فلترة لحظية", "تصنيف بالذكاء الاصطناعي", "تكامل API"],
  },
  "Cyber Sentinel - Advanced Security Analysis Tool": {
    title: "سايبر سنتينل - منصة تحليل أمني متقدمة",
    description: "منصة تحليل أمني تجمع فحص الكود والاستطلاع الشبكي وتقييم الثغرات المدعوم بالذكاء الاصطناعي.",
    highlights: ["تقييم ثغرات بالذكاء الاصطناعي", "فحص كود آلي", "استطلاع شبكي وفَزّينغ"],
  },
  "ERP SYSTEM FOR ISO 9001 PROCESS AUTOMATION": {
    title: "نظام ERP لأتمتة عمليات ISO 9001",
    description: "دمج نظام ERP لأتمتة الامتثال لمعيار ISO 9001 مع تقليل العمل اليدوي وتحسين إدارة الجودة عبر تقارير لحظية.",
    highlights: ["تقليل العمل اليدوي بنسبة 60%", "تقارير امتثال لحظية", "أتمتة إدارة الجودة"],
  },
  "AI-DRIVEN CYBERSECURITY INCIDENT RESPONSE PLATFORM": {
    title: "منصة الاستجابة للحوادث السيبرانية المدعومة بالذكاء الاصطناعي",
    description: "منصة تعتمد على الذكاء الاصطناعي وتعلم الآلة لتحليل التهديدات آليًا وتسريع الاستجابة للحوادث.",
    highlights: ["استجابة أسرع للحوادث بنسبة 35%", "تحليل تهديدات آلي", "كشف قائم على تعلم الآلة"],
  },
  "TechPioneers": {
    title: "تيك بايونيرز",
    description: "منصة تعليم إلكتروني تركز على تقديم مساقات حديثة في هندسة البرمجيات وتجارب تعلم تفاعلية.",
    highlights: ["منصة تعليم إلكتروني", "تركيز على هندسة البرمجيات الحديثة"],
  },
  "BASIC NETWORK SNIFFER": {
    title: "ملتقط شبكات أساسي",
    description: "مشروع أولي لمراقبة حركة الشبكة واكتشاف الأنشطة المشبوهة في سياق الأمن السيبراني.",
    highlights: ["مراقبة حركة الشبكة", "اكتشاف الأنشطة المشبوهة"],
  },
  "Phishing Awareness Training": {
    title: "تدريب التوعية بالتصيد الاحتيالي",
    description: "برنامج تدريبي لرفع الوعي ومنع هجمات التصيد الاحتيالي عبر جلسات تفاعلية.",
    highlights: ["جلسات تدريب تفاعلية", "الوقاية من هجمات التصيد"],
  },
  "NextJEEL": {
    title: "نكست جيل",
    description: "مشروع ويب لبناء منصة حديثة ومتجاوبة للتعلم التفاعلي.",
    highlights: ["منصة حديثة ومتجاوبة", "تركيز على التعلم التفاعلي"],
  },
  "Luducatio - Robot Ã©ducatif pour l'apprentissage des Ã©checs": {
    title: "لودوكاتيو - روبوت تعليمي لتعلم الشطرنج",
    description: "مشروع تعليمي يدمج منصة روبوتية لدعم تعلم الشطرنج وتنمية المهارات.",
    highlights: ["دمج منصة روبوتية", "تطبيق لتعلم الشطرنج"],
  },
};
const internshipArByRole: Record<
  string,
  {
    role?: string;
    period?: string;
    location?: string;
    description?: string;
  }
> = {
  "FREELANCE SECURITY & ARCHITECTURE CONSULTANT": {
    role: "مستشار مستقل في الأمن والبنية التحتية",
    period: "فبراير 2026 - الآن",
    location: "عن بُعد",
    description: "تقييم مخاطر الأمن، وتصميم بنى شبكية وسحابية آمنة، وتقديم أفضل الممارسات لتعزيز مرونة البنية التحتية، ودعم تنفيذ حلول قابلة للتوسع وعالية التوافر.",
  },
  "CLOUD CORE NETWORK INTERN": {
    role: "متدرب في شبكة النواة السحابية",
    period: "أبريل 2025 - الآن",
    location: "تونس",
    description: "الانضمام إلى خط أنابيب R&D العالمي لـ Huawei مع المساهمة في مسارَي عمل نشطَين في هندسة الذكاء الاصطناعي خلال الشهر الأول. إتقان المنظومة السحابية الأصيلة المملوكة خلال أسبوعين، مع تسليم المهام باستقلالية قبل الجدول الزمني المحدد.",
  },
  "PROFESSIONAL INSTRUCTOR AI": {
    role: "مدرّب محترف في الذكاء الاصطناعي",
    period: "يناير 2026 - الآن",
    location: "تونس",
    description: "تقديم تدريبات تطبيقية في الذكاء الاصطناعي والـ LLM وأنظمة الأتمتة الأمنية مع الإرشاد في مشاريع واقعية.",
  },
  "JUNIOR CAREER CENTER ASSISTANT - PROFESSIONAL ENGAGEMENT (BENEVOLAT)": {
    role: "مساعد مهني مبتدئ بمركز التوظيف (تطوع)",
    period: "يناير 2024 - ديسمبر 2025",
    location: "تونس",
    description: "المساهمة في تنظيم فعاليات مهنية مثل المعارض والورشات وجلسات التوجيه.",
  },
  "INTERN IN AI-POWERED WEB APPLICATION PENTESTING": {
    role: "متدرب في اختبار اختراق تطبيقات الويب المدعوم بالذكاء الاصطناعي",
    period: "يونيو 2025 - أغسطس 2025",
    location: "باريس / عن بُعد",
    description: "تطوير وكيل ذكي لأتمتة تقييم أمن تطبيقات الويب وتحسين دقة اكتشاف الثغرات وتقليل الجهد اليدوي.",
  },
  "BLOCKCHAIN & AI RESEARCH INTERN – SMART GRID SECURITY": {
    role: "متدرب بحث في البلوكشين والذكاء الاصطناعي لأمن الشبكات الذكية",
    period: "يوليو 2025 - سبتمبر 2025",
    location: "تونس، تونس",
    description: "تطوير حل بلوكشين لأمن الشبكات الذكية مع تحليل الأداء والموثوقية وزمن الاستجابة.",
  },
  "PENTESTING WEB APPLICATION INTERN": {
    role: "متدرب اختبار اختراق تطبيقات ويب",
    period: "يونيو 2024 - سبتمبر 2024",
    location: "تونس، تونس",
    description: "تحسين اختبار الاختراق باستخدام OWASP ZAP عبر الأتمتة وسكربتات مخصصة لتسريع تقييم الثغرات.",
  },
  "PENTESTING WIFI/BLUETOOTH INTERN": {
    role: "متدرب اختبار اختراق WiFi/Bluetooth",
    period: "يونيو 2024 - أغسطس 2024",
    location: "تونس، تونس",
    description: "محاكاة هجمات على الشبكات اللاسلكية وتحديد الثغرات وتطبيق إجراءات الحماية لتقليل سطح الهجوم.",
  },
};
const certNameAr: Record<string, string> = {
  "Fundamentals of Deep Learning": "أساسيات التعلم العميق",
  "Evaluation and Light Customization of Large Language Models": "تقييم وتخصيص خفيف للنماذج اللغوية الكبيرة",
  "Building RAG Agents with LLMs": "بناء وكلاء RAG باستخدام النماذج اللغوية الكبيرة",
  "Getting Started with AI on Jetson Nano": "البدء مع الذكاء الاصطناعي على Jetson Nano",
  "AppSec (CAP)": "أمن التطبيقات (CAP)",
  "Scrum Foundation": "أساسيات سكرم",
  "Hashgraph Developer": "مطوّر Hashgraph",
  "Oracle AI Vector Search Certified Professional": "محترف معتمد في البحث المتجهي بالذكاء الاصطناعي من Oracle",
  "Cisco Cybersecurity": "الأمن السيبراني من Cisco",
  "Github Foundation": "أساسيات GitHub",
  "TryHackMe Pre Security": "المرحلة التمهيدية للأمن - TryHackMe",
  "IBM Data Visualization": "تصور البيانات من IBM",
  "DevSecOps Learning": "التعلم في DevSecOps",
  "Python Essentials 1": "أساسيات Python 1",
  "AI for Anomaly Detection": "الذكاء الاصطناعي لكشف الشذوذ",
  "Generative AI with Diffusion Models": "الذكاء الاصطناعي التوليدي باستخدام نماذج الانتشار",
  "AI for Predictive Maintenance": "الذكاء الاصطناعي للصيانة التنبؤية",
  "Ethical Hacker": "الهاكر الأخلاقي",
  "AWS Training Badge": "شارة تدريب AWS",
  "Networking Basics": "أساسيات الشبكات",
  "Natural Language Processing": "معالجة اللغة الطبيعية",
  "Junior Cybersecurity Analyst": "محلل أمن سيبراني مبتدئ",
  "Lifelong Learning 2025": "التعلم مدى الحياة 2025",
};

const certDescriptionAr: Record<string, string> = {
  "Fundamentals of Deep Learning": "أساسيات التعلم العميق وتطبيقاته العملية باستخدام Python.",
  "Evaluation and Light Customization of Large Language Models": "تقييم النماذج اللغوية الكبيرة وتخصيصها بشكل خفيف.",
  "Building RAG Agents with LLMs": "بناء وكلاء RAG باستخدام النماذج اللغوية الكبيرة.",
  "Getting Started with AI on Jetson Nano": "مدخل إلى الذكاء الاصطناعي والتعلم العميق على Jetson Nano.",
  "AppSec (CAP)": "أساسيات أمن التطبيقات وممارسات التطوير الآمن.",
  "Scrum Foundation": "أساسيات إدارة المشاريع الرشيقة ومنهجية Scrum.",
  "Hashgraph Developer": "تطوير التطبيقات وتنفيذ الحلول على Hashgraph.",
  "Oracle AI Vector Search Certified Professional": "تنفيذ وتحسين البحث المتجهي المعتمد على الذكاء الاصطناعي.",
  "Cisco Cybersecurity": "أساسيات الأمن السيبراني وتقنيات Cisco.",
  "Github Foundation": "إدارة الإصدارات والتعاون باستخدام Git وGitHub.",
  "TryHackMe Pre Security": "مدخل إلى الأمن السيبراني وأساسيات الاختراق الأخلاقي.",
  "IBM Data Visualization": "تقنيات عرض البيانات واستخراج الرؤى في ذكاء الأعمال.",
  "DevSecOps Learning": "دمج ممارسات الأمن داخل خطوط التطوير والتشغيل DevOps.",
  "Python Essentials 1": "المفاهيم الأساسية للبرمجة بلغة Python.",
  "AI for Anomaly Detection": "استخدام نماذج الذكاء الاصطناعي لاكتشاف الشذوذ في البيانات.",
  "Generative AI with Diffusion Models": "فهم الذكاء الاصطناعي التوليدي ونماذج الانتشار.",
  "AI for Predictive Maintenance": "توظيف الذكاء الاصطناعي للتنبؤ بالأعطال وتحسين الصيانة.",
  "Ethical Hacker": "ممارسات اختبار الاختراق ومنهجيات الاختراق الأخلاقي.",
  "AWS Training Badge": "فهم أساسيات خدمات AWS والبنية السحابية.",
  "Networking Basics": "المفاهيم الأساسية لبروتوكولات وتشغيل الشبكات.",
  "Natural Language Processing": "تقنيات معالجة اللغة الطبيعية الحديثة باستخدام النماذج العميقة.",
  "Junior Cybersecurity Analyst": "عمليات الأمن السيبراني والاستجابة للحوادث للمبتدئين.",
  "Lifelong Learning 2025": "التزام قوي بالتعلم المستمر والتطوير المهني طويل المدى.",
};

export const onlineCourses = onlineCoursesEn.map((course) => ({
  ...course,
  name: onlineCourseNameAr[course.name] ?? course.name,
}));

export const education = educationEn.map((item) => {
  const tr = educationAr[item.degree];
  return {
    ...item,
    degree: tr?.degree ?? item.degree,
    institution: tr?.institution ?? item.institution,
    location: tr?.location ?? item.location,
    period: tr?.period ?? item.period,
    description: tr?.description ?? item.description,
    coursework: tr?.coursework ?? item.coursework,
    achievements: tr?.achievements ?? item.achievements,
    status: tr?.status ?? item.status,
  };
});

export const projects = projectsEn.map((item) => {
  const tr =
    projectAr[item.title] ??
    (item.title.startsWith("Luducatio - Robot")
      ? projectAr["Luducatio - Robot Ã©ducatif pour l'apprentissage des Ã©checs"]
      : undefined);
  return {
    ...item,
    title: tr?.title ?? item.title,
    description: tr?.description ?? item.description,
    highlights: tr?.highlights ?? item.highlights,
    status: item.status,
  };
});

export const internships = internshipsEn.map((item) => {
  const tr = internshipArByRole[item.role];
  return {
    ...item,
    role: tr?.role ?? item.role,
    period: tr?.period ?? item.period,
    location: tr?.location ?? item.location,
    description: tr?.description ?? item.description,
  };
});

export const certifications = certificationsEn.map((item) => ({
  ...item,
  name: certNameAr[item.name] ?? item.name,
  description: certDescriptionAr[item.name] ?? item.description,
}));







