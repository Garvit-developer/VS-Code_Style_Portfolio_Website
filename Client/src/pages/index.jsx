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
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

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
                            <div className="text-5xl sm:text-6xl md:text-7xl pt-2 md:pt-4 font-thin text-white tracking-tight">
                                Garvit{" "}
                                <span className="font-semibold text-blue-500">
                                    Dani
                                </span>
                            </div>

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
                                    {["MERN Stack", "UI/UX Enthusiast"].map(
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
                            h-10
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

                    </div>
                </div>


            </main>
        </>
    );
};

export default Home;
