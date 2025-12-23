// import React, { useMemo, useState, useEffect } from "react";
// import { useMediaQuery } from "react-responsive";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import TextTransition, { presets } from "react-text-transition";
// import { VscNewFile, VscFolderOpened, VscRepoClone, VscDebugAlt, VscCommentDiscussion, VscTerminal } from "react-icons/vsc";
// import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

// const ROLES = [
//     "Software Development Engineer",
//     "Full Stack Developer",
//     "UI/UX Enthusiast",
//     "Creative Problem Solver"
// ];

// const Home = () => {
//     const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });
//     const location = useLocation();
//     const [index, setIndex] = useState(0);

//     // Cycle through roles
//     useEffect(() => {
//         const intervalId = setInterval(() => setIndex((index) => index + 1), 3000);
//         return () => clearInterval(intervalId);
//     }, []);

//     // Load recent links
//     const recentLinks = useMemo(() => {
//         if (typeof window !== "undefined") {
//             const recent = localStorage.getItem("history");
//             try {
//                 return recent ? JSON.parse(recent) : [];
//             } catch {
//                 return [];
//             }
//         }
//         return [];
//     }, [location.pathname]);

//     return (
//         <>
//             <Helmet>
//                 <title>Garvit Dani | VS Code Portfolio</title>
//                 <meta name="description" content="VS code style developer portfolio" />
//             </Helmet>

//             <main className="w-full h-full flex flex-col justify-center items-center text-gray-300 font-sans selection:bg-blue-500 selection:text-white relative overflow-hidden">

//                 {/* Background Grid Pattern */}
//                 <div className="absolute inset-0 pointer-events-none opacity-5"
//                     style={{
//                         backgroundImage: `linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)`,
//                         backgroundSize: '40px 40px'
//                     }}>
//                 </div>

//                 <div className="w-full max-w-6xl p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-16 z-10">

//                     {/* LEFT COLUMN */}
//                     <div className="flex flex-col gap-10">
//                         {/* Header */}
//                         <div className="animate-fade-in-down">
//                             <h1 className="text-6xl md:text-7xl font-thin text-white mb-4 tracking-tighter">
//                                 Garvit <span className="font-bold text-blue-500">Dani</span>
//                             </h1>
//                             <div className="text-2xl text-gray-400 font-light flex gap-2 items-center h-8">
//                                 <span>I am a</span>
//                                 <TextTransition springConfig={presets.gentle} inline>
//                                     <span className="text-blue-400 font-normal">{ROLES[index % ROLES.length]}</span>
//                                 </TextTransition>
//                             </div>
//                         </div>

//                         {/* Start Section - Interactive Cards */}
//                         <div className="flex flex-col gap-4">
//                             <h3 className="text-xl text-gray-500 font-medium uppercase tracking-widest text-xs">Start</h3>

//                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                 <Link to="/Skills" className="group p-4 bg-[#252526] hover:bg-[#2a2d2e] rounded-lg border border-transparent hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 flex items-start gap-3">
//                                     <div className="p-2 bg-blue-500/10 rounded-md text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-transform">
//                                         <VscNewFile size={24} />
//                                     </div>
//                                     <div>
//                                         <span className="block text-gray-200 font-medium group-hover:text-blue-400 transition-colors">New Skill</span>
//                                         <span className="text-xs text-gray-500 mt-1 block">Explore my technical stack & abilities</span>
//                                     </div>
//                                 </Link>

//                                 <Link to="/Projects" className="group p-4 bg-[#252526] hover:bg-[#2a2d2e] rounded-lg border border-transparent hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 flex items-start gap-3">
//                                     <div className="p-2 bg-orange-500/10 rounded-md text-orange-400 group-hover:text-orange-300 group-hover:scale-110 transition-transform">
//                                         <VscFolderOpened size={24} />
//                                     </div>
//                                     <div>
//                                         <span className="block text-gray-200 font-medium group-hover:text-orange-400 transition-colors">Open Project</span>
//                                         <span className="text-xs text-gray-500 mt-1 block">Browse my portfolio projects</span>
//                                     </div>
//                                 </Link>

//                                 <Link to="/GithubStreak" className="group p-4 bg-[#252526] hover:bg-[#2a2d2e] rounded-lg border border-transparent hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 flex items-start gap-3">
//                                     <div className="p-2 bg-green-500/10 rounded-md text-green-400 group-hover:text-green-300 group-hover:scale-110 transition-transform">
//                                         <VscRepoClone size={24} />
//                                     </div>
//                                     <div>
//                                         <span className="block text-gray-200 font-medium group-hover:text-green-400 transition-colors">Clone Repos</span>
//                                         <span className="text-xs text-gray-500 mt-1 block">Check my Github stats & streaks</span>
//                                     </div>
//                                 </Link>

//                                 <Link to="/Experience" className="group p-4 bg-[#252526] hover:bg-[#2a2d2e] rounded-lg border border-transparent hover:border-blue-500/50 transition-all duration-300 shadow-lg hover:shadow-blue-500/10 flex items-start gap-3">
//                                     <div className="p-2 bg-purple-500/10 rounded-md text-purple-400 group-hover:text-purple-300 group-hover:scale-110 transition-transform">
//                                         <VscDebugAlt size={24} />
//                                     </div>
//                                     <div>
//                                         <span className="block text-gray-200 font-medium group-hover:text-purple-400 transition-colors">Run & Debug</span>
//                                         <span className="text-xs text-gray-500 mt-1 block">View my work experience</span>
//                                     </div>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>

//                     {/* RIGHT COLUMN */}
//                     <div className="flex flex-col gap-10 md:pt-8">

//                         {/* RECENT - TERMINAL STYLE */}
//                         <div className="flex flex-col gap-4">
//                             <h3 className="text-xl text-gray-500 font-medium uppercase tracking-widest text-xs flex items-center gap-2">
//                                 <VscTerminal /> Terminal - Recent Activity
//                             </h3>

//                             <div className="w-full bg-[#1e1e1e] rounded-lg border border-[#333] p-4 font-mono text-sm shadow-2xl relative overflow-hidden group">
//                                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20"></div>

//                                 <div className="flex flex-col gap-3 min-h-[200px]">
//                                     {recentLinks.length < 1 ? (
//                                         <div className="text-gray-500">
//                                             <span className="text-green-500">➜</span> <span className="text-blue-400">~</span> No recent activity found...
//                                         </div>
//                                     ) : (
//                                         recentLinks.map((item, idx) => (
//                                             <Link to={item} key={idx} className="block hover:bg-[#2d2d2d] -mx-2 px-2 py-1 rounded transition-colors">
//                                                 <div className="flex items-center gap-2 truncate">
//                                                     <span className="text-green-500">➜</span>
//                                                     <span className="text-blue-400">~</span>
//                                                     <span className="text-gray-300">cd</span>
//                                                     <span className="text-yellow-300"> E:/GarvitDani{item}</span>
//                                                 </div>
//                                                 <div className="ml-6 text-gray-500 text-xs mt-0.5">
//                                                     [INFO] Opening {item.replace('/', '')}...
//                                                 </div>
//                                             </Link>
//                                         ))
//                                     )}

//                                     {/* Blinking Cursor */}
//                                     <div className="mt-auto pt-2 flex items-center gap-2">
//                                         <span className="text-green-500">➜</span>
//                                         <span className="text-blue-400">~</span>
//                                         <span className="w-2.5 h-5 bg-gray-400 animate-pulse block"></span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* HELP / ABOUT */}
//                         <div className="flex flex-col gap-3">
//                             <h3 className="text-[11px] text-[#858585] font-medium uppercase tracking-widest">
//                                 Help & Connect
//                             </h3>

//                             <div className="flex flex-wrap gap-2">
//                                 {/* GitHub */}
//                                 <a
//                                     href="https://github.com/SRX9"
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="
//                 flex items-center gap-2
//                 px-3 py-1.5
//                 text-[12px]
//                 text-[#cccccc]
//                 bg-[#252526]
//                 border border-[#3c3c3c]
//                 rounded
//                 hover:bg-[#2a2d2e]
//                 hover:border-[#007acc]
//                 transition-all
//             "
//                                 >
//                                     <FaGithub className="text-[#cccccc]" />
//                                     GitHub
//                                 </a>

//                                 {/* LinkedIn */}
//                                 <a
//                                     href="https://www.linkedin.com/in/savaliya-raj"
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="
//                 flex items-center gap-2
//                 px-3 py-1.5
//                 text-[12px]
//                 text-[#9cdcfe]
//                 bg-[#252526]
//                 border border-[#3c3c3c]
//                 rounded
//                 hover:bg-[#2a2d2e]
//                 hover:border-[#007acc]
//                 transition-all
//             "
//                                 >
//                                     <FaLinkedin />
//                                     LinkedIn
//                                 </a>

//                                 {/* Twitter */}
//                                 <a
//                                     href="https://twitter.com/s_r_x_9"
//                                     target="_blank"
//                                     rel="noreferrer"
//                                     className="
//                 flex items-center gap-2
//                 px-3 py-1.5
//                 text-[12px]
//                 text-[#4fc1ff]
//                 bg-[#252526]
//                 border border-[#3c3c3c]
//                 rounded
//                 hover:bg-[#2a2d2e]
//                 hover:border-[#007acc]
//                 transition-all
//             "
//                                 >
//                                     <FaTwitter />
//                                     Twitter
//                                 </a>

//                                 {/* Contact */}
//                                 <Link
//                                     to="/Email"
//                                     className="
//                 flex items-center gap-2
//                 px-3 py-1.5
//                 text-[12px]
//                 text-[#ffffff]
//                 bg-[#007acc]/90
//                 border border-[#007acc]
//                 rounded
//                 hover:bg-[#0090f1]
//                 transition-all
//             "
//                                 >
//                                     <VscCommentDiscussion />
//                                     Contact
//                                 </Link>
//                             </div>
//                         </div>


//                     </div>
//                 </div>
//             </main>
//         </>
//     );
// };

// export default Home;




import React, { useMemo, useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import TextTransition, { presets } from "react-text-transition";
import {
    VscNewFile,
    VscFolderOpened,
    VscRepoClone,
    VscDebugAlt,
    VscCommentDiscussion,
    VscTerminal
} from "react-icons/vsc";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const ROLES = [
    "Software Development Engineer",
    "Full Stack Developer",
    "UI/UX Enthusiast",
    "Creative Problem Solver"
];

const startItems = [
    {
        to: "/Skills",
        icon: <VscNewFile size={22} />,
        title: "New Skill",
        desc: "Explore my technical stack",
        accent: {
            bg: "bg-blue-500/10",
            text: "text-blue-400"
        }
    },
    {
        to: "/Projects",
        icon: <VscFolderOpened size={22} />,
        title: "Open Project",
        desc: "Browse my portfolio work",
        accent: {
            bg: "bg-orange-500/10",
            text: "text-orange-400"
        }
    },
    {
        to: "/GithubStreak",
        icon: <VscRepoClone size={22} />,
        title: "Clone Repos",
        desc: "GitHub stats & streaks",
        accent: {
            bg: "bg-green-500/10",
            text: "text-green-400"
        }
    },
    {
        to: "/Experience",
        icon: <VscDebugAlt size={22} />,
        title: "Run & Debug",
        desc: "Professional experience",
        accent: {
            bg: "bg-purple-500/10",
            text: "text-purple-400"
        }
    }
];

const Home = () => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });
    const location = useLocation();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setIndex(i => i + 1), 3000);
        return () => clearInterval(interval);
    }, []);

    const recentLinks = useMemo(() => {
        if (typeof window !== "undefined") {
            try {
                return JSON.parse(localStorage.getItem("history")) || [];
            } catch {
                return [];
            }
        }
        return [];
    }, [location.pathname]);

    return (
        <>
            <Helmet>
                <title>Garvit Dani | Portfolio</title>
                <meta
                    name="description"
                    content="VS Code styled portfolio of a full stack developer"
                />
            </Helmet>

            <main className="relative w-full h-full overflow-y-auto text-gray-300">

                {/* Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none fixed"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />

                <div className="relative z-10 w-full max-w-6xl px-6 py-6 mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* LEFT */}
                    <div className="flex flex-col gap-10">

                        {/* HERO */}
                        <div>
                            <h1 className="text-6xl md:text-7xl font-thin text-white tracking-tight">
                                Garvit{" "}
                                <span className="font-semibold text-blue-500">
                                    Dani
                                </span>
                            </h1>

                            <div className="mt-4 flex flex-col gap-3">
                                <div className="text-2xl text-gray-400 flex gap-2 items-center h-8">
                                    <span>I am a</span>
                                    <TextTransition
                                        springConfig={presets.gentle}
                                        inline
                                    >
                                        <span className="text-blue-400">
                                            {ROLES[index % ROLES.length]}
                                        </span>
                                    </TextTransition>
                                </div>

                                <p className="text-sm text-gray-500 max-w-xl leading-relaxed">
                                    I build scalable full stack applications
                                    with clean architecture, intuitive UI, and
                                    production-ready performance.
                                </p>

                                <div className="flex flex-wrap gap-2 text-xs">
                                    {["MERN Stack", "System Design", "UI/UX Focused"].map(
                                        tech => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-[#252526] border border-[#3c3c3c] rounded"
                                            >
                                                {tech}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* START */}
                          <div className="flex flex-col gap-4">
        {/* Section Label */}
        <h3 className="text-[11px] uppercase tracking-widest text-[#858585]">
            Start
        </h3>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {startItems.map(item => (
                <Link
                    key={item.title}
                    to={item.to}
                    className="
                        group
                        flex gap-3
                        p-4
                        rounded-lg
                        bg-[#252526]/90
                        backdrop-blur
                        border border-[#3c3c3c]
                        hover:bg-[#2a2d2e]
                        hover:border-[#007acc]/60
                        hover:shadow-[0_0_0_1px_rgba(0,122,204,0.35)]
                        transition-all duration-200
                    "
                >
                    {/* Icon */}
                    <div
                        className={`
                            p-2 rounded-md
                            ${item.accent.bg}
                            ${item.accent.text}
                            group-hover:scale-110
                            transition-transform
                        `}
                    >
                        {item.icon}
                    </div>

                    {/* Text */}
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-200 group-hover:text-white transition-colors">
                            {item.title}
                        </span>
                        <span className="text-xs text-gray-500 leading-snug">
                            {item.desc}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex flex-col gap-10 md:pt-8">

                        {/* TERMINAL */}
                        <div className="flex flex-col gap-4">
                            <h3 className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#858585]">
                                <VscTerminal /> Terminal — Recent Activity
                            </h3>

                            <div className="bg-[#1e1e1e] rounded-lg border border-[#333] p-4 font-mono text-sm shadow-2xl">

                                {/* Terminal Header */}
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-3 h-3 rounded-full bg-red-500/70" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                    <span className="w-3 h-3 rounded-full bg-green-500/70" />
                                    <span className="ml-2 text-xs text-gray-500">
                                        powershell — portfolio
                                    </span>
                                </div>

                                <div className="flex flex-col gap-3 min-h-[200px]">
                                    {recentLinks.length === 0 ? (
                                        <div className="text-gray-500">
                                            <span className="text-green-500">➜</span>{" "}
                                            <span className="text-blue-400">~</span>{" "}
                                            No recent activity...
                                        </div>
                                    ) : (
                                        recentLinks.map((item, i) => (
                                            <Link
                                                key={i}
                                                to={item}
                                                className="hover:bg-[#2d2d2d] px-2 py-1 rounded"
                                            >
                                                <span className="text-green-500">➜</span>{" "}
                                                <span className="text-blue-400">~</span>{" "}
                                                cd <span className="text-yellow-300">E:/GarvitDani{item}</span>
                                            </Link>
                                        ))
                                    )}

                                    <div className="mt-2 flex items-center pl-2 gap-2">
                                        <span className="text-green-500">➜</span>
                                        <span className="text-blue-400">~</span>
                                        <span className="w-2 h-5 bg-gray-400 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SOCIAL */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-[11px] text-[#858585] font-medium uppercase tracking-widest">
                                Help & Connect
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {/* GitHub */}
                                <a
                                    href="https://github.com/SRX9"
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
                                    href="https://www.linkedin.com/in/savaliya-raj"
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

                                {/* Twitter */}
                                <a
                                    href="https://twitter.com/s_r_x_9"
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
                                    <FaTwitter />
                                    Twitter
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

                    </div>
                </div>


            </main>
        </>
    );
};

export default Home;
