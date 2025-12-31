import React, { useMemo, useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import TextTransition, { presets } from "react-text-transition";
import { motion, AnimatePresence } from "framer-motion";
import {
    VscNewFile,
    VscFolderOpened,
    VscRepoClone,
    VscDebugAlt,
    VscCommentDiscussion,
    VscTerminal,
    VscCode,
    VscSymbolInterface,
    VscAzure,
    VscDatabase
} from "react-icons/vsc";
import { FaLinkedin, FaGithub, FaEnvelope, FaReact, FaNodeJs, FaJs } from "react-icons/fa";

const ROLES = [
    "Software Developer",
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Problem Solver"
];

const startItems = [
    {
        to: "/Skills",
        icon: <VscNewFile size={22} />,
        title: "New Skill",
        desc: "Explore my technical stack",
        accent: {
            bg: "bg-[#222222]",
            text: "text-blue-400",
            glow: "blue"
        }
    },
    {
        to: "/Projects",
        icon: <VscFolderOpened size={22} />,
        title: "Open Project",
        desc: "Browse my portfolio work",
        accent: {
            bg: "bg-[#222222]",
            text: "text-orange-400",
            glow: "orange"
        }
    },
    {
        to: "/GithubStreak",
        icon: <VscRepoClone size={22} />,
        title: "Clone Repos",
        desc: "GitHub stats & streaks",
        accent: {
            bg: "bg-[#222222]",
            text: "text-green-400",
            glow: "green"
        }
    },
    {
        to: "/Experience",
        icon: <VscDebugAlt size={22} />,
        title: "Run & Debug",
        desc: "Professional experience",
        accent: {
            bg: "bg-[#222222]",
            text: "text-[#6750c4]",
            glow: "purple-900"
        }
    }
];

// --- Sub-components for better organization ---




const TerminalLine = ({ text, delay = 0, color = "text-gray-300" }) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedText(text.slice(0, i));
                i++;
                if (i > text.length) clearInterval(interval);
            }, 30);
            return () => clearInterval(interval);
        }, delay);
        return () => clearTimeout(timeout);
    }, [text, delay]);

    return (
        <div className={`font-mono text-xs ${color} flex gap-2`}>
            <span className="text-green-500 shrink-0">➜</span>
            <span className="text-blue-400 shrink-0">~</span>
            <span>{displayedText}<span className="caret"></span></span>
        </div>
    );
};

// const AntigravityBackground = () => {
//     const canvasRef = useRef(null);
//     const containerRef = useRef(null);
//     const mouse = useRef({ x: -9999, y: -9999 });

//     useEffect(() => {
//         const canvas = canvasRef.current;
//         const ctx = canvas.getContext("2d");
//         let animationFrameId;
//         let particles = [];
//         let dpr = window.devicePixelRatio || 1;

//         const resize = () => {
//             if (!containerRef.current) return;

//             const { clientWidth, clientHeight } = containerRef.current;

//             canvas.width = clientWidth * dpr;
//             canvas.height = clientHeight * dpr;
//             canvas.style.width = `${clientWidth}px`;
//             canvas.style.height = `${clientHeight}px`;

//             ctx.scale(dpr, dpr);
//             initParticles(clientWidth, clientHeight);
//         };

//         const initParticles = (w, h) => {
//             particles = [];
//             const spacing = 40;

//             for (let x = 0; x <= w; x += spacing) {
//                 for (let y = 0; y <= h; y += spacing) {
//                     particles.push({
//                         baseX: x,
//                         baseY: y,
//                         x,
//                         y,
//                         vx: 0,
//                         vy: 0,
//                         size: 1.2,
//                         opacity: 0.4
//                     });
//                 }
//             }
//         };

//         const handleMouseMove = (e) => {
//             if (!containerRef.current) return;

//             const rect = containerRef.current.getBoundingClientRect();
//             mouse.current.x = e.clientX - rect.left;
//             mouse.current.y = e.clientY - rect.top;
//         };

//         const draw = () => {
//             ctx.clearRect(0, 0, canvas.width, canvas.height);

//             particles.forEach((p) => {
//                 const dx = p.x - mouse.current.x;
//                 const dy = p.y - mouse.current.y;
//                 const dist = Math.sqrt(dx * dx + dy * dy);

//                 const radius = 60;
//                 const force = Math.max(0, (radius - dist) / radius);

//                 if (dist < radius) {
//                     const angle = Math.atan2(dy, dx);
//                     const repel = force * 28;

//                     p.vx += Math.cos(angle) * repel;
//                     p.vy += Math.sin(angle) * repel;

//                     p.size = 1.7 + force * 1.6;
//                     p.opacity = 0.9;
//                 } else {
//                     p.opacity = 0.30;
//                 }

//                 // Return to base (spring effect)
//                 p.vx += (p.baseX - p.x) * 0.01;
//                 p.vy += (p.baseY - p.y) * 0.01;

//                 // Less damping = quicker response
//                 p.vx *= 0.82;  // was 0.88
//                 p.vy *= 0.82;

//                 p.x += p.vx;
//                 p.y += p.vy;

//                 // VS Code blue glow
//                 ctx.beginPath();
//                 ctx.fillStyle = `rgba(79, 193, 255, ${p.opacity})`;
//                 ctx.shadowColor = "rgba(79, 193, 255, 0.6)";
//                 ctx.shadowBlur = 8;
//                 ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//                 ctx.fill();
//             });

//             ctx.shadowBlur = 0;
//             animationFrameId = requestAnimationFrame(draw);
//         };

//         resize();
//         draw();

//         const resizeObserver = new ResizeObserver(resize);
//         resizeObserver.observe(containerRef.current);

//         window.addEventListener("mousemove", handleMouseMove);

//         return () => {
//             cancelAnimationFrame(animationFrameId);
//             resizeObserver.disconnect();
//             window.removeEventListener("mousemove", handleMouseMove);
//         };
//     }, []);

//     return (
//         <div
//             ref={containerRef}
//             className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
//         >
//             <canvas
//                 ref={canvasRef}
//                 className="opacity-50 bg-transparent"
//             />
//         </div>
//     );
// };

const AntigravityBackground = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const mouse = useRef({ x: -9999, y: -9999 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let animationFrameId;
        let particles = [];
        let dpr = window.devicePixelRatio || 1;

        const resize = () => {
            if (!containerRef.current) return;

            const { clientWidth, clientHeight } = containerRef.current;

            canvas.width = clientWidth * dpr;
            canvas.height = clientHeight * dpr;
            canvas.style.width = `${clientWidth}px`;
            canvas.style.height = `${clientHeight}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // IMPORTANT reset scale
            initParticles(clientWidth, clientHeight);
        };

        const initParticles = (w, h) => {
            particles = [];
            const spacing = 40;

            for (let x = 0; x <= w; x += spacing) {
                for (let y = 0; y <= h; y += spacing) {
                    particles.push({
                        baseX: x,
                        baseY: y,
                        x,
                        y,
                        vx: 0,
                        vy: 0,
                        baseSize: 1.2,   // 👈 original size stored
                        size: 1.2,
                        opacity: 0.35
                    });
                }
            }
        };

        const handleMouseMove = (e) => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                const dx = p.x - mouse.current.x;
                const dy = p.y - mouse.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                const radius = 60;
                const force = Math.max(0, (radius - dist) / radius);

                if (dist < radius) {
                    const angle = Math.atan2(dy, dx);
                    const repel = force * 28;

                    p.vx += Math.cos(angle) * repel;
                    p.vy += Math.sin(angle) * repel;

                    // Smooth size grow
                    const targetSize = p.baseSize + force * 2;
                    p.size += (targetSize - p.size) * 0.25;

                    p.opacity = 0.9;
                } else {
                    // Smooth size restore 👈 FIX
                    p.size += (p.baseSize - p.size) * 0.12;
                    p.opacity += (0.3 - p.opacity) * 0.1;
                }

                // Spring back to grid
                p.vx += (p.baseX - p.x) * 0.01;
                p.vy += (p.baseY - p.y) * 0.01;

                // Damping
                p.vx *= 0.82;
                p.vy *= 0.82;

                p.x += p.vx;
                p.y += p.vy;

                // Draw particle (VS Code blue)
                ctx.beginPath();
                ctx.fillStyle = `rgba(79, 193, 255, ${p.opacity})`;
                ctx.shadowColor = "rgba(79, 193, 255, 0.6)";
                ctx.shadowBlur = 8;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });

            ctx.shadowBlur = 0;
            animationFrameId = requestAnimationFrame(draw);
        };

        resize();
        draw();

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(containerRef.current);

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        >
            <canvas
                ref={canvasRef}
                className="opacity-50 bg-transparent"
            />
        </div>
    );
};

const Home = () => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });
    const location = useLocation();
    const [roleIndex, setRoleIndex] = useState(0);
    const [booted, setBooted] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => setRoleIndex(i => i + 1), 3000);
        const bootTimer = setTimeout(() => setBooted(true), 500);
        return () => {
            clearInterval(interval);
            clearTimeout(bootTimer);
        };
    }, []);

    const recentLinks = useMemo(() => {
        if (typeof window !== "undefined") {
            try {
                return JSON.parse(localStorage.getItem("history")) || [];
            } catch { return []; }
        }
        return [];
    }, [location.pathname]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <>
            <Helmet>
                <title>Garvit Dani | Portfolio</title>
                <meta name="description" content="Premium VS Code styled portfolio of a full stack developer" />
            </Helmet>

            <div className="relative w-full min-h-[90vh] text-gray-300 overflow-x-hidden scrollbar-none">
                <AntigravityBackground />

                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 w-full max-w-6xl px-6 py-2 mx-auto grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                    {/* LEFT PANEL */}
                    <div className="flex flex-col gap-10 pl-4 pt-3">
                        {/* HERO */}
                        <motion.div variants={itemVariants}>
                            <h1 className="text-5xl sm:text-5xl md:text-6xl font-thin text-white tracking-tight leading-tight">
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    Garvit{" "}
                                </motion.span>
                                <motion.span
                                    className="font-semibold text-blue-500 inline-block drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                                    animate={{
                                        color: ["#3b82f6", "#60a5fa", "#3b82f6"]
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    Dani
                                </motion.span>
                            </h1>

                            <div className="mt-6 flex flex-col gap-4">
                                <div className="text-2xl text-gray-400 flex gap-2 items-center h-8 font-light">
                                    <span>I am a</span>
                                    <TextTransition springConfig={presets.gentle} inline>
                                        <span className="text-blue-400 font-medium">
                                            {ROLES[roleIndex % ROLES.length]}
                                        </span>
                                    </TextTransition>
                                </div>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-base text-gray-400 max-w-xl leading-relaxed"
                                >
                                    Full Stack Developer specializing in high-performance MERN applications,
                                    intuitive UI/UX design, and scalable Web solutions.
                                </motion.p>

                                <div className="flex flex-wrap gap-2 text-[10px] uppercase font-bold tracking-widest mt-2">
                                    {["MERN Stack", "Cloud Native", "UI/UX"].map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-[#252526] border border-[#3c3c3c] rounded-full text-blue-400/80">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* START SECTION */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-6 ">
                            <h3 className="text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold ">
                                Initializing Core Modules...
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mr-5 md:mr-14">
                                {startItems.map((item) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Link
                                            to={item.to}
                                            className="
                        group relative flex items-center gap-4
                        px-3 py-2
                        rounded-lg
                        bg-[#252526]
                        border border-[#3c3c3c]
                        hover:border-[#007acc]
                        hover:bg-[#2d2d30]
                        transition-all duration-200
                        focus:outline-none focus:ring-1 focus:ring-[#007acc]
                    "
                                        >
                                            {/* Icon container — USE ORIGINAL COLORS */}
                                            <div
                                                className={`
                            flex items-center justify-center
                            w-9 h-9
                            rounded-md
                            border border-[#3c3c3c]
                            ${item.accent.bg}
                            ${item.accent.text}
                            group-hover:border-[#007acc]
                            transition-all duration-200
                        `}
                                            >
                                                {item.icon}
                                            </div>

                                            {/* Text */}
                                            <div className="flex flex-col leading-tight">
                                                <span className="text-[13px] font-medium text-[#d4d4d4]">
                                                    {item.title}
                                                </span>
                                                <span className="text-[11px] text-[#9da1a6]">
                                                    {item.desc}
                                                </span>
                                            </div>

                                            {/* VS Code left hover indicator */}
                                            <span
                                                className="
                            absolute left-0 top-0 h-full w-[2px]
                            bg-[#007acc]
                            opacity-0 group-hover:opacity-100
                            transition-opacity
                        "
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                    </div>

                    {/* RIGHT PANEL */}
                    <div className="flex flex-col gap-6 md:pt-4">
                        {/* TERMINAL ENHANCED */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-4 hidden md:block">
                            <h3 className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#858585] font-bold">
                                <VscTerminal className="text-blue-500" /> Executive Console
                            </h3>

                            <div className="bg-[#1e1e1e]/90 backdrop-blur-lg mr-5 md:mr-10 rounded-xl border border-[#333] p-4 font-mono text-sm  relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-50" />

                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/50 group-hover:bg-red-500 transition-colors" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/50 group-hover:bg-yellow-500 transition-colors" />
                                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/50 group-hover:bg-green-500 transition-colors" />
                                    </div>
                                    <span className="ml-3 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                                        node_engine — garvit_dani
                                    </span>
                                </div>

                                <div className="flex flex-col gap-2 min-h-[225px]">
                                    {booted && (
                                        <>
                                            <TerminalLine text="Initializing Garvit_Dani_Portfolio_v2.0..." delay={0} color="text-blue-400" />
                                            <TerminalLine text="Loading developer_persona... SUCCESS" delay={1500} color="text-green-400" />

                                            <div className="mt-3 flex flex-col gap-1.5">
                                                {recentLinks.length > 0 ? (
                                                    recentLinks.map((item, i) => (
                                                        <Link key={i} to={item} className="group/link flex items-center gap-2 text-xs hover:bg-white/5 px-2 py-1 rounded transition-all">
                                                            <span className="text-green-500">➜</span>
                                                            <span className="text-blue-400">~</span>
                                                            <span className="text-gray-400">cd</span>
                                                            <span className="text-yellow-300 group-hover/link:text-yellow-100 italic transition-colors">
                                                                E:/GarvitDani{item}
                                                            </span>
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <div className="text-gray-500 text-xs italic px-2">Waiting for user interaction...</div>
                                                )}
                                            </div>

                                            <div className=" pt-2 flex items-center pl-2 gap-1">
                                                <span className="text-green-500">➜</span>
                                                <span className="text-blue-400">~</span>
                                                <span className="w-1.5 h-4 bg-blue-500 animate-pulse shadow-[0_0_5px_#3b82f6]" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* SOCIAL & CONNECT */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-4 pmd:pb-6 ">
                            <div className="flex flex-col gap-3">
                                <h3 className="text-[11px] text-[#858585] font-medium uppercase tracking-widest">
                                    Help & Connect
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {/* GitHub */}
                                    <a
                                        href="https://github.com/Garvit-developer"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                flex items-center gap-2
                px-3 py-1.5
                text-[12px]
                text-[#cccccc]
                bg-[#252526]
                border border-[#3c3c3c]
                rounded
                hover:bg-[#2a2d2e]
                hover:border-[#007acc]
                transition-all
            "
                                    >
                                        <FaGithub className="text-[#cccccc]" />
                                        GitHub
                                    </a>

                                    {/* LinkedIn */}
                                    <a
                                        href="https://www.linkedin.com/in/garvit-dani-865924318/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                flex items-center gap-2
                px-3 py-1.5
                text-[12px]
                text-[#9cdcfe]
                bg-[#252526]
                border border-[#3c3c3c]
                rounded
                hover:bg-[#2a2d2e]
                hover:border-[#007acc]
                transition-all
            "
                                    >
                                        <FaLinkedin />
                                        LinkedIn
                                    </a>

                                    <a
                                        href="https://mail.google.com/mail/?view=cm&fs=1&to=garvitdani@gmail.com"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
    flex items-center gap-2
    px-3 py-1.5
    text-[12px]
    text-[#4fc1ff]
    bg-[#252526]
    border border-[#3c3c3c]
    rounded
    hover:bg-[#2a2d2e]
    hover:border-[#007acc]
    transition-all
  "
                                    >
                                        <FaEnvelope />
                                        Email
                                    </a>


                                    {/* Contact */}
                                    <Link
                                        to="/Email"
                                        className="
                flex items-center gap-2
                px-3 py-1.5
                text-[12px]
                text-[#ffffff]
                bg-[#007acc]/90
                border border-[#007acc]
                rounded
                hover:bg-[#0090f1]
                transition-all
            "
                                    >
                                        <VscCommentDiscussion />
                                        Contact
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default Home;
