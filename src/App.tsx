import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";

type ClientProject = {
    label: string;
    title: string;
    platform: string;
    desc: string;
    features: string[];
    stack: string[];
    screenshots: string[];
};

const clientProjects: ClientProject[] = [
    {
        label: "01",
        title: "Live Streaming & VOD Mobile App",
        platform: "React Native (Expo) · iOS & Android",
        desc: "A cross-platform mobile streaming app delivering live TV broadcasts and a VOD library. Features a live HLS player with adaptive bitrate quality selection, Picture-in-Picture, and seamless mid-stream resume. Users browse 1,300+ videos by category, follow a day-by-day schedule, and pick up where they left off via watch progress sync.",
        features: [
            "Live broadcast viewer with real-time viewer count",
            "VOD library with search and category filters",
            "Personalized Continue Watching and recommendations",
            "Google & Apple OAuth sign-in",
            "In-app push notifications",
            "Sponsor ad placements (pre/mid/post-roll, banners)",
            "Comments on programs",
        ],
        stack: ["React Native 0.81", "Expo 54", "Expo Router", "TanStack Query", "Zustand", "expo-video (HLS)", "Firebase Cloud Messaging", "Better Auth", "Shopify FlashList"],
        screenshots: ["/screenshots/mobile/1.jpg", "/screenshots/mobile/2.jpg", "/screenshots/mobile/3.jpg", "/screenshots/mobile/4.jpg"],
    },
    {
        label: "02",
        title: "Content Management & Analytics Dashboard",
        platform: "Next.js · Web",
        desc: "A full-featured internal dashboard for managing platform content and monitoring audience performance. Admins create and edit programs, upload and assign videos, control the live broadcast stream, compose push notifications, moderate comments, and run ad campaigns — all from a single interface. The analytics module surfaces DAU, watch heatmaps, demographics, and per-video engagement.",
        features: [
            "Program & video CRUD with rich metadata",
            "TV schedule builder (slot management by day/time)",
            "Live stream control (RTMP stream key, HLS status)",
            "Push notification composer",
            "Ad campaign & placement management",
            "Comment moderation and user management",
            "Audience analytics with heatmaps and DAU tracking",
            "E2E tested with Playwright",
        ],
        stack: ["Next.js 16 (App Router)", "TypeScript", "Tailwind CSS v4", "hls.js", "Vitest", "Playwright"],
        screenshots: ["/screenshots/admin/1.jpg", "/screenshots/admin/2.jpg", "/screenshots/admin/3.jpg", "/screenshots/admin/4.jpg"],
    },
    {
        label: "03",
        title: "Desktop Video Encoder",
        platform: "Electron · Windows / macOS",
        desc: "A desktop app that automates the video ingestion pipeline. Operators select files locally, and the app handles FFmpeg transcoding, direct upload to object storage via presigned S3 URLs, and job-queue coordination with the backend — no manual intervention. Pairs with the backend via a one-time code, polls for queued encoding jobs, and reports success/failure with a full encoding history log.",
        features: [
            "FFmpeg-powered local transcoding",
            "Presigned S3/MinIO direct upload (bypasses API bandwidth)",
            "Job queue integration with polling",
            "One-time-code pairing flow",
            "Heartbeat mechanism for connection health",
            "Encoding history",
        ],
        stack: ["Electron", "Node.js", "FFmpeg", "S3 / MinIO", "Electron Builder (NSIS)"],
        screenshots: ["/screenshots/encoder/1.jpg", "/screenshots/encoder/2.jpg", "/screenshots/encoder/3.jpg"],
    },
    {
        label: "04",
        title: "Streaming Platform API",
        platform: "Fastify · Node.js · TypeScript",
        desc: "A high-throughput REST API powering the mobile app, admin dashboard, and encoder. Built with a modular per-domain architecture, it handles auth, content delivery, live streaming state, analytics ingestion, background job dispatch, and ad serving. Separate worker processes handle FCM push delivery and video transcoding asynchronously via a BullMQ queue.",
        features: [
            "JWT + OAuth session auth (Google, Apple)",
            "Cursor-based pagination for stable infinite scroll",
            "Presigned URL generation for direct S3 uploads",
            "Live stream status & RTMP management",
            "Playback analytics event tracking",
            "BullMQ job queue for notifications and transcoding",
            "Redis caching and rate limiting",
            "OpenAPI/Swagger docs (Scalar)",
        ],
        stack: ["Fastify 5", "TypeScript", "PostgreSQL 16", "Drizzle ORM", "Redis (Valkey)", "BullMQ", "S3/MinIO", "Zod", "Better Auth", "Nginx-RTMP"],
        screenshots: ["/screenshots/api/1.jpg", "/screenshots/api/2.jpg"],
    },
];

export default function App() {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const [shotIndex, setShotIndex] = useState(0);

    const closeModal = useCallback(() => setActiveProject(null), []);
    const nextShot = useCallback(() => {
        if (activeProject === null) return;
        const total = clientProjects[activeProject].screenshots.length;
        setShotIndex((i) => (i + 1) % total);
    }, [activeProject]);
    const prevShot = useCallback(() => {
        if (activeProject === null) return;
        const total = clientProjects[activeProject].screenshots.length;
        setShotIndex((i) => (i - 1 + total) % total);
    }, [activeProject]);

    useEffect(() => {
        if (activeProject === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextShot();
            if (e.key === "ArrowLeft") prevShot();
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [activeProject, closeModal, nextShot, prevShot]);

    const openProject = (i: number) => {
        setActiveProject(i);
        setShotIndex(0);
    };

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white pb-24">
            {/* NAV */}
            <nav className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-sm z-50 py-6 px-6 md:px-12 flex justify-between items-center">
                <a href="#" className="flex-shrink-0 text-xl font-black tracking-tighter uppercase cursor-pointer hover:opacity-50 transition-opacity">
                    dagim
                </a>
                <div className="hidden md:flex gap-10 text-sm font-bold tracking-widest uppercase">
                    <a href="#skills" className="hover:underline underline-offset-8 decoration-2">Skills</a>
                    <a href="#experience" className="hover:underline underline-offset-8 decoration-2">Experience</a>
                    <a href="#client-work" className="hover:underline underline-offset-8 decoration-2">Work</a>
                    <a href="#projects" className="hover:underline underline-offset-8 decoration-2">Projects</a>
                    <a href="#contact" className="hover:bg-black hover:text-white px-2 py-1 transition-colors">Hire me</a>
                </div>
            </nav>

            <main className="px-6 md:px-12 max-w-[1400px] mx-auto">
                {/* HERO */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="pt-48 pb-32"
                >
                    <div className="inline-block pb-2 mb-10 text-sm font-bold uppercase tracking-widest bg-black text-white px-3 py-1">
                        Available for remote work
                    </div>
                    <h1 className="text-[3.5rem] leading-[1] md:text-[6rem] lg:text-[8rem] font-black tracking-tighter mb-12 uppercase">
                        Full Stack Dev <br />
                        & DevOps Engineer
                    </h1>
                    <p className="text-xl md:text-3xl font-medium tracking-tight mb-20 max-w-4xl leading-[1.3]">
                        I build products end-to-end — from pixel-perfect frontends to production Kubernetes clusters. Based in Addis Ababa, working with teams worldwide.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 mb-32">
                        <a href="#contact" className="bg-black text-white text-lg font-bold px-12 py-6 hover:opacity-80 transition-opacity whitespace-nowrap text-center uppercase tracking-widest">
                            Get in touch
                        </a>
                        <a href="https://github.com/dagim19" target="_blank" rel="noreferrer" className="text-black text-lg font-bold px-12 py-6 hover:bg-black hover:text-white transition-colors flex justify-center items-center gap-2 uppercase tracking-widest">
                            View GitHub <ArrowUpRight className="w-6 h-6" />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mt-12">
                        <div>
                            <div className="text-7xl lg:text-9xl font-black tracking-tighter mb-4">4+</div>
                            <div className="text-sm font-bold tracking-widest uppercase text-gray-500">Production projects shipped</div>
                        </div>
                        <div>
                            <div className="text-7xl lg:text-9xl font-black tracking-tighter mb-4">35+</div>
                            <div className="text-sm font-bold tracking-widest uppercase text-gray-500">GitHub repositories</div>
                        </div>
                        <div>
                            <div className="text-7xl lg:text-9xl font-black tracking-tighter mb-4">∞</div>
                            <div className="text-sm font-bold tracking-widest uppercase text-gray-500">Docker containers survived</div>
                        </div>
                    </div>
                </motion.section>

                {/* SKILLS */}
                <motion.section
                    id="skills"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="py-32"
                >
                    <div className="text-sm font-bold uppercase tracking-widest mb-6">What I bring</div>
                    <h2 className="text-[3rem] leading-[1] md:text-[5.5rem] lg:text-[7rem] font-black tracking-tighter mb-10 uppercase">
                        Skills & <br className="md:hidden" /> Technologies
                    </h2>
                    <p className="text-xl md:text-3xl font-medium tracking-tight max-w-3xl mb-32 leading-[1.3]">
                        A rare combo of full stack development and production-grade DevOps — I can build it and ship it.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-28 gap-x-16">
                        <div className="flex flex-col gap-8">
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter flex items-center gap-4 uppercase">
                                <span className="text-4xl grayscale">⚡</span> Frontend
                            </h3>
                            <div className="text-xl md:text-2xl font-medium leading-normal tracking-tight text-gray-500">
                                React.js / Next.js / React Native / TypeScript / Responsive UI
                            </div>
                        </div>
                        <div className="flex flex-col gap-8">
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter flex items-center gap-4 uppercase">
                                <span className="text-4xl grayscale">🔧</span> Backend
                            </h3>
                            <div className="text-xl md:text-2xl font-medium leading-normal tracking-tight text-gray-500">
                                Node.js / NestJS / Fastify / C# / .NET / Microservices / REST APIs
                            </div>
                        </div>
                        <div className="flex flex-col gap-8">
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter flex items-center gap-4 uppercase">
                                <span className="text-4xl grayscale">🚀</span> DevOps & Infrastructure
                            </h3>
                            <div className="text-xl md:text-2xl font-medium leading-normal tracking-tight text-gray-500">
                                Kubernetes / Docker / CI/CD / Linux / PostgreSQL / MongoDB / Redis / RabbitMQ
                            </div>
                        </div>
                        <div className="flex flex-col gap-8">
                            <h3 className="text-2xl md:text-3xl font-bold tracking-tighter flex items-center gap-4 uppercase">
                                <span className="text-4xl grayscale">🤖</span> Machine Learning
                            </h3>
                            <div className="text-xl md:text-2xl font-medium leading-normal tracking-tight text-gray-500">
                                Python / ML Specialization / NLP / Amharic AI / GPT-2
                            </div>
                        </div>
                    </div>
                </motion.section>

                {/* EXPERIENCE */}
                <motion.section
                    id="experience"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="py-32"
                >
                    <div className="text-sm font-bold uppercase tracking-widest mb-6">Where I've worked</div>
                    <h2 className="text-[3rem] leading-[1] md:text-[5.5rem] lg:text-[7rem] font-black tracking-tighter mb-10 uppercase">Experience</h2>
                    <p className="text-xl md:text-3xl font-medium tracking-tight max-w-3xl mb-32 leading-[1.3]">
                        Real production work across multiple companies, simultaneously.
                    </p>

                    <div className="flex flex-col gap-40">
                        {[
                            {
                                date: "Apr 2025 – Present",
                                company: "Perago Systems",
                                role: "Software Developer",
                                badge: "Current",
                                bullets: [
                                    "Built React frontend with complex state management for a nationwide court case management system",
                                    "Developed C# backend services following clean architecture principles",
                                    "Containerized applications with Docker and built CI/CD pipelines for automated deployments",
                                    "Managed Linux production servers for national rollout",
                                ]
                            },
                            {
                                date: "2025 – Present",
                                company: "Systems Edge",
                                role: "DevOps Engineer",
                                badge: "Part-time",
                                bullets: [
                                    "Provisioned full production infrastructure from bare Ubuntu VMs — zero existing setup",
                                    "Deployed Kubernetes cluster, PostgreSQL with replication, MongoDB with redundancy, MinIO object storage",
                                    "Set up Portainer with Authelia authentication guard for infrastructure monitoring",
                                ]
                            },
                            {
                                date: "2025 – Present",
                                company: "Channel 1 Ethiopia",
                                role: "Full Stack Developer & Solutions Architect",
                                badge: "Contract",
                                bullets: [
                                    "Designed and shipped a four-app streaming platform (React Native, Next.js, Electron, Fastify) for a national TV broadcaster",
                                    "Built the iOS/Android app with live HLS playback, 1,300+ VOD library, and ad-supported monetization",
                                    "Architected the Fastify + PostgreSQL + Redis + BullMQ backend powering mobile, admin, and encoder clients",
                                ]
                            },
                            {
                                date: "2025",
                                company: "Harambeet",
                                role: "Full Stack Developer & DevOps Engineer",
                                badge: "Contract",
                                bullets: [
                                    "Architected and deployed a complete crowdfunding platform with Next.js and microservices backend",
                                    "Designed infrastructure with 10+ Docker containers covering APIs, workers, and supporting services",
                                    "Integrated Ory Kratos authentication and Novu notification services",
                                ]
                            }
                        ].map((exp, i) => (
                            <div key={i} className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-12 lg:gap-20">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">{exp.date}</div>
                                    <div className="text-2xl lg:text-3xl font-black tracking-tighter uppercase mb-4 leading-none">{exp.company}</div>
                                    <div className="inline-block bg-black text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5">
                                        {exp.badge}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl lg:text-5xl font-bold tracking-tighter mb-10 leading-none">{exp.role}</h3>
                                    <ul className="flex flex-col gap-6 text-xl lg:text-3xl font-medium tracking-tight leading-[1.3] text-gray-800">
                                        {exp.bullets.map((bullet, j) => (
                                            <li key={j} className="flex gap-6 lg:gap-10">
                                                <span className="font-black shrink-0 text-black">→</span>
                                                <span>{bullet}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* CLIENT WORK */}
                <motion.section
                    id="client-work"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="py-32"
                >
                    <div className="text-sm font-bold uppercase tracking-widest mb-6">Shipped for clients</div>
                    <h2 className="text-[3rem] leading-[1] md:text-[5.5rem] lg:text-[7rem] font-black tracking-tighter mb-10 uppercase">
                        Client <br className="md:hidden" /> Work
                    </h2>
                    <p className="text-xl md:text-3xl font-medium tracking-tight max-w-3xl mb-20 leading-[1.3]">
                        A full streaming platform — mobile, web, desktop, and backend — built end-to-end for Channel 1 Ethiopia, a national TV broadcaster. Code is proprietary; screenshots shown with permission.
                    </p>
                    <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-32 max-w-3xl">
                        All four apps share a pnpm monorepo with end-to-end TypeScript types and Zod validators across every client.
                    </div>

                    <div className="flex flex-col gap-32">
                        {clientProjects.map((proj, i) => (
                            <div key={i} className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-8 lg:gap-16 items-start border-t-2 border-black pt-12">
                                <div className="text-5xl lg:text-7xl font-black tracking-tighter leading-none">{proj.label}</div>
                                <div className="max-w-4xl">
                                    <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">{proj.platform}</div>
                                    <h3 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase leading-[1.05] mb-8">{proj.title}</h3>
                                    <p className="text-xl lg:text-2xl font-medium tracking-tight mb-10 leading-[1.4] text-gray-800">
                                        {proj.desc}
                                    </p>

                                    <div className="text-xs font-bold uppercase tracking-widest mb-4">Key features</div>
                                    <ul className="flex flex-col gap-3 mb-10 text-base lg:text-lg font-medium leading-[1.4] text-gray-800">
                                        {proj.features.map((f, idx) => (
                                            <li key={idx} className="flex gap-4">
                                                <span className="font-black shrink-0 text-black">→</span>
                                                <span>{f}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="text-xs font-bold uppercase tracking-widest mb-4">Stack</div>
                                    <div className="text-sm font-bold uppercase tracking-widest text-gray-500 flex flex-wrap gap-x-5 gap-y-2 mb-10">
                                        {proj.stack.map((s, idx) => (
                                            <span key={idx}>{s}</span>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => openProject(i)}
                                        className="inline-flex items-center gap-3 text-base font-bold uppercase tracking-widest bg-black text-white px-6 py-4 hover:opacity-80 transition-opacity"
                                    >
                                        View Screenshots ({proj.screenshots.length}) <ArrowUpRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* PROJECTS */}
                <motion.section
                    id="projects"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="py-32"
                >
                    <div className="text-sm font-bold uppercase tracking-widest mb-6">Side work</div>
                    <h2 className="text-[3rem] leading-[1] md:text-[5.5rem] lg:text-[7rem] font-black tracking-tighter mb-10 uppercase">
                        Notable <br className="md:hidden" /> Projects
                    </h2>
                    <p className="text-xl md:text-3xl font-medium tracking-tight max-w-3xl mb-32 leading-[1.3]">
                        Things I built because I was curious — including Amharic AI research that barely exists anywhere.
                    </p>

                    <div className="flex flex-col gap-40">
                        {[
                            {
                                emoji: "🇪🇹",
                                title: "Amharic GPT-2",
                                link: "https://github.com/dagim19/amharic-gpt-2-small",
                                desc: "Pre-trained GPT-2 small on Amharic text — one of the very few Amharic language models in existence. Because someone had to.",
                                tags: ["Python", "NLP", "GPT-2", "Transformers"]
                            },
                            {
                                emoji: "🔤",
                                title: "Amharic BPE Tokenizer",
                                link: "https://github.com/dagim19/amharic-tokenizer-bpe",
                                desc: "Custom BPE tokenizer trained on Amharic alphabets and letters. Available on HuggingFace. Foundational work for Amharic NLP.",
                                tags: ["Python", "BPE", "HuggingFace", "Amharic"]
                            },
                            {
                                emoji: "📖",
                                title: "Reverse Dictionary",
                                link: "https://github.com/dagim19/reverse_dictionary",
                                desc: "Describe a concept in a sentence, get the word back. Semantic similarity search across the English dictionary.",
                                tags: ["Python", "Semantic Search", "NLP"]
                            },
                        ].map((proj, i) => (
                            <div key={i} className="grid grid-cols-1 lg:grid-cols-[100px_1fr_auto] gap-8 md:gap-16 items-start">
                                <div className="text-6xl grayscale hidden lg:block">{proj.emoji}</div>
                                <div className="max-w-3xl">
                                    <div className="flex items-center gap-6 mb-8">
                                        <span className="text-5xl grayscale lg:hidden">{proj.emoji}</span>
                                        <h3 className="text-3xl lg:text-5xl font-black tracking-tighter uppercase leading-[1.1]">{proj.title}</h3>
                                    </div>
                                    <p className="text-xl lg:text-3xl font-medium tracking-tight mb-12 leading-[1.3] text-gray-800">
                                        {proj.desc}
                                    </p>
                                    <div className="text-sm font-bold uppercase tracking-widest text-gray-500 flex flex-wrap gap-x-6 gap-y-3">
                                        {proj.tags.map((tag, idx) => (
                                            <span key={idx}>{tag}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="mt-8 lg:mt-0 text-left lg:text-right">
                                    <a href={proj.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-lg font-bold uppercase tracking-widest hover:bg-black hover:text-white px-5 py-3 transition-colors">
                                        GitHub <ArrowUpRight className="w-5 h-5" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* CONTACT */}
                <motion.section
                    id="contact"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="py-32"
                >
                    <div className="text-sm font-bold uppercase tracking-widest mb-6">Let's work</div>
                    <h2 className="text-[3rem] leading-[1] md:text-[5.5rem] lg:text-[7rem] font-black tracking-tighter mb-10 uppercase">
                        Get in touch
                    </h2>
                    <p className="text-xl md:text-3xl font-medium tracking-tight max-w-3xl mb-24 leading-[1.3]">
                        Open to remote full stack and DevOps roles. UTC+3, available for US and European hours.
                    </p>

                    <div className="flex flex-col gap-10 md:gap-16 text-[2rem] md:text-[4rem] lg:text-[6rem] font-black tracking-tighter leading-none break-all">
                        <a href="mailto:dagim.ashenafi.birru@gmail.com" className="hover:opacity-50 transition-opacity w-fit decoration-8 underline-offset-[16px] hover:underline">
                            dagim.ashenafi<br className="md:hidden" />.birru@gmail.com
                        </a>
                        <a href="https://github.com/dagim19" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity w-fit decoration-8 underline-offset-[16px] hover:underline">
                            github.com/dagim19
                        </a>
                        <a href="https://www.linkedin.com/in/dagim-ashenafi-72231b263/" target="_blank" rel="noreferrer" className="hover:opacity-50 transition-opacity w-fit decoration-8 underline-offset-[16px] hover:underline">
                            linkedin.com/in<br className="md:hidden" />/dagim-ashenafi
                        </a>
                        <a href="tel:+251979075546" className="hover:opacity-50 transition-opacity w-fit decoration-8 underline-offset-[16px] hover:underline">
                            +251 979 075 546
                        </a>
                    </div>
                </motion.section>

                {/* FOOTER */}
                <footer className="pt-40 flex flex-col md:flex-row justify-between text-sm font-bold uppercase tracking-widest text-gray-500 gap-4">
                    <div>Built by Dagim Ashenafi</div>
                    <div>Addis Ababa, Ethiopia 🇪🇹</div>
                </footer>
            </main>

            {/* SCREENSHOT LIGHTBOX */}
            <AnimatePresence>
                {activeProject !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
                        onClick={closeModal}
                    >
                        <div className="flex justify-between items-center p-6 md:p-8 text-white" onClick={(e) => e.stopPropagation()}>
                            <div className="flex flex-col gap-1 min-w-0 pr-4">
                                <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                    {clientProjects[activeProject].label} · {clientProjects[activeProject].platform}
                                </div>
                                <div className="text-lg md:text-2xl font-black tracking-tighter uppercase truncate">
                                    {clientProjects[activeProject].title}
                                </div>
                            </div>
                            <button
                                onClick={closeModal}
                                className="shrink-0 p-3 hover:bg-white hover:text-black transition-colors"
                                aria-label="Close"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 flex items-center justify-center px-4 md:px-16 pb-4 min-h-0" onClick={(e) => e.stopPropagation()}>
                            <button
                                onClick={prevShot}
                                className="shrink-0 p-3 md:p-4 text-white hover:bg-white hover:text-black transition-colors"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                            </button>
                            <div className="flex-1 h-full flex items-center justify-center px-2 md:px-8 min-h-0">
                                <img
                                    src={clientProjects[activeProject].screenshots[shotIndex]}
                                    alt={`${clientProjects[activeProject].title} — screenshot ${shotIndex + 1}`}
                                    className="max-h-full max-w-full object-contain border border-white/10"
                                    onError={(e) => {
                                        const target = e.currentTarget;
                                        target.style.display = "none";
                                        const fallback = target.nextElementSibling as HTMLElement | null;
                                        if (fallback) fallback.style.display = "flex";
                                    }}
                                    onLoad={(e) => {
                                        const target = e.currentTarget;
                                        target.style.display = "";
                                        const fallback = target.nextElementSibling as HTMLElement | null;
                                        if (fallback) fallback.style.display = "none";
                                    }}
                                />
                                <div className="hidden flex-col items-center justify-center text-center text-white/60 border border-white/10 border-dashed p-12 max-w-md">
                                    <div className="text-sm font-bold uppercase tracking-widest mb-3">Screenshot not found</div>
                                    <div className="text-xs font-mono break-all">
                                        {clientProjects[activeProject].screenshots[shotIndex]}
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={nextShot}
                                className="shrink-0 p-3 md:p-4 text-white hover:bg-white hover:text-black transition-colors"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                            </button>
                        </div>

                        <div className="p-6 flex justify-center gap-2" onClick={(e) => e.stopPropagation()}>
                            {clientProjects[activeProject].screenshots.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setShotIndex(idx)}
                                    className={`h-1.5 transition-all ${idx === shotIndex ? "w-10 bg-white" : "w-5 bg-white/30 hover:bg-white/60"}`}
                                    aria-label={`Go to screenshot ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
