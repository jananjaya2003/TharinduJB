"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
} from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { FaDatabase, FaJava, FaLinkedin } from "react-icons/fa";
import {
  SiArduino,
  SiCloudflare,
  SiCplusplus,
  SiCss,
  SiDocker,
  SiFastapi,
  SiFigma,
  SiFlask,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLinux,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiHuggingface,
  SiOpencv,
  SiPandas,
  SiPostman,
  SiPython,
  SiReact,
  SiScikitlearn,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bot,
  BrainCircuit,
  Code2,
  Download,
  ExternalLink,
  GitBranch,
  Globe2,
  Mail,
  MapPin,
  Menu,
  Moon,
  Send,
  Sparkles,
  Sun,
  X,
  Zap,
} from "lucide-react";
import {
  nav,
  projects as fallbackProjects,
  skills,
  timeline,
  type Project,
} from "@/lib/data";
import { getManagedProjects } from "@/lib/projects-store";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-70px" },
  transition: { duration: 0.6 },
};

const skillIcons: Record<string, IconType> = {
  Python: SiPython,
  Java: FaJava,
  JavaScript: SiJavascript,
  SQL: FaDatabase,
  "Scikit-learn": SiScikitlearn,
  Pandas: SiPandas,
  OpenCV: SiOpencv,
  NumPy: SiNumpy,
  "Machine Learning": SiTensorflow,
  HTML: SiHtml5,
  CSS: SiCss,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  "Tailwind CSS": SiTailwindcss,
  Flask: SiFlask,
  FastAPI: SiFastapi,
  "Responsive UI": SiFigma,
  MySQL: SiMysql,
  GitHub: SiGithub,
  Netlify: SiNetlify,
  "Embedded Systems": SiArduino,
  IoT: SiArduino,
};

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12.04 2a9.84 9.84 0 0 0-8.5 14.78L2 22l5.38-1.5A9.96 9.96 0 1 0 12.04 2Zm0 17.99a8 8 0 0 1-4.08-1.12l-.29-.17-3.19.89.85-3.11-.19-.32a8 8 0 1 1 6.9 3.83Zm4.39-5.99c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.19a7.22 7.22 0 0 1-1.34-1.66c-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.47-.39-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.58.18 1.1.16 1.51.1.46-.07 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M14 8.5V7c0-.75.5-1 1.25-1H18V2.15A25 25 0 0 0 15.6 2C13.15 2 11 3.5 11 6.2v2.3H8V12h3v10h4V12h3l.5-3.5H15Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M5.2 7.7A2.3 2.3 0 1 0 5.2 3a2.3 2.3 0 0 0 0 4.7ZM3.3 21h3.8V9H3.3v12ZM9.4 9H13v1.65h.05c.5-.95 1.73-1.95 3.55-1.95 3.8 0 4.5 2.5 4.5 5.75V21h-3.8v-5.8c0-1.38-.03-3.15-1.92-3.15-1.92 0-2.22 1.5-2.22 3.05V21H9.4V9Z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.55 9.55 0 0 1 12 6.84c.85 0 1.69.11 2.48.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86V21c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text?: string;
}) {
  return (
    <motion.div {...reveal} className="section-heading">
      <span className="eyebrow">
        <Sparkles size={14} />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const start = performance.now();
    const run = (t: number) => {
      const p = Math.min((t - start) / 1100, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) requestAnimationFrame(run);
    };
    requestAnimationFrame(run);
  }, [seen, value]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function Loader() {
  const [show, setShow] = useState(true);
  const [destination, setDestination] = useState({
    x: 0,
    y: 0,
    scale: 1,
    active: false,
  });
  const flyingJRef = useRef<HTMLElement>(null);
  const technologies = [
    [SiPython, "Python"],
    [SiJavascript, "JavaScript"],
    [SiTypescript, "TypeScript"],
    [SiReact, "React"],
    [SiNextdotjs, "Next.js"],
    [SiGit, "Git"],
    [SiGithub, "GitHub"],
    [FaLinkedin, "LinkedIn"],
    [SiHuggingface, "Artificial Intelligence"],
    [SiTensorflow, "TensorFlow"],
    [SiScikitlearn, "Scikit-learn"],
    [SiOpencv, "OpenCV"],
    [SiNumpy, "NumPy"],
    [SiPandas, "Pandas"],
    [SiFastapi, "FastAPI"],
    [SiFlask, "Flask"],
    [SiMysql, "MySQL"],
    [SiMongodb, "MongoDB"],
    [SiCloudflare, "Cloudflare"],
    [SiPostman, "Postman"],
    [SiArduino, "Arduino"],
    [SiCplusplus, "C++"],
    [SiCss, "CSS"],
    [SiHtml5, "HTML5"],
    [SiFigma, "Figma"],
    [SiDocker, "Docker"],
    [SiLinux, "Linux"],
    [SiVercel, "Vercel"],
    [SiTailwindcss, "Tailwind CSS"],
    [SiNodedotjs, "Node.js"],
  ] as const;
  const logoField = Array.from(
    { length: 156 },
    (_, index) => technologies[index % technologies.length],
  );
  useEffect(() => {
    const fly = setTimeout(() => {
      const source = flyingJRef.current?.getBoundingClientRect();
      const target = document
        .querySelector<HTMLElement>(".hero-signature-j")
        ?.getBoundingClientRect();
      if (source && target) {
        setDestination({
          x: target.left + target.width / 2 - (source.left + source.width / 2),
          y: target.top + target.height / 2 - (source.top + source.height / 2),
          scale: target.width / source.width,
          active: true,
        });
      }
    }, 3100);
    const hide = setTimeout(() => setShow(false), 4050);
    return () => {
      clearTimeout(fly);
      clearTimeout(hide);
    };
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader tech-loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="tech-logo-field" aria-hidden="true">
            {logoField.map(([Logo, name], index) => (
              <motion.span
                key={`${name}-${index}`}
                title={name}
                initial={{
                  opacity: 0,
                  scale: 0.2,
                  rotate: index % 2 ? -18 : 18,
                }}
                animate={{
                  opacity: [0, 0.72, 0.32],
                  scale: [0, 1.08, 1],
                  rotate: 0,
                }}
                transition={{
                  duration: 1.1,
                  delay: (index % 39) * 0.025,
                  ease: "easeOut",
                }}
              >
                <Logo />
              </motion.span>
            ))}
          </div>
          <motion.div
            className="tech-loader-core"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.35 }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              Building the stack
            </motion.p>
            <div className="loader-full-name" aria-label="Tharindu J Bandara">
              <span>Tharindu</span>
              <motion.b
                ref={flyingJRef}
                className="loader-flying-j"
                animate={
                  destination.active
                    ? {
                        x: destination.x,
                        y: destination.y,
                        scale: destination.scale,
                        rotate: 0,
                      }
                    : { x: 0, y: 0, scale: 1, rotate: 0 }
                }
                transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
              >
                J
              </motion.b>
              <span>Bandara</span>
            </div>
            <motion.i
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.25 }}
            />
            <motion.small
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{ duration: 2.2, delay: 1.15 }}
            >
              Python · Git · React · AI · Cloud · Automation
            </motion.small>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Portfolio() {
  const { theme, setTheme } = useTheme();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("about");
  const [managedProjects, setManagedProjects] =
    useState<Project[]>(fallbackProjects);
  const [cursor, setCursor] = useState({ x: -200, y: -200 });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  useEffect(() => {
    getManagedProjects()
      .then(setManagedProjects)
      .catch(() => undefined);
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-35% 0px -55%" },
    );
    nav.forEach((id) => {
      const e = document.getElementById(id);
      if (e) obs.observe(e);
    });
    return () => obs.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Loader />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div
        className="cursor-glow"
        style={{
          transform: `translate(${cursor.x - 160}px,${cursor.y - 160}px)`,
        }}
      />
      <header className="nav-wrap">
        <nav aria-label="Primary navigation">
          <a href="#top" className="brand">
            Tharindu<span>JB</span>
          </a>
          <div className="navlinks">
            {nav.map((n) => (
              <a
                className={active === n ? "active" : ""}
                href={`#${n}`}
                key={n}
              >
                {n}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button
              suppressHydrationWarning
              aria-label="Toggle color theme"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>
            <a className="hire" href="#contact">
              Let&apos;s talk <ArrowRight />
            </a>
            <button
              className="menu"
              aria-label="Open menu"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </nav>
        {menu && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {nav.map((n) => (
              <a onClick={() => setMenu(false)} href={`#${n}`} key={n}>
                {n}
              </a>
            ))}
          </motion.div>
        )}
      </header>
      <main id="main-content">
        <section className="hero" id="top">
          <motion.video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1.03, opacity: 1 }}
            transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <source src="/portfoliovideo.mp4" type="video/mp4" />
          </motion.video>
          <motion.div
            className="hero-video-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.25 }}
          />
          <motion.div
            className="hero-film-label"
            aria-hidden="true"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.45, ease: "easeOut" }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7 }}
            >
              Portfolio film
            </motion.span>
            <motion.i
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.7, delay: 1.85, ease: "easeOut" }}
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.15 }}
            >
              2026
            </motion.span>
          </motion.div>
          <div className="orb one" />
          <div className="orb two" />
          <div className="hero-grid">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7 }}
              className="hero-copy"
            >
              <span className="availability">
                <i />
                Open to internship opportunities
              </span>
              <p className="hello">Hello, I&apos;m</p>
              <h1 aria-label="Tharindu J Bandara">
                <span className="name-first">Tharindu</span>
                <span className="name-line">
                  <motion.b
                    className="hero-signature-j"
                    initial={{ opacity: 0, rotate: -12, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    transition={{ delay: 1.55, type: "spring", stiffness: 180 }}
                    aria-hidden="true"
                  >
                    J
                  </motion.b>
                  <span>Bandara.</span>
                </span>
              </h1>
              <div className="role">
                <span>Computer Science + AI</span>
                <i />
                <span>Undergraduate</span>
              </div>
              <p className="lead">
                I build intelligent systems that turn real-world problems into
                useful, human-centered products — from machine learning models
                to complete web experiences.
              </p>
              <motion.div
                className="hero-tech"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 1.65 },
                  },
                }}
                aria-label="Core technologies"
              >
                {[
                  { icon: Code2, name: "Python", type: "Language" },
                  { icon: Globe2, name: "Next.js", type: "Frontend" },
                  { icon: BrainCircuit, name: "AI / ML", type: "Intelligence" },
                  { icon: Zap, name: "FastAPI", type: "Backend" },
                  { icon: Bot, name: "Automation", type: "Systems" },
                ].map((tech) => (
                  <motion.span
                    key={tech.name}
                    variants={{
                      hidden: { opacity: 0, y: 12, scale: 0.94 },
                      show: { opacity: 1, y: 0, scale: 1 },
                    }}
                    whileHover={{ y: -3, borderColor: "rgba(184,245,62,.62)" }}
                  >
                    <tech.icon />
                    <i>
                      <small>{tech.type}</small>
                      {tech.name}
                    </i>
                  </motion.span>
                ))}
              </motion.div>
              <div className="hero-buttons">
                <a href="#projects" className="primary">
                  Explore my work <ArrowDown />
                </a>
                <a
                  href="/Tharindu-Bandara-CV.pdf"
                  download
                  className="secondary"
                >
                  <Download /> Download CV
                </a>
              </div>
              <div className="socials">
                <span>Find me online</span>
                {[
                  {
                    label: "Instagram",
                    href: "https://www.instagram.com/tharindujb",
                    icon: InstagramIcon,
                  },
                  {
                    label: "Facebook",
                    href: "https://www.facebook.com/tharindujb",
                    icon: FacebookIcon,
                  },
                  {
                    label: "LinkedIn",
                    href: "https://www.linkedin.com/in/tharindujb",
                    icon: LinkedInIcon,
                  },
                  {
                    label: "GitHub",
                    href: "https://github.com/jananjaya2003",
                    icon: GithubIcon,
                  },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    aria-label={`Visit Tharindu on ${social.label}`}
                    title={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                  >
                    <social.icon />
                  </motion.a>
                ))}
                <motion.a
                  className="whatsapp"
                  aria-label="Chat with Tharindu on WhatsApp"
                  title="WhatsApp"
                  href="https://wa.me/94721005844"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -4, scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                >
                  <WhatsAppIcon />
                </motion.a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.25, duration: 0.8 }}
              className="portrait-wrap"
            >
              <div className="portrait-card">
                <Image
                  src="/profilepic.png"
                  alt="Tharindu Bandara"
                  fill
                  priority
                  sizes="(max-width: 800px) 85vw, 440px"
                />
                <div className="photo-shade" />
                <div className="photo-label">
                  <span>
                    <i />
                    Based in
                  </span>
                  <strong>
                    <MapPin />
                    Kurunegala, Sri Lanka
                  </strong>
                </div>
              </div>
              <motion.div
                className="float-card ai"
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <BrainCircuit />
                <span>
                  <small>Focused on</small>AI & Automation
                </span>
              </motion.div>
              <motion.div
                className="float-card code"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.6, repeat: Infinity }}
              >
                <Code2 />
                <span>
                  <small>Building</small>Real-world systems
                </span>
              </motion.div>
            </motion.div>
          </div>
          <a href="#about" className="scroll-hint">
            <span>Scroll to discover</span>
            <ArrowDown />
          </a>
        </section>

        <section id="about" className="section about">
          <SectionTitle
            eyebrow="About me"
            title="Curious mind. Practical builder."
          />
          <div className="about-grid">
            <motion.div {...reveal} className="about-copy">
              <p className="big-copy">
                I&apos;m an undergraduate pursuing a{" "}
                <em>BSc in Computer Science with Artificial Intelligence</em>{" "}
                from Coventry University, UK, through NIBM.
              </p>
              <p>
                My strongest interests sit where AI automation, software
                development and robotics meet. I enjoy moving from messy data
                and a real problem to a system people can actually use.
              </p>
              <p>
                I&apos;m seeking an internship where I can contribute to
                innovative projects, learn from an ambitious engineering team
                and grow into a well-rounded AI and software engineer.
              </p>
              <div className="interests">
                <span>Machine learning</span>
                <span>AI automation</span>
                <span>Robotics</span>
                <span>System design</span>
              </div>
            </motion.div>
            <motion.div {...reveal} className="about-stack">
              <div className="info-card accent">
                <BrainCircuit />
                <div>
                  <small>Currently studying</small>
                  <strong>BSc Computer Science with AI</strong>
                  <p>Coventry University (UK) · NIBM</p>
                </div>
              </div>
              <div className="info-card">
                <Zap />
                <div>
                  <small>Core strength</small>
                  <strong>From model to product</strong>
                  <p>AI, data, frontend and backend thinking</p>
                </div>
              </div>
              <div className="info-card">
                <Globe2 />
                <div>
                  <small>Career direction</small>
                  <strong>AI & Software Engineering</strong>
                  <p>Intelligent, reliable, useful systems</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="section tinted">
          <SectionTitle
            eyebrow="Capabilities"
            title="A versatile technical toolkit."
            text="Hands-on technologies used across academic and personal projects."
          />
          <div className="skill-grid">
            {skills.map((s, i) => (
              <motion.article
                {...reveal}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                key={s.group}
              >
                <div className="skill-top">
                  <span>0{i + 1}</span>
                  <h3>{s.group}</h3>
                </div>
                <div className="chips">
                  {s.items.map((x) => (
                    <motion.span key={x} whileHover={{ y: -3, scale: 1.04 }}>
                      {(() => {
                        const SkillIcon = skillIcons[x];
                        return SkillIcon ? (
                          <SkillIcon aria-hidden="true" />
                        ) : null;
                      })()}
                      {x}
                    </motion.span>
                  ))}
                </div>
                <div className="skill-line">
                  <motion.i
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.08 }}
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="projects-heading-row">
            <SectionTitle
              eyebrow="Selected work"
              title="Projects with real-world intent."
              text="A selection drawn directly from my completed project work."
            />
            <motion.a
              className="see-all-projects"
              href="/projects"
              {...reveal}
              whileHover={{ x: 5 }}
            >
              <span>See all projects</span>
              <ArrowRight />
            </motion.a>
          </div>
          <div className="projects">
            {managedProjects.slice(0, 2).map((p, i) => (
              <motion.article {...reveal} key={p.title} className="project">
                <div className="project-image">
                  <Image
                    src={p.image}
                    alt={`${p.title} project visual`}
                    fill
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                  <div className="project-index">0{i + 1}</div>
                  <div className="project-metric">{p.metric}</div>
                </div>
                <div className="project-body">
                  <div>
                    <span className="project-period">{p.period}</span>
                    <h3>{p.title}</h3>
                    <h4>{p.subtitle}</h4>
                    <p>{p.description}</p>
                    <dl className="project-case-study">
                      <div>
                        <dt>Challenge</dt>
                        <dd>{p.challenge}</dd>
                      </div>
                      <div>
                        <dt>Outcome</dt>
                        <dd>{p.outcome}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <div className="chips">
                      {p.tags.map((x) => (
                        <span key={x}>{x}</span>
                      ))}
                    </div>
                    <div className="project-links">
                      {p.caseStudyUrl && (
                        <a
                          href={p.caseStudyUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Read the full ${p.title} case study`}
                        >
                          <ExternalLink /> Case study
                        </a>
                      )}
                      {p.linkedinPostUrl && (
                        <a
                          href={p.linkedinPostUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`View the ${p.title} post on LinkedIn`}
                        >
                          <LinkedInIcon /> LinkedIn post
                        </a>
                      )}
                      <a
                        href="https://github.com/jananjaya2003"
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View the GitHub profile for more information about ${p.title}`}
                      >
                        <GitBranch /> GitHub profile <ExternalLink />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="journey" className="section tinted">
          <SectionTitle eyebrow="Journey" title="Learning through building." />
          <div className="journey-grid">
            <div className="timeline">
              <h3>Project experience</h3>
              {timeline.map((t, i) => (
                <motion.div {...reveal} className="timeline-item" key={t.title}>
                  <div className="dot">{i + 1}</div>
                  <div>
                    <span>{t.date}</span>
                    <h4>{t.title}</h4>
                    <p>{t.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="credentials">
              <motion.div {...reveal} className="education-card">
                <span className="card-label">Education</span>
                <h3>BSc Computer Science with Artificial Intelligence</h3>
                <p>Coventry University (UK) · NIBM</p>
                <strong>2024 — Present</strong>
                <hr />
                <h3>Diploma in English</h3>
                <p>ESOFT</p>
                <strong>2025</strong>
              </motion.div>
              <motion.div {...reveal} className="cert-card">
                <span className="card-label">Certifications</span>
                {[
                  "AI for Beginners · HP LIFE",
                  "Introduction to Cybersecurity Awareness · HP LIFE",
                  "Introduction to Cybersecurity · Cisco",
                  "IT Essentials · Alison",
                ].map((x, i) => (
                  <div key={x}>
                    <span>0{i + 1}</span>
                    {x}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        <section id="services" className="section">
          <SectionTitle
            eyebrow="What I do"
            title="Building across the stack."
          />
          <div className="service-grid">
            {[
              {
                icon: BrainCircuit,
                title: "AI Development",
                text: "Practical ML pipelines, prediction systems and computer vision applications.",
              },
              {
                icon: Code2,
                title: "Full-stack Development",
                text: "Useful web applications with clear interfaces, APIs and structured data.",
              },
              {
                icon: Bot,
                title: "Automation",
                text: "Workflows and intelligent tools that reduce repetitive work and surface insight.",
              },
              {
                icon: Globe2,
                title: "Web Development",
                text: "Responsive, accessible experiences shaped around real user needs.",
              },
            ].map((s, i) => (
              <motion.article {...reveal} whileHover={{ y: -6 }} key={s.title}>
                <span>0{i + 1}</span>
                <s.icon />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ArrowRight />
              </motion.article>
            ))}
          </div>
          <div className="stats">
            <div>
              <Counter value={10} suffix="+" />
              <p>Projects built</p>
            </div>
            <div>
              <Counter value={15} suffix="+" />
              <p>Technologies used</p>
            </div>
            <div>
              <Counter value={4} />
              <p>Certifications</p>
            </div>
            <div>
              <Counter value={2} suffix="+" />
              <p>Years learning</p>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <motion.div {...reveal} className="contact-copy">
            <span className="eyebrow">
              <Mail size={14} />
              Contact
            </span>
            <h2>
              Let&apos;s build something
              <br />
              <em>worth using.</em>
            </h2>
            <p>
              I&apos;m currently open to internship opportunities,
              collaborations and conversations about AI and software.
            </p>
            <a href="mailto:jananjayabandara2003@gmail.com">
              jananjayabandara2003@gmail.com <ArrowRight />
            </a>
            <span className="location">
              <MapPin />
              Kurunegala, Sri Lanka
            </span>
          </motion.div>
          <motion.form
            {...reveal}
            onSubmit={(event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const name = String(data.get("name") || "").trim();
              const email = String(data.get("email") || "").trim();
              const message = String(data.get("message") || "").trim();
              const whatsappMessage = [
                "Hello Tharindu,",
                "",
                message,
                "",
                `Name: ${name}`,
                `Email: ${email}`,
              ].join("\n");
              window.open(
                `https://wa.me/94721005844?text=${encodeURIComponent(whatsappMessage)}`,
                "_blank",
                "noopener,noreferrer",
              );
            }}
          >
            <div className="field-row">
              <label>
                Name
                <input required name="name" placeholder="Your name" />
              </label>
              <label>
                Email
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label>
              Message
              <textarea
                required
                name="message"
                rows={5}
                placeholder="Tell me about your idea or opportunity..."
              />
            </label>
            <button className="primary" type="submit">
              Send message <Send />
            </button>
          </motion.form>
        </section>
      </main>
      <footer>
        <a href="#top" className="brand">
          Tharindu<span>JB</span>
        </a>
        <p>Designed &amp; built by Tharindu J Bandara · © 2026</p>
        <div>
          <a href="mailto:jananjayabandara2003@gmail.com">
            <Mail />
          </a>
          <a href="https://www.yakafinity.com" target="_blank">
            <Globe2 />
          </a>
          <a href="#top">
            <ArrowUp />
          </a>
        </div>
      </footer>
    </>
  );
}
