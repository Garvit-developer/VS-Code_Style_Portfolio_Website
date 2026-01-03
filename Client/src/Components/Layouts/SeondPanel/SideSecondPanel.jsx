import React, { useEffect, useState } from "react";
import { DownIcon, RightIcon } from "../../SVG/IconsSVG";
import SidePanelSubLink from "./SidePanelSubLink";
import { useMediaQuery } from "react-responsive";
import { useNavigate, useLocation } from "react-router-dom";

// Route filename mapping
const routeMap = {
    experience: "experience.js",
    skills: "skills.css",
    projects: "projects.ts",
    "github-streak": "GithubStreak",
    myvision: "vision.md",
    email: "Email",
    gaming: "Gaming",
    learning: "Learning",
    "": "index.html",
    undefined: "index.html",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
};

// MENU STRUCTURE
const menuData = [
    {
        key: "about",
        title: "About",
        items: [
            { name: "index.html", link: "/", icon: "icons8-html-5" },
            { name: "skills.css", link: "/skills", icon: "icons8-css3" },
            { name: "experience.js", link: "/experience", icon: "icons8-javascript" },
            { name: "projects.ts", link: "/projects", icon: "icons8-typescript" },
            { name: "resume.jsx", link: "/resume", icon: "icons8-react" },
            { name: "vision.md", link: "/myvision", icon: "icons8-readme" },
        ],
    },
    {
        key: "projects",
        title: "Side Projects",
        items: [
            { id: "1", name: "Geektheo.js", link: "/Projects/1", icon: "icons8-nodejs" },
            { id: "2", name: "Skilledu.jsx", link: "/Projects/2", icon: "icons8-react" },
            { id: "3", name: "Taskly-Pro.js", link: "/Projects/3", icon: "icons8-angularjs" },
            { id: "4", name: "Bhasha-Setu.jsx", link: "/Projects/4", icon: "icons8-react" },
            { id: "5", name: "Secure-Stack.js", link: "/Projects/5", icon: "icons8-nodejs" },
            { id: "6", name: "SimonSaysGame.jsx", link: "/Projects/6", icon: "icons8-react" },
        ],
    },
    {
        key: "contact",
        title: "Contact",
        items: [
            { id: "Email", name: "Email.tsx", link: "/email", icon: "icons8-gmail" },
        ],
    },
    {
        key: "misc",
        title: "Misc",
        items: [
            { id: "GithubStreak", name: "GithubStreak.md", link: "/github-streak", icon: "icons8-github" },
            { id: "Gaming", name: "Gaming.cs", link: "/gaming", icon: "icons8-c-sharp" },
            { id: "Learning", name: "Learning.js", link: "/learning", icon: "icons8-angularjs" },
        ],
    },
];

const MenuSection = ({ section, isOpen, onToggle, navigate, activeCurrentSubLink }) => {
    return (
        <div className="menu-drop pt-0.5">
            <div className="box-click">
                <div
                    className="flex pl-1 cursor-pointer"
                    onClick={() => onToggle(section.key)}
                >
                    <div className="myweight flex-min topPadd">
                        {!isOpen ? <DownIcon /> : <RightIcon />}
                    </div>
                    <span className="myweight flex-auto">{section.title}</span>
                </div>

                {!isOpen && (
                    <div className="show-pre">
                        <ul>
                            {section.items.map((item, i) => {
                                const currentKey = item.id || item.name;

                                return (
                                    <li
                                        key={i}
                                        onClick={() => navigate(item.link)}
                                        className={`smallSide ${activeCurrentSubLink === currentKey ? "active" : ""
                                            }`}
                                    >
                                        <SidePanelSubLink
                                            name={item.name}
                                            link={item.link}
                                            icon={<span className={item.icon}></span>}
                                        />
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export const SideSecondPanel = ({ closeSideMenu }) => {
    const navigateTo = useNavigate();
    const location = useLocation();

    const [activeCurrentSubLink, setActiveCurrentSubLink] = useState("");

    const [openSection, setOpenSection] = useState({
        about: false,
        projects: false,
        contact: false,
        misc: false,
    });

    // Detect mobile/tablet screen width
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });

    // Detect active file name
    useEffect(() => {
        const last = location.pathname.split("/").pop().toLowerCase();
        setActiveCurrentSubLink(routeMap[last]);
    }, [location.pathname]);

    // Handle navigation
    const navigate = (path) => {
        navigateTo(path);
        if (isTabletOrMobile) closeSideMenu();
    };

    // Handle expanding/collapsing sections
    const handleToggle = (key) => {
        setOpenSection((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="relative menu-option overflow-hidden border-l-2 border-r-2 border-[#30363d] flex flex-col h-full">
            <div className="w-full absolute top-[28px] md:top-[25px] left-1/2 -translate-x-1/2 border-b-2 border-[#30363d] "></div>

            <div className="headweight pl-2 md:pl-5 pt-1 pb-1 text-[14px] md:text-[12px] shrink-0">EXPLORER</div>

            <div className="flex-1 overflow-y-auto force-vs-scrollbar pt-3 md:pt-1 mb-3 pb-5">
                {menuData.map((section) => (
                    <MenuSection
                        key={section.key}
                        section={section}
                        isOpen={openSection[section.key]}
                        onToggle={handleToggle}
                        navigate={navigate}
                        activeCurrentSubLink={activeCurrentSubLink}
                    />
                ))}
            </div>

            {
                !isTabletOrMobile && (
                    <ul className="bottom-links shrink-0 !static !relative ">
                        <li className="border-b border-[#30363d] border-t border-[#30363d] py-[0.5px]">
                            <div className="text-[12.5px] text-gray-400">All Rights Reserved.</div>
                        </li>
                        <li>
                            <div className="text-[12.5px] text-gray-400 py-[1px]">Ⓒ Copyright 2025.</div>
                        </li>
                    </ul>
                )
            }
        </div >
    );
};
