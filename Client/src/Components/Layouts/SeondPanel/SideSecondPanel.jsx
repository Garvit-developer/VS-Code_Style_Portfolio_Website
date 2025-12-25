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
            { name: "vision.md", link: "/myvision", icon: "icons8-readme" },
        ],
    },
    {
        key: "projects",
        title: "Side Projects",
        items: [
            { id: "1", name: "Geektheo.js", link: "/Projects/1", icon: "icons8-nodejs" },
            { id: "2", name: "Skilledu.js", link: "/Projects/2", icon: "icons8-react" },
            { id: "3", name: "Taskly-Pro.ts", link: "/Projects/3", icon: "icons8-angularjs" },
            { id: "4", name: "Bhasha-Setu.js", link: "/Projects/4", icon: "icons8-react" },
            { id: "5", name: "Secure-Stack.js", link: "/Projects/5", icon: "icons8-nodejs" },
            { id: "6", name: "SimonSaysGame.js", link: "/Projects/6", icon: "icons8-react" },
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
            { id: "Gaming", name: "Gaming.sln", link: "/Gaming", icon: "icons8-c-sharp" },
            { id: "Learning", name: "Learning.ts", link: "/Learning", icon: "icons8-angularjs" },
        ],
    },
];

const MenuSection = ({ section, isOpen, onToggle, navigate, activeCurrentSubLink }) => {
    return (
        <div className="menu-drop pt-1">
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
        <div className="menu-option  overflow-hidden">
            <h5 className="myweight">EXPLORER</h5>

            <div className="mb-5 pb-5 z-1 scrollbar" style={{ height: "84%", overflowY: "scroll" }}>
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

            {!isTabletOrMobile && (
                <ul className="bottom-links pl-2 ">
                    <li className=" text-sm border-b border-gray-500">
                        <div className="text-gray-400">All Rights Reserved.</div>
                    </li>
                    <li>
                        <div className="text-gray-400">Ⓒ Copyright 2025.</div>
                    </li>
                </ul>
            )}
        </div>
    );
};
