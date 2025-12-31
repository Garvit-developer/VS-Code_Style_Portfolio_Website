import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
import { FaReact } from "react-icons/fa";

// Initial set of tabs (simulating a "session")
// Initial set of tabs
const TABS = [
    { path: "/", title: "index.jsx" },
    { path: "/skills", title: "Skills.jsx" },
    { path: "/projects", title: "Projects.jsx" },
    { path: "/experience", title: "Experience.jsx" },
    { path: "/myvision", title: "MyVision.jsx" },
    { path: "/github-streak", title: "GithubStreak.jsx" },
    { path: "/gaming", title: "Gaming.jsx" },
    { path: "/learning", title: "Learning.jsx" },
    { path: "/email", title: "Email.jsx" },
];

const TabItem = ({ tab, isActive, onClick, onClose }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`
                flex items-center gap-2 px-3
                cursor-pointer 
                min-w-fit
                h-[26px]
                transition-colors
                border-r border-[#30363d]
                ${isActive
                    ? "bg-[#1e1e1e] text-white border-t border-t-[#3b82f6] "
                    : "bg-[#181818] text-[#969696] hover:bg-[#2a2d2e] border-t border-t-transparent border-b border-[#30363d]"
                }
            `}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <FaReact size={12} className="text-[#4fc1ff]" />

            <div className="flex flex-col relative top-[0.5px]">
                <span className={`text-[12px] ${isActive ? "text-[#e8eaed]" : "text-[#969696]"} font-light tracking-wide`}>
                    {tab.title}
                </span>
            </div>

            {/* Close Button / Dot Logic */}
            <div
                className={`
                    w-6 h-6 flex items-center justify-center rounded-md  z-10
                    ${isHovered ? "hover:bg-[#464646]" : ""} 
                    transition-all
                `}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onClose(e);
                }}
            >
                {isActive || isHovered ? (
                    <VscClose size={12} className={isActive ? "text-[#e8eaed]" : "text-[#cccccc]"} />
                ) : (
                    <div className="w-0 h-0" ></div>
                )}
            </div>
        </div>
    );
};

const EditorTabBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scrollRef = useRef(null);

    // Initialize from localStorage or default to index
    const [openPaths, setOpenPaths] = useState(() => {
        const saved = localStorage.getItem("openTabs");
        if (saved) {
            try {
                return new Set(JSON.parse(saved));
            } catch (e) {
                return new Set([TABS[0].path]);
            }
        }
        return new Set([TABS[0].path]);
    });

    // Persistent storage
    useEffect(() => {
        localStorage.setItem("openTabs", JSON.stringify([...openPaths]));
    }, [openPaths]);

    // Mouse wheel horizontal scroll logic
    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            const onWheel = (e) => {
                if (e.deltaY === 0) return;
                e.preventDefault();
                el.scrollTo({
                    left: el.scrollLeft + e.deltaY,
                    behavior: "auto",
                });
            };
            el.addEventListener("wheel", onWheel, { passive: false });
            return () => el.removeEventListener("wheel", onWheel);
        }
    }, []);

    useEffect(() => {
        const currentPath = location.pathname.toLowerCase().replace(/\/$/, ""); // Normalize path

        const matchingTab = TABS.find(tab => {
            const tabPath = tab.path.toLowerCase().replace(/\/$/, "");
            if (tabPath === "" && currentPath === "") return true;
            if (tabPath === "") return false;
            return currentPath === tabPath || currentPath.startsWith(tabPath + "/");
        });

        if (matchingTab) {
            setOpenPaths(prev => {
                const next = new Set(prev);
                next.add(matchingTab.path);
                return next;
            });
        }
    }, [location.pathname]);

    // Derive openTabs from the master TABS array to maintain fixed order
    const openTabs = TABS.filter(tab => openPaths.has(tab.path));

    const handleTabClick = (path) => {
        navigate(path);
    };

    const handleTabClose = (e, path) => {
        e.stopPropagation();

        const newPaths = new Set(openPaths);
        newPaths.delete(path);
        setOpenPaths(newPaths);

        // If closing the active tab, navigate to another one
        const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");
        const tabPath = path.toLowerCase().replace(/\/$/, "");
        const isActive = currentPath === tabPath || (tabPath !== "" && currentPath.startsWith(tabPath + "/"));

        if (isActive) {
            const remainingTabs = TABS.filter(tab => newPaths.has(tab.path));
            if (remainingTabs.length > 0) {
                const closedTabIndex = TABS.filter(tab => openPaths.has(tab.path)).findIndex(t => t.path === path);
                const nextTab = remainingTabs[closedTabIndex - 1] || remainingTabs[0];
                navigate(nextTab.path);
            } else {
                navigate("/");
            }
        }
    };

    return (
        <div
            ref={scrollRef}
            className="hidden md:flex bg-[#252526] h-[27px] overflow-x-auto w-full items-end select-none scrollbar-none  p-0"
        >
            {openTabs.map((tab) => {
                const currentPath = location.pathname.toLowerCase().replace(/\/$/, "");
                const tabPath = tab.path.toLowerCase().replace(/\/$/, "");
                const isActive = (tabPath === "" && currentPath === "") || (tabPath !== "" && (currentPath === tabPath || currentPath.startsWith(tabPath + "/")));

                return (
                    <TabItem
                        key={tab.path}
                        tab={tab}
                        isActive={isActive}
                        onClick={() => handleTabClick(tab.path)}
                        onClose={(e) => handleTabClose(e, tab.path)}
                    />
                );
            })}
        </div>
    );
};

export default EditorTabBar;


