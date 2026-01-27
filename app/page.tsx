"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Code2, Server, Database, Layers, ExternalLink, GraduationCap, Briefcase, Terminal, LayoutTemplate, School, ChefHat, GitBranch, Wind, Coffee } from "lucide-react";

export default function Home() {

  const AI_TIERS = {
    NONE: "Hand-crafted with hot chocolate",
    LOW: "Hand-crafted with a sprinkle of AI",
    MEDIUM: "50% Human, 50% Hallucination",
    ALL: "Prompt-engineered to perfection"
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen bg-[#050505] text-slate-200 overflow-x-hidden selection:bg-[#E0115F] selection:text-white font-mono">

      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-[#E0115F] origin-left z-50" style={{ scaleX }} />

      {/* Fixed Server Status Badge */}
      <div className="fixed bottom-6 right-6 z-50 hidden md:flex items-center gap-2 bg-[#050505]/80 backdrop-blur border border-slate-800 px-4 py-2 rounded-full text-xs font-mono text-slate-500">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span>SELF_HOSTED</span>
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(224,17,95,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(224,17,95,0.03)_1px,transparent_1px)] bg-[size:30px_30px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)] pointer-events-none -z-10" />

      {/* HERO SECTION */}
      <section className="h-screen flex flex-col justify-center items-center relative px-6">
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
          {/* Glitch Title */}
          {/* Glitch Title */}
          <div className="glitch-wrapper mb-4">
            <h1 className="glitch text-5xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-400 to-slate-600 mix-blend-exclusion" data-text="HUGO_OUWERKERK">
              HUGO_OUWERKERK
            </h1>
          </div>
          <p className="text-[#E0115F] text-xl md:text-2xl font-bold tracking-widest uppercase mb-8">
            Software Developer
          </p>
          <div className="flex justify-center gap-4 text-sm text-slate-500">
            <span>Based in Germany</span>
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



      {/* EXPERIENCE TIMELINE */}
      <section className="relative z-10 bg-[#050505] py-32 px-6">
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#050505] -mt-32 pointer-events-none" />
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="SYSTEM_LOGS" subtitle="Experience & Education" />

          <div className="relative border-l-2 border-slate-800 ml-4 md:ml-12 space-y-16">

            <TimelineItem
              date="Nov 2025 - Jan 2026"
              title="Coddin"
              role="Backend Developer"
              desc="Backend internship focused on building applications using Laravel and Filament."
              tech={['PHP', 'Filament', 'Laravel']}
              icon={<Terminal size={20} />}
              highlight
            />

            <TimelineItem
              date="2022 - Present"
              title="Beim Schweinswirt"
              role="Kitchen Staff & Web Developer"
              desc="Working in the kitchen as a cook. I also built the official website and currently handle its hosting and maintenance."
              tech={['Next.js', 'Tailwind']}
              icon={<ChefHat size={20} />}
            />

            <TimelineItem
              date="2023 - Present"
              title="Saxion University"
              role="Associate Degree - Software Development"
              desc="Intensive 2-year program. I learned how to code by building real software, starting with the basics and moving to complex team projects."
              tech={[]}
              icon={<GraduationCap size={20} />}
            />

            <TimelineItem
              date="2018 - 2023"
              title="Canisius Almelo"
              role="HAVO (Natuur & Techniek / Gezondheid)"
              tech={[]}
              icon={<School size={20} />}
            />

          </div>
        </div>
      </section>

      {/* ABOUT ME SECTION */}
      <section className="relative z-10 bg-[#050505] py-20 px-6">
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
                I'm Hugo — a backend-focused developer who occasionally lets AI handle the pixels. I build full-stack applications, run my own home-lab, and help local businesses get online through my side project Puntcode. When I'm not coding, you'll find me in the kitchen at Beim Schweinswirt.
              </p>
              <div className="pt-4 flex gap-4 font-mono text-sm text-[#E0115F]">
                <span>[ Linux Enthusiast ]</span>
                <span>[ Self-Hoster ]</span>
                <span>[ Problem Solver ]</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH STACK GRID */}
      <section className="relative z-10 bg-[#050505] py-32 pt-12">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="KERNEL_MODULES" subtitle="Tech Stack" />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <TechCard icon={<Code2 />} name="Next.js" color="text-white" />
            <TechCard icon={<Code2 />} name="TypeScript" color="text-[#3178C6]" />
            <TechCard icon={<Wind />} name="Tailwind" color="text-[#06B6D4]" />
            <TechCard icon={<Terminal />} name="PHP" color="text-[#777BB4]" />
            <TechCard icon={<Layers />} name="Laravel" color="text-[#FF2D20]" />
            <TechCard icon={<LayoutTemplate />} name="Filament" color="text-[#FA7C43]" />
            <TechCard icon={<Coffee />} name="Java" color="text-[#ED8B00]" />
            <TechCard icon={<Code2 />} name="Python" color="text-[#3776AB]" />
            <TechCard icon={<Database />} name="SQL" color="text-[#00BCF2]" />
            <TechCard icon={<GitBranch />} name="Git" color="text-[#F05032]" />
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section className="relative z-10 bg-[#050505] py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitle title="EXECUTABLES" subtitle="Selected Projects" />

          <div className="space-y-32">

            <ProjectShowcase
              title="Beim Schweinswirt"
              desc="The official website for the restaurant. Features include the complete digital menu and a custom form for handling group events and parties."
              stack={['Next.js', 'javascript', 'Tailwind']}
              link="https://www.schweinswirt-uelsen.de"
              color="#E0115F"
              align="left"
              image="/schweinswirt.png"
              aiTier="MEDIUM"
            />

            <ProjectShowcase
              title="Puntcode"
              desc="The marketing website for my web design business. It serves as the main hub for offering custom websites to local businesses. (Not yet live — waiting on tax numbers for legal pages)"
              stack={['Next.js', 'typescript', 'Tailwind']}
              link="https://puntcode.hah-ouw.dev/"
              color="#E0115F"
              align="right"
              image="/puntcode.png"
              linkLabel="View Website"
              aiTier="MEDIUM"
            />

            <ProjectShowcase
              title="PuntAdmin"
              desc="An internal system for managing clients, websites, and all the money stuff. It handles everything from MRR tracking to generating German-compliant PDF invoices so I don't have to. (Currently in active development)"
              stack={['Python', 'CustomTkinter', 'FastAPI', 'SQLite']}
              link="#"
              color="#E0115F"
              align="left"
              image="/puntadmin.png"
              linkLabel="Internal Tool"
              maskLink={true}
              aiTier="ALL"
            />

            <ProjectShowcase
              title="PuntFlow"
              desc="My personal lead discovery engine. It uses AI to scout Google Maps for businesses with outdated websites, scores them using Gemini, and automates the entire outreach workflow."
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
              title="Platzpionier"
              desc="A simple, low-cost reservation tool for restaurants with streamlined booking management. (Legacy Project - Awesome idea, but navigating German regulations is a full-time job)"
              stack={['Next.js', 'TypeScript', 'Supabase', 'Tailwind']}
              link="https://github.com/HugoOuwerkerk/Platzpionier"
              color="#E0115F"
              align="left"
              image="/platzpionier.png"
              linkLabel="View GitHub"
              maskLink={true}
              aiTier="ALL"
            />

            <ProjectShowcase
              title="ProjectBoard"
              desc="A minimal self-hosted project manager to organize projects, tasks, and notes involved in the development lifecycle. Built with SvelteKit and FastAPI, running in Docker. (Self-hosted at home — using it daily for my own projects)"
              stack={['SvelteKit', 'FastAPI', 'Docker', 'SQLite']}
              link="https://github.com/HugoOuwerkerk/ProjectBoard"
              color="#E0115F"
              align="right"
              linkLabel="View GitHub"
              image="/project_board.png"
              aiTier="LOW"
            />


          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-32 text-center">
        <h2 className="text-4xl font-bold mb-8">
          <span className="text-[#E0115F] mr-2">&gt;</span>
          Initialize Connection
          <span className="text-[#E0115F] animate-pulse">_</span>
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Based in Uelsen, Germany. 0% cloud. 100% self-hosted.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
          <a href="mailto:hah.ouwerkerk@outlook.com" className="flex items-center gap-2 justify-center text-white hover:text-[#E0115F] transition-colors group">
            <span className="font-mono group-hover:underline decoration-[#E0115F]">hah.ouwerkerk@outlook.com</span>
          </a>
          <span className="hidden md:inline text-[#E0115F]">///</span>
          <a href="tel:+310621232450" className="flex items-center gap-2 justify-center text-white hover:text-[#E0115F] transition-colors group">
            <span className="font-mono group-hover:underline decoration-[#E0115F]">+31 06 21 23 24 50</span>
          </a>
          <span className="hidden md:inline text-[#E0115F]">///</span>
          <a href="https://github.com/HugoOuwerkerk" target="_blank" className="flex items-center gap-2 justify-center text-white hover:text-[#E0115F] transition-colors group">
            <span className="font-mono group-hover:underline decoration-[#E0115F]">GitHub</span>
          </a>
          <span className="hidden md:inline text-[#E0115F]">///</span>
          <a href="https://www.linkedin.com/in/hugo-ouwerkerk-461125295/" target="_blank" className="flex items-center gap-2 justify-center text-white hover:text-[#E0115F] transition-colors group">
            <span className="font-mono group-hover:underline decoration-[#E0115F]">LinkedIn</span>
          </a>
        </div>
      </section>

    </main >
  );
}

function SectionTitle({ title, subtitle }: any) {
  return (
    <div className="mb-16">
      <div className="text-4xl md:text-5xl font-bold text-white">{subtitle}</div>
    </div>
  )
}

function TimelineItem({ date, title, role, desc, tech, icon, highlight }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="relative pl-8 md:pl-12"
    >
      {/* Dot on line */}
      <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-4 border-[#050505] ${highlight ? 'bg-[#E0115F]' : 'bg-slate-700'}`} />

      <div className="flex flex-col md:flex-row gap-4 mb-2">
        <span className="font-mono text-[#E0115F] text-sm pt-1">{date}</span>
        <div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            {title}
            {highlight && <span className="text-[10px] bg-[#E0115F] text-white px-2 py-0.5 rounded-full">INTERN</span>}
          </h3>
          <div className="text-slate-400 font-mono text-sm mb-4">{role}</div>
        </div>
      </div>

      <p className="text-slate-400 max-w-2xl mb-4 leading-relaxed">{desc}</p>

      {tech && tech.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tech.map((t: string) => (
            <span key={t} className="px-2 py-1 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded font-mono">
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  )
}

function TechCard({ icon, name, color }: any) {
  return (
    <div
      className="bg-slate-900/50 border border-slate-800 p-6 flex items-center gap-4 transition-colors group"
    >
      <div className={`${color}`}>{icon}</div>
      <div>
        <div className="font-bold text-white">{name}</div>
      </div>
    </div>
  )
}

function ProjectShowcase({ title, desc, stack, link, color, align, image, linkLabel = "View Deployment", maskLink = false, aiTier }: any) {

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
      className={`flex flex-col ${align === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center w-full`}
    >
      {/* Image Side */}
      <div className="w-full md:w-[60%] group relative">
        {/* Simple Glow Effect behind */}
        <div className={`absolute -inset-1 bg-${color} rounded-lg blur opacity-10 transition duration-500`}></div>

        {/* Image Container */}
        <div className="aspect-[16/9] overflow-hidden rounded-xl">
          {image ? (
            <img src={image} className="w-full h-full object-cover object-top" />
          ) : (
            <div className="w-full h-full flex items-center justify-center font-mono text-slate-700">NO_PREVIEW_AVAILABLE</div>
          )}
        </div>
      </div>

      {/* Content Side */}
      <div className="w-full md:w-[40%] space-y-8">
        <div>
          <h3 className="text-4xl font-bold text-white mb-2">{title}</h3>

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
