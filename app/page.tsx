"use client";

import { motion, MotionConfig, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ChefHat, Download, ExternalLink, GraduationCap, Mail, School, Terminal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EMAIL = "hah.ouwerkerk@outlook.com";
const CV_PATH = "/Hugo-Ouwerkerk-CV.pdf";
const GITHUB = "https://github.com/HugoOuwerkerk";
const LINKEDIN = "https://www.linkedin.com/in/hugo-ouwerkerk-461125295/";

const btnPrimary =
  "inline-flex items-center justify-center gap-3 min-h-14 px-10 rounded-md bg-[#E0115F] text-white text-lg font-bold transition-colors hover:bg-[#c20e52]";
const btnSecondary =
  "inline-flex items-center justify-center gap-2 min-h-14 px-8 rounded-md border border-slate-600 text-white font-bold transition-colors hover:border-[#E0115F]";
const linkQuiet =
  "inline-flex items-center min-h-11 text-slate-300 hover:text-white transition-colors underline underline-offset-4 decoration-slate-600 hover:decoration-[#E0115F]";

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

export default function Home() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-[#050505] text-slate-200 overflow-x-hidden selection:bg-[#E0115F] selection:text-white font-mono">
        {/* Scroll progress */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-[#E0115F] origin-left z-50"
          style={{ scaleX: reduceMotion ? scrollYProgress : smooth }}
        />

        {/* HERO */}
        <section className="min-h-[100dvh] flex flex-col justify-center items-center px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-center max-w-2xl"
          >
            <div className="h-1 w-24 bg-[#E0115F] mb-6 mx-auto" />
            <div className="glitch-wrapper mb-4">
              <h1
                className="glitch text-3xl md:text-6xl lg:text-8xl font-black tracking-tight text-white"
                data-text="HUGO_OUWERKERK"
              >
                HUGO_OUWERKERK
              </h1>
            </div>
            <p className="text-[#E0115F] text-xl md:text-2xl font-bold tracking-widest uppercase mb-6">
              Full-stack developer
            </p>
            <p className="text-lg text-slate-300 leading-relaxed mb-2">
              I build web apps. I run Puntcode, my own software business, and I work in a restaurant kitchen.
            </p>
            <p className="text-lg text-white font-bold leading-relaxed mb-1">Open to full-stack roles.</p>
            <p className="text-base text-slate-400 mb-10">Remote or on-site, open to relocating. Based in Uelsen, Germany.</p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-6">
              <a href={`mailto:${EMAIL}`} className={btnPrimary}>
                <Mail size={20} /> Email me
              </a>
              <a href={CV_PATH} download className={btnSecondary}>
                <Download size={18} /> Download CV
              </a>
            </div>
            <a href="#projects" className={linkQuiet}>
              See projects <ArrowDown size={16} className="ml-2" />
            </a>
          </motion.div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="px-6 py-16 md:py-28 scroll-mt-4">
          <div className="max-w-6xl mx-auto">
            <SectionTitle title="PROJECTS" subtitle="My Projects" />

            <div className="space-y-20 md:space-y-28">
              <ProjectShowcase
                title="KraftLab"
                desc="A training app for hybrid athletes. Log gym and cardio, plan your week, sync runs from Strava and connect your own AI coach. In English, German and Dutch."
                stack={["React", "Vite", "Express", "SQLite", "Capacitor", "Docker"]}
                link="https://kraftlab.app"
                align="left"
                image="/kraftlab.jpg"
                linkLabel="View website"
                aiTier="ALL"
              />

              <ProjectShowcase
                title="Landgasthof Koninghoek"
                desc="The website for the restaurant I work at. Digital menu, table reservations, events and job openings. In German, English and Dutch."
                stack={["Astro", "React", "Tailwind", "Docker"]}
                link="https://www.koninghoek.de"
                align="right"
                image="/koninghoek.jpg"
                linkLabel="View website"
                aiTier="HIGH"
              />

              <ProjectShowcase
                title="Puntcode"
                desc="My one-person software business. I'm moving from client websites to my own products, like KraftLab."
                stack={["Astro", "React", "TypeScript", "Tailwind"]}
                link="https://puntcode.de"
                align="left"
                image="/puntcode.jpg"
                linkLabel="View website"
                aiTier="MEDIUM"
              />
            </div>

            <div className="mt-24 md:mt-32">
              <h3 className="text-sm font-bold tracking-widest text-slate-400 mb-8">EARLIER PROJECTS</h3>
              <div className="grid md:grid-cols-2 gap-10">
                <ArchivedProject
                  title="ProjectBoard"
                  status="Retired. I used it daily at home."
                  desc="A small self-hosted project manager for projects, tasks and notes."
                  stack={["SvelteKit", "FastAPI", "Docker", "SQLite"]}
                  link="https://github.com/HugoOuwerkerk/ProjectBoard"
                  image="/project_board.png"
                  aiTier="LOW"
                />
                <ArchivedProject
                  title="Platzpionier"
                  status="Shelved. The regulatory liability was too high for one person."
                  desc="A low-cost reservation tool. An embeddable booking widget for restaurant websites."
                  stack={["Next.js", "TypeScript", "Supabase", "Tailwind"]}
                  image="/platzpionier.png"
                  aiTier="ALL"
                />
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="px-6 py-16 md:py-28 scroll-mt-4">
          <div className="max-w-6xl mx-auto">
            <SectionTitle title="WORK" subtitle="Experience" />

            <div className="relative border-l-2 border-slate-800 ml-2 md:ml-12 space-y-14">
              <TimelineItem
                date="May 2026 - Present"
                title="Landgasthof Koninghoek"
                role="Kitchen Staff & Web Developer"
                desc="I run the kitchen when we're short-staffed, with a trained cook watching over. I also built the restaurant's website and handle its hosting and upkeep."
                tech={["Astro", "React", "Tailwind"]}
                link="https://koninghoek.de"
                icon={<ChefHat size={20} />}
              />
              <TimelineItem
                date="Mar 2026 - May 2026"
                title="Emmedy Learning Solutions"
                role="Full Stack Developer"
                desc="Built features for a learning management system (LMS). It helps companies schedule, deliver and track employee training."
                tech={["PHP", "Symfony", "Twig", "JavaScript"]}
                link="https://emmedy.nl"
                icon={<Terminal size={20} />}
                highlight
              />
              <TimelineItem
                date="Nov 2025 - Jan 2026"
                title="Coddin"
                role="Backend Developer"
                desc="Built internal client and employee portals with Laravel and Filament. Added backend features to client projects."
                tech={["PHP", "Laravel", "Filament"]}
                link="https://coddin.nl"
                icon={<Terminal size={20} />}
                highlight
              />
              <TimelineItem
                date="2022 - Apr 2026"
                title="Beim Schweinswirt (closed)"
                role="Kitchen Staff & Web Developer"
                desc="Cooked in the kitchen. Built the restaurant's website and handled its hosting and upkeep."
                tech={["React", "Vite", "Tailwind"]}
                icon={<ChefHat size={20} />}
              />
            </div>

            <h3 className="text-sm font-bold tracking-widest text-slate-400 mt-16 mb-8">EDUCATION</h3>
            <div className="relative border-l-2 border-slate-800 ml-2 md:ml-12 space-y-14">
              <TimelineItem
                date="2023 - Present"
                title="Saxion University"
                role="Associate Degree, Software Development"
                desc="Two-year degree in software engineering. System design, data structures, DevOps and team projects."
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

        {/* ABOUT + SKILLS */}
        <section id="about" className="px-6 py-16 md:py-28 scroll-mt-4">
          <div className="max-w-6xl mx-auto">
            <SectionTitle title="ABOUT" subtitle="About Me" />
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/3">
                <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-[#E0115F]">
                  <Image src="/me.jpg" alt="Hugo Ouwerkerk" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
              </div>
              <div className="w-full md:w-2/3 space-y-8">
                <p className="text-lg text-slate-300 leading-relaxed max-w-prose">
                  I&apos;m Hugo, a full-stack developer who occasionally lets AI handle the pixels. In my free time I cook and{" "}
                  <Link
                    href="/personal"
                    className="text-[#FF3D7F] underline underline-offset-4 decoration-[#FF3D7F]/40 hover:decoration-[#FF3D7F] transition-colors"
                  >
                    travel
                  </Link>{" "}
                  to places most people don&apos;t go.
                </p>
                <dl className="grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3 text-base">
                  <dt className="text-slate-400">Backend</dt>
                  <dd className="text-white">PHP, Laravel, Symfony, Python</dd>
                  <dt className="text-slate-400">Frontend</dt>
                  <dd className="text-white">TypeScript, React, Astro, Tailwind</dd>
                  <dt className="text-slate-400">Tools</dt>
                  <dd className="text-white">Docker, SQL, Git</dd>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="px-6 py-20 md:py-32 text-center scroll-mt-4 border-t border-slate-800">
          <motion.div {...reveal} className="max-w-xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              <span className="text-[#E0115F] mr-2">&gt;</span>Get in touch<span className="text-[#E0115F]">_</span>
            </h2>
            <p className="text-lg text-white font-bold mb-1">Open to full-stack roles.</p>
            <p className="text-slate-400 mb-10">Remote or on-site, open to relocating.</p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-4">
              <a href={`mailto:${EMAIL}`} className={btnPrimary}>
                <Mail size={20} /> Email me
              </a>
              <a href={CV_PATH} download className={btnSecondary}>
                <Download size={18} /> Download CV
              </a>
            </div>
            <p className="text-slate-400 mb-8">{EMAIL}</p>

            <div className="flex items-center justify-center gap-6">
              <a href={GITHUB} target="_blank" rel="noopener noreferrer" className={linkQuiet}>
                GitHub
              </a>
              <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={linkQuiet}>
                LinkedIn
              </a>
            </div>
          </motion.div>
        </section>
      </main>
    </MotionConfig>
  );
}

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-10 md:mb-14">
      <div className="text-xs md:text-sm font-bold tracking-widest text-slate-400 mb-3">{title}</div>
      <h2 className="text-4xl md:text-5xl font-bold text-white">{subtitle}</h2>
    </div>
  );
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
    <motion.div {...reveal} className="relative pl-8 md:pl-12">
      <div
        className={`absolute -left-[21px] top-0 w-10 h-10 rounded-full border-4 border-[#050505] flex items-center justify-center ${
          highlight ? "bg-[#E0115F] text-white" : "bg-slate-800 text-slate-300"
        }`}
      >
        {icon}
      </div>

      <div className="flex flex-col md:flex-row gap-1 md:gap-6 mb-2">
        <span className="font-mono text-slate-300 text-sm pt-1 md:w-44 shrink-0">{date}</span>
        <div>
          <h3 className="text-2xl font-bold text-white flex flex-wrap items-center gap-x-3 gap-y-1">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FF3D7F] transition-colors inline-flex items-center gap-2"
              >
                {title}
                <ExternalLink size={18} className="opacity-70" />
              </a>
            ) : (
              title
            )}
            {highlight && <span className="text-xs bg-[#E0115F] text-white px-2 py-0.5 rounded-full">INTERN</span>}
          </h3>
          <div className="text-slate-400 font-mono text-sm mb-3">{role}</div>
        </div>
      </div>

      {desc && <p className="text-slate-300 max-w-2xl mb-4 leading-relaxed md:ml-[12.5rem]">{desc}</p>}

      {tech.length > 0 && (
        <div className="flex flex-wrap gap-2 md:ml-[12.5rem]">
          {tech.map((t) => (
            <span key={t} className="px-2 py-1 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded font-mono">
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

type AiTier = "NONE" | "LOW" | "MEDIUM" | "HIGH" | "ALL";

const AI_TIERS: Record<AiTier, string> = {
  NONE: "Hand-crafted with hot chocolate",
  LOW: "Hand-crafted with a sprinkle of AI",
  MEDIUM: "50% Human, 50% Autocomplete",
  HIGH: "25% Human, 75% Autocomplete",
  ALL: "Prompt-engineered to perfection",
};

interface ProjectShowcaseProps {
  title: string;
  desc: string;
  stack: string[];
  link: string;
  align: "left" | "right";
  image: string;
  linkLabel: string;
  aiTier: AiTier;
}

function ProjectShowcase({ title, desc, stack, link, align, image, linkLabel, aiTier }: ProjectShowcaseProps) {
  return (
    <motion.div
      {...reveal}
      className={`flex flex-col ${align === "right" ? "md:flex-row-reverse" : "md:flex-row"} gap-8 md:gap-12 items-center w-full`}
    >
      <div className="w-full md:w-[60%]">
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
          <Image src={image} alt={`${title} screenshot`} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover object-top" />
        </div>
      </div>

      <div className="w-full md:w-[40%] space-y-6">
        <div>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{title}</h3>
          <div className="font-mono text-sm text-[#FF3D7F] mb-3">{AI_TIERS[aiTier]}</div>
          <div className="h-1 w-20 bg-[#E0115F]" />
        </div>

        <p className="text-slate-300 leading-relaxed text-lg">{desc}</p>

        <p className="font-mono text-sm text-slate-400">{stack.join(" · ")}</p>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 min-h-11 text-white hover:text-[#FF3D7F] transition-colors font-bold group"
        >
          {linkLabel}
          <ExternalLink size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
}

interface ArchivedProjectProps {
  title: string;
  status: string;
  desc: string;
  stack: string[];
  link?: string;
  image: string;
  aiTier: AiTier;
}

function ArchivedProject({ title, status, desc, stack, link, image, aiTier }: ArchivedProjectProps) {
  return (
    <motion.div {...reveal} className="space-y-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
        <Image src={image} alt={`${title} screenshot`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top opacity-80" />
      </div>
      <div>
        <h4 className="text-2xl font-bold text-white">{title}</h4>
        <div className="font-mono text-sm text-[#FF3D7F] mt-1">{AI_TIERS[aiTier]}</div>
      </div>
      <p className="text-slate-300 leading-relaxed">
        <span className="text-white font-bold">{status}</span> {desc}
      </p>
      <p className="font-mono text-sm text-slate-400">{stack.join(" · ")}</p>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 min-h-11 text-white hover:text-[#FF3D7F] transition-colors font-bold"
        >
          View GitHub <ExternalLink size={16} />
        </a>
      )}
    </motion.div>
  );
}
