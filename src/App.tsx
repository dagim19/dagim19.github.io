import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
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
                                company: "Enterprise Client (Confidential)",
                                role: "Full Stack Developer & Solutions Architect",
                                badge: "Contract",
                                bullets: [
                                    "Designed overall system architecture across mobile and web platforms",
                                    "Built React Native mobile application, leading development with minimal external support",
                                    "Developed Next.js admin dashboard with Fastify backend",
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
        </div>
    );
}
