
import React, { useEffect, useState, Suspense, lazy } from "react";
import styles from "./Layout.module.css";
import { SideSecondPanel } from "./SeondPanel/SideSecondPanel";
import SearchBar from "../Search/SearchBar";
import MobileSearchBar from "../Search/MobileSearchBar";
import { MessageSquare, ArrowLeft, ArrowRight, Files, User, Search, X } from "lucide-react";
// import countapi from "countapi-js";
import { numberTOWords } from "../Helper/utility";
import { SideMainPanel } from "./SideMainPanel/SideMainPanel";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Chatbot from "../Chatbot";
import EditorTabBar from "../EditorTabBar";

// Lazy Clock
const Clock = lazy(() => import("../Clock"));

const Layout = ({ children }) => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 640px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 475px)" });

    const [VisitorCount, setVisitorCount] = useState("");
    const [openSideMenu, setOpenSideMenu] = useState(true);
    const [showChatbot, setShowChatbot] = useState(false);
    const [showSearch, setShowSearch] = useState(false); // New search state
    // const [mainActiveSideButton, setMainActiveSideButton] = useState("files");

    const location = useLocation();
    const navigate = useNavigate();

    // Close side menu on mobile
    useEffect(() => {
        if (isTabletOrMobile) {
            setOpenSideMenu(false);
        }
    }, [isTabletOrMobile]);

    // Recent History Logic
    useEffect(() => {
        if (typeof window !== "undefined" && location.pathname !== "/") {
            let recentLinks = localStorage.getItem("history");
            recentLinks = recentLinks ? JSON.parse(recentLinks) : [];

            recentLinks = recentLinks.slice(0, 4);
            recentLinks = recentLinks.filter((link) => link !== location.pathname);
            recentLinks.unshift(location.pathname);

            localStorage.setItem("history", JSON.stringify(recentLinks));
        }
    }, [location.pathname]);

    // Toggle side menu
    const toggleSideMainMenu = () => {
        const nextOpenSideMenu = !openSideMenu;
        setOpenSideMenu(nextOpenSideMenu);
        if (nextOpenSideMenu) {
            setShowChatbot(false);
            setShowSearch(false);
        }
    };

    const toggleChatbot = () => {
        const nextShowChatbot = !showChatbot;
        setShowChatbot(nextShowChatbot);
        if (nextShowChatbot) {
            setOpenSideMenu(false);
            setShowSearch(false);
        } else {
            // If closing chatbot in desktop, open sidebar
            if (!isTabletOrMobile) {
                setOpenSideMenu(true);
            }
        }
    };

    const toggleSearch = () => {
        setShowSearch(!showSearch);
        if (!showSearch) {
            setOpenSideMenu(false);
            setShowChatbot(false);
        }
    };
    return (
        <div className={styles.layoutWrapper}>
            {/* HEADER */}
            <div className="header w-full flex items-center border-b border-[#30363d] gap-0 sm:gap-5 md:gap-14 lg:gap-17 px-0">
                <div className="flex items-center gap-0">
                  <div
    onClick={() => navigate("/")}
    className={`cursor-pointer
        ${isTabletOrMobile
            ? "ml-0.5 w-8 h-8 bg-[url('/mobile_logo.webp')] bg-cover bg-center"
            : "ml-2 w-5 h-5 bg-[url('/visual-studio-code.webp')] bg-cover bg-center"
        }
    `}/>
                    <ul className="header-menu hidden md:flex">
                        <li className="header-menu-link">
                            <Link to="/">About</Link>
                        </li>
                        <li className="header-menu-link">
                            <Link to="/Experience">Experience</Link>
                        </li>
                        <li className="header-menu-link">
                            <Link to="/Skills">Skills</Link>
                        </li>
                        <li className="header-menu-link">
                            <Link to="/Projects">Projects</Link>
                        </li>
                        <li className="header-menu-link">
                            <Link to="/resume">Resume</Link>
                        </li>
                        <li className="header-menu-link">
                            <Link to="/Email">Contact</Link>
                        </li>
                    </ul>
                </div>

                {/* SEARCH BAR (CENTERED) */}
                <div className="flex-1 max-w-xl flex items-center justify-center gap-1 ">
                    <div className="flex items-center gap-1 ">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-1 rounded hover:bg-[#37373d] text-gray-400 hover:text-white transition-colors hidden md:block"
                            title="Go Back"
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => navigate(1)}
                            className="p-1 rounded hover:bg-[#37373d] text-gray-400 hover:text-white transition-colors hidden md:block"
                            title="Go Forward"
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex-1 w-full">
                        {isTabletOrMobile ? (<MobileSearchBar showSearch={showSearch} />) : (<SearchBar showSearch={showSearch} />)
                        }

                    </div>
                    <button
                        onClick={toggleChatbot}
                        className={`pr-16 sm:pr-15 lg:pr-5 p-1 rounded-md transition-all duration-200 border border-transparent hidden sm:block
                            ${showChatbot
                                ? " text-white border-[#454545]"
                                : "text-gray-400 hover:bg-[#37373d] hover:text-white"
                            }`}
                        title="Toggle Chatbot"
                    >
                        <img src="/Chatbot_img.png" className="w-5 h-5" />
                    </button>
                </div>


                {/* Desktop Menu Buttons */}
                {!isTablet ? (
                    <div className="header-app-icons">
                        <div className="flex flex-row items-center ">

                            {/* Back Button */}
                            <button
                                onClick={() => navigate(-1)}
                                className="flex flex-col justify-center items-center p-[1px]  m-1 rounded-full 
                                text-gray-400 transition-color hover:bg-gray-500 hover:bg-opacity-60 focus:outline-none "
                            >
                                <svg
                                    className="fill-current h-5 w-5"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    style={{ fill: "white" }}
                                >
                                    <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
                                </svg>
                            </button>

                            {/* Traffic Lights */}
                            <div
                                className="text-white rounded-full p-1 mr-2"
                                style={{
                                    width: "0.75rem",
                                    height: "0.75rem",
                                    backgroundColor: "rgba(248, 113, 113, 1)",
                                }}
                            />
                            <div
                                className="text-white rounded-full p-1 mr-2"
                                style={{
                                    width: "0.75rem",
                                    height: "0.75rem",
                                    backgroundColor: "rgba(251, 191, 36, 1)",
                                }}
                            />
                            <div
                                className="text-white rounded-full p-1 mr-5"
                                style={{
                                    width: "0.75rem",
                                    height: "0.75rem",
                                    backgroundColor: "rgba(52, 211, 153, 1)",
                                }}
                            />
                        </div>
                    </div>
                ) : null}
            </div>

            {/* MAIN WRAPPER */}
            <div className={`${styles.mainContentWrapper} scrollbar w-full flex`}>

                {/* SIDE NAVIGATION */}
                <nav className={`${openSideMenu ? styles.navside : styles.navsidecollapse}`}>
                    {/* Cross Button for Mobile Sidebar */}
                    {isTabletOrMobile && openSideMenu && (
                        <button
                            className={styles.closeSidebarBtn}
                            onClick={() => setOpenSideMenu(false)}
                        >
                            <X size={24} />
                        </button>
                    )}

                    {/* Only show SideMainPanel on desktop, or if specifically needed on mobile */}
                    {!isTabletOrMobile && (
                        <SideMainPanel
                            toggleSideMainMenu={toggleSideMainMenu}
                            toggleSearch={toggleSearch}
                            showSearch={showSearch}
                            toggleChatbot={toggleChatbot}
                            showChatbot={showChatbot}
                            openSideMenu={openSideMenu}
                        />
                    )}

                    {openSideMenu && (
                        <SideSecondPanel closeSideMenu={() => setOpenSideMenu(false)} />
                    )}
                </nav>

                {/* MOBILE BACKDROP */}
                {isTabletOrMobile && (openSideMenu || showChatbot || showSearch) && (
                    <div
                        className={styles.panelBackdrop}
                        onClick={() => {
                            setOpenSideMenu(false);
                            setShowChatbot(false);
                            setShowSearch(false);
                        }}
                    />
                )}

                {/* PAGE CONTENT */}
                <main
                    className={`${openSideMenu ? styles.mainside : styles.mainsidecollapse} ${showChatbot ? styles.withRightPanel : ''} flex flex-col`}
                >
                    <EditorTabBar />
                    <div className="flex-1 w-full relative min-h-0">
                        {children}
                    </div>
                </main>

                {/* RIGHT SIDEBAR (CHATBOT) */}
                {showChatbot && (
                    <div className={styles.rightSidePanel}>
                        <Chatbot isOpen={showChatbot} onClose={toggleChatbot} />
                    </div>
                )}

                {/* Floating Search Overlay (Command Palette Style) */}
                {showSearch && (
                    <div className={styles.commandPaletteWrapper}>
                        <div className={styles.commandPaletteBackdrop} onClick={() => setShowSearch(false)} />
                        <div className={styles.commandPalette}>
                            <SearchBar showSearch={showSearch} setShowSearch={setShowSearch} />
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Bottom Navigation */}
            {isTabletOrMobile && (
                <div className={styles.bottomNav}>
                    <div
                        className={`${styles.bottomNavItem} ${openSideMenu ? styles.active : ""}`}
                        onClick={toggleSideMainMenu}
                    >
                        <Files size={20} />
                        <span>Explorer</span>
                    </div>

                    <div
                        className={`${styles.bottomNavItem} ${showChatbot ? styles.active : ""}`}
                        onClick={toggleChatbot}
                    >
                        <MessageSquare size={20} />
                        <span>Chat</span>
                    </div>
                    <div
                        className={`${styles.bottomNavItem} ${(location.pathname === "/" && !openSideMenu && !showChatbot) ? styles.active : ""}`}
                        onClick={() => {
                            setOpenSideMenu(false);
                            setShowChatbot(false);
                            setShowSearch(false);
                            if (location.pathname !== "/") {
                                navigate("/");
                            }
                        }}
                    >
                        <User size={20} />
                        <span>Profile</span>
                    </div>
                </div>
            )}

            {/* FOOTER */}
            {!isTabletOrMobile ? (
                <div className="bottom-header pb-5 z-50">
                    <ul className="right  flex items-center justify-start" style={{ fontSize: "12px" }}>
                        <li>Made in</li>
                        <li>React.JS</li>
                        <li>JavaScript</li>
                        <li>Tailwind</li>
                        <li>React</li>
                    </ul>

                    <ul className="left flex items-center justify-end">
                        <li>{VisitorCount} Total Visits</li>

                        <li>
                            <Suspense fallback={<div>Loading time...</div>}>
                                <Clock
                                    format={"dddd, MMMM Mo, YYYY, h:mm:ss A"}
                                    ticking={true}
                                />
                            </Suspense>
                        </li>

                        <li>UTF-8</li>
                        <li>
                            <i className="fa fa-radiation-alt"></i> Port: 443
                        </li>
                    </ul>
                </div>
            ) : (
                <div className={`bottom-header z-50 ${isTabletOrMobile ? "!static flex-shrink-0 w-full bg-[#1e1e1e]" : "fixed"}`}>
                    <ul className="right pt-1" style={{ fontSize: "12px" }}>
                        <li>React.JS</li>
                        <li>JavaScript</li>
                        <li>Tailwind</li>
                    </ul>

                    <ul className="left">
                        <li>{VisitorCount} Total Visits</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Layout;
