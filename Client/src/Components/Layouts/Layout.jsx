// import { useEffect, useState, Suspense, lazy } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import styles from "./Layout.module.css";

// import { SideSecondPanel } from "./SeondPanel/SideSecondPanel";
// import { SideMainPanel } from "./SideMainPanel/SideMainPanel";

// import countapi from "countapi-js";
// import { numberTOWords } from "../Helper/utility";

// // Lazy load the Clock component
// const Clock = lazy(() => import("../Clock"));

// const Layout = ({ children }) => {
//     const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
//     const [VisitorCount, setVisitorCount] = useState("Unknown");
//     const [openSideMenu, setOpenSideMenu] = useState(false);

//     const navigate = useNavigate();
//     const location = useLocation();

//     // Detect screen width
//     useEffect(() => {
//         const check = () => setIsTabletOrMobile(window.innerWidth <= 943);
//         check();
//         window.addEventListener("resize", check);
//         return () => window.removeEventListener("resize", check);
//     }, []);

//     // On mobile, close side menu
//     useEffect(() => {
//         if (isTabletOrMobile) setOpenSideMenu(false);
//     }, [isTabletOrMobile]);

//     // History tracking using localStorage
//     useEffect(() => {
//         let recentLinks = localStorage.getItem("history");
//         recentLinks = recentLinks ? JSON.parse(recentLinks) : [];
//         recentLinks = recentLinks.slice(0, 4);

//         if (location.pathname !== "/") {
//             recentLinks = recentLinks.filter((link) => link !== location.pathname);
//             recentLinks.unshift(location.pathname);
//             localStorage.setItem("history", JSON.stringify(recentLinks));
//         }
//     }, [location.pathname]);

//     // Visitor Count (Disabled, default to Unknown)
//     useEffect(() => {
//         setVisitorCount("Unknown");
//     }, []);

//     const toggleSideMainMenu = () => {
//         setOpenSideMenu(!openSideMenu);
//     };

//     return (
//         <>
//             {/* HEADER */}
//             <div className="header w-full">
//                 <div className="logo pl-2">
//                     <img
//                         src="https://img.icons8.com/color/96/000000/visual-studio-code-2019.png"
//                         alt="VS Code Icon"
//                         width="60"
//                         height="60"
//                     />
//                 </div>

//                 <ul className="header-menu">
//                     <li><Link to="/">About</Link></li>
//                     <li><Link to="/Experience">Experience</Link></li>
//                     <li><Link to="/Skills">Skills</Link></li>
//                     <li><Link to="/Projects">Projects</Link></li>
//                     <li><Link to="/Email">Contact</Link></li>
//                     <li><Link to="/Hobbies">Hobbies</Link></li>
//                 </ul>

//                 {!isTabletOrMobile ? (
//                     <div className="header-app-icons">
//                         <div className="flex flex-row items-center">

//                             {/* Back Button */}
//                             <button
//                                 onClick={() => navigate(-1)}
//                                 className="p-1 m-1 rounded-full text-gray-400 hover:bg-gray-100 hover:bg-opacity-60"
//                             >
//                                 <svg
//                                     className="h-5 w-5"
//                                     viewBox="0 0 20 20"
//                                     width="20"
//                                     height="20"
//                                     style={{ fill: "white" }}
//                                 >
//                                     <path d="M8.388,10.049l4.76-4.873c0.303-0.31,0.297-0.804-0.012-1.105c-0.309-0.304-0.803-0.293-1.105,0.012L6.726,9.516c-0.303,0.31-0.296,0.805,0.012,1.105l5.433,5.307c0.152,0.148,0.35,0.223,0.547,0.223c0.203,0,0.406-0.08,0.559-0.236c0.303-0.309,0.295-0.803-0.012-1.104L8.388,10.049z"></path>
//                                 </svg>
//                             </button>

//                             {/* Colored Indicators */}
//                             <div className="rounded-full p-1 mr-2" style={{ width: "0.75rem", height: "0.75rem", backgroundColor: "#f87171" }}></div>
//                             <div className="rounded-full p-1 mr-2" style={{ width: "0.75rem", height: "0.75rem", backgroundColor: "#fbbf24" }}></div>
//                             <div className="rounded-full p-1 mr-5" style={{ width: "0.75rem", height: "0.75rem", backgroundColor: "#34d399" }}></div>

//                         </div>
//                     </div>
//                 ) : null}
//             </div>

//             {/* MAIN BODY */}
//             <div className="scrollbar w-full">
//                 <nav className={`${openSideMenu ? styles.navside : styles.navsidecollapse}`}>
//                     <SideMainPanel toggleSideMainMenu={toggleSideMainMenu} mainActiveSideButton={openSideMenu} />
//                     {openSideMenu && <SideSecondPanel closeSideMenu={() => setOpenSideMenu(false)} />}
//                 </nav>

//                 <main className={`${openSideMenu ? styles.mainside : styles.mainsidecollapse} scrollbar`}>
//                     {children}
//                 </main>
//             </div>

//             {/* FOOTER */}
//             {!isTabletOrMobile ? (
//                 <div className="bottom-header pb-6 bg-blue-400 relative z-50">
//                     <ul className="right pt-1" style={{ fontSize: "12px" }}>
//                         <li>Made in</li>
//                         <li>React</li>
//                         <li>JavaScript</li>
//                         <li>Tailwind</li>
//                     </ul>

//                     <ul className="left">
//                         <li>{VisitorCount} Total Visits</li>

//                         <li>
//                             <Suspense fallback={<div>Loading time...</div>}>
//                                 <Clock format="dddd, MMMM Do, YYYY, h:mm:ss A" ticking={true} />
//                             </Suspense>
//                         </li>

//                         <li>UTF-8</li>
//                         <li>Port: 443</li>
//                     </ul>
//                 </div>
//             ) : (
//                 <div className="bottom-header pb-6 bg-blue-400 fixed z-50">
//                     <ul className="right pt-1" style={{ fontSize: "12px" }}>
//                         <li>React</li>
//                         <li>TypeScript</li>
//                         <li>Tailwind</li>
//                     </ul>
//                     <ul className="left">
//                         <li>{VisitorCount} Total Visits</li>
//                     </ul>
//                 </div>
//             )}
//         </>
//     );
// };

// export default Layout;



import React, { useEffect, useState, Suspense, lazy } from "react";
import styles from "./Layout.module.css";
import { SideSecondPanel } from "./SeondPanel/SideSecondPanel";

// import countapi from "countapi-js";
import { numberTOWords } from "../Helper/utility";
import { SideMainPanel } from "./SideMainPanel/SideMainPanel";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

// Lazy Clock
const Clock = lazy(() => import("../Clock"));

const Layout = ({ children }) => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });

    const [VisitorCount, setVisitorCount] = useState("");
    const [openSideMenu, setOpenSideMenu] = useState(true);

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
        setOpenSideMenu(!openSideMenu);
    };

    // Visitor Counter (Disabled)
    // useEffect(() => {
    //     countapi.visits("global").then((result) => {
    //         setVisitorCount(numberTOWords(result.value));
    //     });
    // }, []);

    return (
        <>
            {/* HEADER */}
            <div className="header w-full">
                <div className="logo pl-2">
                    <img
                        src="https://img.icons8.com/color/96/000000/visual-studio-code-2019.png"
                        alt="Visual Studio Code Styled Portfolio Icon"
                        width="60"
                        height="60"
                    />
                </div>

                <ul className="header-menu">
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
                        <Link to="/Email">Contact</Link>
                    </li>
                    <li className="header-menu-link">
                        <Link to="/Hobbies">Hobbies</Link>
                    </li>
                </ul>

                {/* Desktop Menu Buttons */}
                {!isTabletOrMobile ? (
                    <div className="header-app-icons">
                        <div className="flex flex-row items-center">

                            {/* Back Button */}
                            <button
                                onClick={() => navigate(-1)}
                                className="flex flex-col justify-center items-center p-1 m-1 rounded-full 
                                text-gray-400 transition-color hover:bg-gray-100 hover:bg-opacity-60 focus:outline-none focus:ring-2"
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
            <div className="scrollbar w-full">

                {/* SIDE NAVIGATION */}
                <nav className={`${openSideMenu ? styles.navside : styles.navsidecollapse}`}>
                    <SideMainPanel
                        toggleSideMainMenu={toggleSideMainMenu}
                        mainActiveSideButton={openSideMenu}
                    />

                    {openSideMenu && (
                        <SideSecondPanel closeSideMenu={() => setOpenSideMenu(false)} />
                    )}
                </nav>

                {/* PAGE CONTENT */}
                <main
                    className={`${openSideMenu ? styles.mainside : styles.mainsidecollapse} scrollbar`}
                >
                    {children}
                </main>
            </div>

            {/* FOOTER */}
            {!isTabletOrMobile ? (
                <div className="bottom-header pb-6 relative z-50 bg-blue-400">
                    <ul className="right pt-1" style={{ fontSize: "12px" }}>
                        <li>Made in</li>
                        <li>React.JS</li>
                        <li>TypeScript</li>
                        <li>Tailwind</li>
                        <li>React</li>
                    </ul>

                    <ul className="left">
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
                <div className="bottom-header fixed pb-6 relative z-50 bg-blue-400">
                    <ul className="right pt-1" style={{ fontSize: "12px" }}>
                        <li>NEXT.JS</li>
                        <li>JavaScript</li>
                        <li>Tailwind</li>
                    </ul>

                    <ul className="left">
                        <li>{VisitorCount} Total Visits</li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Layout;
