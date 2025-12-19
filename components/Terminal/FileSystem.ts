export type FileSystemItem = {
    type: 'file' | 'folder';
    content?: string; // Text content for 'cat'
    meta?: {
        type?: 'project' | 'about' | 'stack' | 'contact';
        image?: string;
        title?: string;
        subtitle?: string;
        stack?: string[];
        link?: string;
        description?: string;
        details?: Record<string, string | string[]>;
        timeline?: Array<{ date: string; title: string; role: string; desc?: string; badge?: string }>;
    };
    children?: Record<string, FileSystemItem>;
};

export const fileSystem: Record<string, FileSystemItem> = {
    'about.txt': {
        type: 'file',
        content: `
IDENTITY: Hugo.dev
ROLE: Software Developer
LOCATION: Halle, Germany
STATUS: Student @ Saxion

> Experienced in building production-grade web applications.
> Currently finishing Associate Degree at Saxion University.

EXPERIENCE LOG:
* [Nov 2025 - Jan 2026] Coddin (Intern)
  Built Filament portals & backends. PHP/Laravel.

* [2022 - Present] Beim Schweinswirt
  Kitchen Staff & built their official website.

* [2023 - Present] Saxion University
  Associate Degree - Software Development.
`,
        meta: {
            type: 'about',
            title: "Hugo Ouwerkerk",
            subtitle: "Software Developer",
            image: "/window.svg",
            details: {
                "Status": "Student @ Saxion",
                "Role": "Full Stack Developer",
                "Location": "Halle, Germany",
                "Interests": "Gym, Coding"
            },
            timeline: [
                {
                    date: "Nov 2025 - Jan 2026",
                    title: "Coddin",
                    role: "Full Stack Intern",
                    badge: "INTERN",
                    desc: "Built Filament portals and backends using PHP & Laravel."
                },
                {
                    date: "2022 - Present",
                    title: "Beim Schweinswirt",
                    role: "Kitchen Staff & Developer",
                    desc: "Kitchen Staff & built their official website."
                },
                {
                    date: "2023 - Present",
                    title: "Saxion University",
                    role: "Student",
                    desc: "Associate Degree - Software Development."
                },
                {
                    date: "2018 - 2023",
                    title: "Canisius Almelo",
                    role: "HAVO",
                    desc: "Physics, Biology, & Tech."
                }
            ]
        }
    },
    'stack.json': {
        type: 'file',
        content: `
{
  "Core": ["TypeScript", "Next.js", "React", "Java", "Python"],
  "Styling": ["Tailwind CSS", "Framer Motion", "CSS Modules"],
  "Backend": ["Node.js", "PHP", "Laravel", "Supabase", "PostgreSQL"],
  "DevOps": ["Docker", "Git", "Vercel"]
}
`,
        meta: {
            type: 'stack',
            title: "Kernel Modules",
            subtitle: "Tech Stack",
            details: {
                "Core": ["TypeScript", "Next.js", "React", "Java", "Python"],
                "Styling": ["Tailwind CSS", "Framer Motion", "CSS Modules"],
                "Backend": ["Node.js", "PHP", "Laravel", "Supabase", "PostgreSQL", "FastAPI"],
                "DevOps": ["Docker", "Git", "Vercel", "GitHub Actions"]
            }
        }
    },
    'contact.txt': {
        type: 'file',
        content: `
E-MAIL: hah.ouwerkerk@outlook.com
PHONE:  +31 06 21 23 24 50
GITHUB: github.com/HugoOuwerkerk
LINKEDIN: linkedin.com/in/hugo-ouwerkerk-461125295
`,
        meta: {
            type: 'contact',
            title: "Initialize Connection",
            subtitle: "Contact Channels",
            details: {
                "Email": "hah.ouwerkerk@outlook.com",
                "Phone": "+31 06 21 23 24 50",
                "GitHub": "github.com/HugoOuwerkerk",
                "LinkedIn": "linkedin.com/in/hugo-ouwerkerk-461125295"
            }
        }
    },
    'projects': {
        type: 'folder',
        children: {
            'platzpionier.md': {
                type: 'file',
                content: `
TITLE: Platzpionier
TYPE: SaaS Platform
STACK: Next.js, Supabase, Tailwind

DESCRIPTION:
A simple, low-cost reservation SaaS for restaurants. 
streamlined booking management, CRM, and real-time availability sync. Built for efficiency.
`,
                meta: {
                    type: 'project',
                    title: "Platzpionier",
                    subtitle: "SaaS Reservation Platform",
                    description: "A simple, low-cost reservation SaaS for restaurants. streamlined booking management, CRM, and real-time availability sync. Built for efficiency.",
                    image: "/platzpionier_final.png",
                    stack: ["Next.js", "Supabase", "Tailwind", "TypeScript"],
                    link: "https://app.platzpionier.com", // Keeping live link as user didn't explicitly safeguard this one like the others? Wait, "same for puntcode". I'll keep this one as it WAS live.
                    details: {
                        "Role": "Solo Developer",
                        "Year": "2025",
                        "Impact": "Automated Booking Flows"
                    }
                }
            },
            'puntcode.md': {
                type: 'file',
                content: `
TITLE: Puntcode
TYPE: Web Design Services
STACK: Next.js, React, Tailwind, Framer Motion

DESCRIPTION:
Clean, direct web design services for local businesses.
High-performance websites that sell.
`,
                meta: {
                    type: 'project',
                    title: "Puntcode",
                    subtitle: "Web Design Services",
                    image: "/puntcode.png",
                    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Framer Motion"],
                    // No link
                    details: {
                        "Role": "Solo Developer",
                        "Year": "2025",
                        "Focus": "Local Business",
                    }
                }
            },
            'schweinswirt.md': {
                type: 'file',
                content: `
TITLE: Beim Schweinswirt
TYPE: Official Restaurant Website
STACK: Next.js, React, Tailwind

DESCRIPTION:
The digital face of the restaurant. 
Serves 1000+ monthly visitors.
`,
                meta: {
                    type: 'project',
                    title: "Beim Schweinswirt",
                    subtitle: "Restaurant Website",
                    image: "/schweinswirt.png",
                    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
                    link: "https://www.schweinswirt-uelsen.de",
                    details: {
                        "Role": "Solo Developer",
                        "Year": "2025",
                        "Traffic": "1k+ Users/Month"
                    }
                }
            },

        },
    },
};
