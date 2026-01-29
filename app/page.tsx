"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Code2, Database, Layers, ExternalLink, GraduationCap, Terminal, School, ChefHat, GitBranch, Wind, Container, Workflow } from "lucide-react";

export default function Home() {

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 overflow-x-hidden selection:bg-[#E0115F] selection:text-white font-mono">

      {/* Scroll Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#E0115F] origin-left z-50" style={{ scaleX }} />

      {/* Server Status Badge */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-2 bg-[#050505]/80 backdrop-blur border border-slate-800 px-4 py-2 rounded-full text-xs font-mono text-slate-500">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span>SELF_HOSTED</span>
      </div>

      {/* HERO SECTION */}
      <section className="min-h-[80vh] flex flex-col justify-center items-center relative px-6 md:h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 2 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="relative z-10 text-center"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="h-1 bg-[#E0115F] mb-6 mx-auto"
          />
          {/* Glitch Text */}
          <div className="glitch-wrapper mb-4">
            <h1 className="glitch text-3xl md:text-6xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600 mix-blend-exclusion" data-text="HUGO_OUWERKERK">
              HUGO_OUWERKERK
            </h1>
          </div>
          <p className="text-[#E0115F] text-xl md:text-2xl font-bold tracking-widest uppercase mb-8">
            Software Developer
          </p>
          <div className="flex justify-center gap-4 text-sm text-slate-500">
            <span>Based in Uelsen, Germany</span>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-slate-500 text-xs tracking-widest"
        >
          SCROLL TO EXPLORE
        </motion.div>
      </section>



      {/* EXPERIENCE TIMELINE TODO: split up in 2/3 parts (education, work coding, work other)*/}
      <section className="relative z-10 bg-[#050505] py-10 md:py-32 px-6">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#050505] -mt-32 pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="SYSTEM_LOGS" subtitle="Experience & Education" />

          <div className="relative border-l-2 border-slate-800 ml-2 md:ml-12 space-y-16">

            <TimelineItem
              date="Nov 2025 - Jan 2026"
              title="Coddin"
              role="Backend Developer"
              desc="Helped build the internal client and employee portals using Laravel and Filament. I also contributed to various client projects by developing backend features."
              tech={['PHP', 'Filament', 'Laravel']}
              link="https://coddin.nl"
              icon={<Terminal size={20} />}
              highlight
            />

            <TimelineItem
              date="2022 - Present"
              title="Beim Schweinswirt"
              role="Kitchen Staff & Web Developer"
              desc="Working in the kitchen as part of the cooking staff. I also built the official website and currently handle its hosting and maintenance."
              tech={['Next.js', 'Tailwind']}
              link="https://schweinswirt-uelsen.de"
              icon={<ChefHat size={20} />}
            />

            <TimelineItem
              date="2023 - Present"
              title="Saxion University"
              role="Associate Degree - Software Development"
              desc="Intensive 2-year Associate Degree focused on modern software engineering. Covered the full development lifecycle—from system design and data structures to DevOps and team-based implementation."
              tech={[]}
              link="https://sd42.nl/"
              icon={<GraduationCap size={20} />}
            />

            <TimelineItem
              date="2018 - 2023"
              title="Canisius Almelo"
              role="HAVO (Natuur & Techniek / Gezondheid)"
              tech={[]}
              link="https://canisius.nl/"
              icon={<School size={20} />}
            />

          </div>
        </div>
      </section>

      {/* ABOUT ME */}
      <section className="relative z-10 bg-[#050505] py-10 md:py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="USER_PROFILE" subtitle="About Me" />
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/3">
              <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#E0115F]">
                <img src="/me.jpg" alt="Hugo Ouwerkerk" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-2/3 space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>
                I'm Hugo, a backend developer who occasionally lets AI handle the pixels. I'm in the early stages of building Puntcode to get local businesses online. In my free time, I like to cook, lift weights, and travel to places most people don't go.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="relative z-10 bg-[#050505] py-10 md:py-32 pt-8 md:pt-12 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="KERNEL_MODULES" subtitle="Tech Stack" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            <TechCard icon={<Terminal />} name="PHP" color="text-[#777BB4]" />
            <TechCard icon={<Code2 />} name="Python" color="text-[#3776AB]" />
            <TechCard icon={<Code2 />} name="TypeScript" color="text-[#3178C6]" />
            <TechCard icon={<Layers />} name="Laravel" color="text-[#FF2D20]" />
            <TechCard icon={<Code2 />} name="Next.js" color="text-white" />
            <TechCard icon={<Wind />} name="Tailwind" color="text-[#06B6D4]" />
            <TechCard icon={<GitBranch />} name="Git" color="text-[#F05032]" />
            <TechCard icon={<Container />} name="Docker" color="text-[#2496ED]" />
            <TechCard icon={<Database />} name="SQL" color="text-[#00BCF2]" />
            <TechCard icon={<Workflow />} name="n8n" color="text-[#FF6D5A]" />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="relative z-10 bg-[#050505] py-10 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="EXECUTABLES" subtitle="Selected Projects" />

          <div className="space-y-20 md:space-y-32">

            <ProjectShowcase
              title="Beim Schweinswirt"
              desc="The official website for the restaurant. Features include the complete digital menu and a custom form for handling group events and parties."
              stack={['React', 'Vite', 'Tailwind']}
              link="https://www.schweinswirt-uelsen.de/nl"
              color="#E0115F"
              align="left"
              image="/schweinswirt.png"
              aiTier="MEDIUM"
            />

            <ProjectShowcase
              title="Puntcode"
              desc="The marketing website for my web design business. It serves as the main hub for offering custom websites to local businesses. (Pre-launch, Finalizing regulatory requirements)"
              stack={['Next.js', 'TypeScript', 'Tailwind']}
              link="#"
              color="#E0115F"
              align="right"
              image="/puntcode.png"
              linkLabel="View Website"
              maskLink={true}
              aiTier="MEDIUM"
            />

            <ProjectShowcase
              title="PuntAdmin"
              desc="An internal system for managing clients, websites, and all the money stuff. It handles everything from MRR tracking to generating German-compliant PDF invoices so I don't have to. (In development)"
              stack={['Python', 'CustomTkinter', 'FastAPI', 'SQLite']}
              link="https://github.com/HugoOuwerkerk/PuntAdmin"
              color="#E0115F"
              align="left"
              linkLabel="Internal Tool"
              maskLink={true}
              aiTier="ALL"
            />

            <ProjectShowcase
              title="PuntFlow"
              desc="Automated lead discovery engine. It uses AI to scout Google Maps for businesses with outdated websites, scores them using Gemini, and automates the entire outreach workflow."
              stack={['Next.js', 'TypeScript', 'Prisma', 'n8n', 'Gemini']}
              link="https://github.com/HugoOuwerkerk/PuntFlow"
              color="#E0115F"
              align="right"
              image="/puntflow.png"
              linkLabel="View GitHub"
              maskLink={true}
              aiTier="ALL"
            />

            <ProjectShowcase
              title="ProjectBoard"
              desc="A minimal self-hosted project manager to organize projects, tasks, and notes involved in the development lifecycle. Built with SvelteKit and FastAPI, running in Docker. (Self-hosted at home, using it daily for my own projects)"
              stack={['SvelteKit', 'FastAPI', 'Docker', 'SQLite']}
              link="https://github.com/HugoOuwerkerk/ProjectBoard"
              color="#E0115F"
              align="left"
              linkLabel="View GitHub"
              image="/project_board.png"
              aiTier="LOW"
            />

            <ProjectShowcase
              title="Platzpionier"
              desc="A simple, low-cost reservation tool that provides restaurants with an embeddable booking widget for their website. (Shelved, Regulatory liability was too high for a solo operation)"
              stack={['Next.js', 'TypeScript', 'Supabase', 'Tailwind']}
              link="https://github.com/HugoOuwerkerk/Platzpionier"
              color="#E0115F"
              align="right"
              image="/platzpionier.png"
              linkLabel="View GitHub"
              maskLink={true}
              aiTier="ALL"
            />



          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-10 md:py-32 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">
          <span className="text-[#E0115F] mr-2">&gt;</span>
          Get In Touch
          <span className="text-[#E0115F] animate-pulse">_</span>
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Based in Uelsen, Germany. 0% cloud. 100% self-hosted.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Contact Group */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <a href="mailto:hah.ouwerkerk@outlook.com" className="flex items-center gap-2 justify-center text-white hover:text-[#E0115F] transition-all duration-300 ease-in-out group">
              <span className="font-mono">hah.ouwerkerk@outlook.com</span>
            </a>
            <span className="hidden md:inline text-[#E0115F]">///</span>
            <a href="tel:+310621232450" className="flex items-center gap-2 justify-center text-white hover:text-[#E0115F] transition-all duration-300 ease-in-out group">
              <span className="font-mono">+31 06 21 23 24 50</span>
            </a>
          </div>

          <span className="hidden md:inline text-[#E0115F]">///</span>

          {/* Social Group (Side by Side on Mobile) */}
          <div className="flex items-center gap-6">
            <a href="https://github.com/HugoOuwerkerk" target="_blank" className="flex items-center gap-2 justify-center text-white hover:text-[#E0115F] transition-all duration-300 ease-in-out group">
              <span className="font-mono">GitHub</span>
            </a>
            <span className="hidden md:inline text-[#E0115F]">///</span>
            <a href="https://www.linkedin.com/in/hugo-ouwerkerk-461125295/" target="_blank" className="flex items-center gap-2 justify-center text-white hover:text-[#E0115F] transition-all duration-300 ease-in-out group">
              <span className="font-mono">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>

    </main >
  );
}

function SectionTitle({ title, subtitle }: any) {
  return (
    <div className="mb-10 md:mb-16">
      <div className="text-4xl md:text-5xl font-bold text-white">{subtitle}</div>
    </div>
  )
}

interface TimelineItemProps {
  date: string;
  title: string;
  role: string;
  desc?: string;
  tech: string[];
  icon: React.ReactNode;
  highlight?: boolean;
  link?: string;
}

function TimelineItem({ date, title, role, desc, tech, icon, highlight, link }: TimelineItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative pl-8 md:pl-12"
    >
      {/* Icon on line */}
      <div className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full border-4 border-[#050505] flex items-center justify-center transition-colors ${highlight ? 'bg-[#E0115F] text-white' : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'}`}>
        {icon}
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <span className="font-mono text-[#E0115F] text-sm pt-1">{date}</span>
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            {link ? (
              <a href={link} target="_blank" className="hover:text-[#E0115F] transition-all duration-300 ease-in-out flex items-center gap-2">
                {title}
                <ExternalLink size={18} className="opacity-50 hover:opacity-100 transition-opacity" />
              </a>
            ) : (
              title
            )}
            {highlight && <span className="text-[10px] bg-[#E0115F] text-white px-2 py-0.5 rounded-full">INTERN</span>}
          </h3>
          <div className="text-slate-400 font-mono text-sm mb-4">{role}</div>
        </div>
      </div >

      {desc && <p className="text-slate-400 max-w-2xl mb-4 leading-relaxed">{desc}</p>
      }

      {
        tech && tech.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tech.map((t: string) => (
              <span key={t} className="px-2 py-1 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded font-mono">
                {t}
              </span>
            ))}
          </div>
        )
      }
    </motion.div >
  )
}

interface TechCardProps {
  icon: React.ReactNode;
  name: string;
  color: string;
}

function TechCard({ icon, name, color }: TechCardProps) {
  return (
    <div
      className="bg-slate-900/50 border border-slate-800 p-4 md:p-6 flex items-center gap-4 transition-colors group"
    >
      <div className={`${color}`}>{icon}</div>
      <div>
        <div className="font-bold text-white">{name}</div>
      </div>
    </div>
  )
}

interface ProjectShowcaseProps {
  title: string;
  desc: string;
  stack: string[];
  link: string;
  color: string;
  align: 'left' | 'right';
  image?: string;
  linkLabel?: string;
  maskLink?: boolean;
  aiTier?: 'NONE' | 'LOW' | 'MEDIUM' | 'ALL';
}

function ProjectShowcase({ title, desc, stack, link, color, align, image, linkLabel = "View Deployment", maskLink = false, aiTier }: ProjectShowcaseProps) {

  const AI_TIERS: any = {
    NONE: "Hand-crafted with hot chocolate",
    LOW: "Hand-crafted with a sprinkle of AI",
    MEDIUM: "50% Human, 50% Hallucination",
    ALL: "Prompt-engineered to perfection"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-12 items-center w-full`}
    >
      {/* Image Side */}
      <div className="w-full md:w-[60%] group relative">

        {/* Image */}
        <div className="aspect-[16/9] overflow-hidden rounded-xl">
          {image ? (
            <img src={image} alt={title} className="w-full h-full object-cover object-top" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-slate-700">NO_PREVIEW_AVAILABLE</div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="w-full md:w-[40%] space-y-8">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h3>

          {aiTier && (
            <div className="font-mono text-[10px] md:text-xs text-[#E0115F]/80 mb-2">
              {AI_TIERS[aiTier]}
            </div>
          )}

          <div className={`h-1 w-20 bg-[${color}]`} />
        </div>

        <p className="text-slate-400 leading-relaxed text-lg">
          {desc}
        </p>

        <div className="flex flex-wrap gap-3">
          {stack.map((t: string) => (
            <span key={t} className="font-mono text-sm text-slate-500">{t}</span>
          ))}
        </div>

        {!maskLink && (
          <a href={link} target="_blank" className="inline-flex items-center gap-2 text-white hover:text-[#E0115F] transition-colors font-bold group">
            {linkLabel} <ExternalLink size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  )
}
