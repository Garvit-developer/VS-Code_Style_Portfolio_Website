// import { Link } from "react-router-dom";
// import React, { useEffect } from "react";
// import TextTransition, { presets } from "react-text-transition";
// import { Scrollbars } from "react-custom-scrollbars";
// import { useMediaQuery } from "react-responsive";

// const TEXTS = [
//     "Software Engineer",
//     "Full Stack Developer",
//     "Cloud Enthusiast",
//     "Gamer",
//     "Tech Enthusiast",
// ];

// const Home = () => {
//     const [index, setIndex] = React.useState(0);
//     const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });

//     useEffect(() => {
//         document.title = "Portfolio";
//         const intervalId = setInterval(
//             () => setIndex((index) => index + 1),
//             3000 // every 3 seconds
//         );
//         return () => clearTimeout(intervalId);
//     }, []);

//     return (
//         <Scrollbars
//             autoHide
//             autoHideTimeout={1000}
//             autoHideDuration={200}
//             universal={true}
//         >
//             {!isTabletOrMobile ? (
//                 <div className="h-full w-full ">
//                     <section className="shadow-xl rounded-md mx-auto">
//                         <div className="max-w-6xl mx-auto pt-10 pb-10 ">
//                             <div className="mt-8 overflow-hidden">
//                                 <div className="grid grid-cols-1 lg:grid-cols-2">
//                                     <div className="p-6 mr-2 mt-8   sm:rounded-lg">
//                                         <h1 className="text-4xl sm:text-5xl mx-auto text-gray-200 dark:text-white font-extrabold tracking-tight">
//                                             Hi, I am <span className="text-indigo-500">Name</span>
//                                         </h1>
//                                         <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
//                                             I am a{" "}
//                                             <span className="text-indigo-500 inline-block">
//                                                 <TextTransition
//                                                     springConfig={presets.wobbly}
//                                                     inline={true}
//                                                 >
//                                                     {TEXTS[index % TEXTS.length]}
//                                                 </TextTransition>
//                                             </span>
//                                         </p>
//                                         <p className="text-normal text-md font-normal text-gray-400 dark:text-gray-400 mt-2">
//                                             Welcome to my portfolio! I am a passionate software
//                                             engineer with a love for building scalable and efficient
//                                             applications. I enjoy learning new technologies and
//                                             solving complex problems.
//                                         </p>
//                                         <div className="mt-8 flex flex-col sm:flex-row gap-4">
//                                             <Link
//                                                 to="/contact"
//                                                 className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
//                                             >
//                                                 Contact Me
//                                             </Link>
//                                             <Link
//                                                 to="/projects"
//                                                 className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
//                                             >
//                                                 View Projects
//                                             </Link>
//                                         </div>
//                                     </div>
//                                     <div className="p-6 flex justify-center items-center">
//                                         <img
//                                             src="https://img.icons8.com/fluency/240/000000/visual-studio-code-2019.png"
//                                             alt="VS Code Icon"
//                                             className="w-64 h-64 sm:w-80 sm:h-80 object-contain animate-pulse"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             ) : (
//                 <div className="h-full w-full pb-20">
//                     <section className="shadow-xl rounded-md mx-auto">
//                         <div className="pt-10 pb-10 ">
//                             <div className="mt-8 overflow-hidden">
//                                 <div className="p-3">
//                                     <h1 className="text-4xl text-gray-200 dark:text-white font-extrabold tracking-tight">
//                                         Hi, I am <span className="text-indigo-500">Name</span>
//                                     </h1>
//                                     <p className="text-normal text-lg font-medium text-gray-600 dark:text-gray-400 mt-2">
//                                         I am a{" "}
//                                         <span className="text-indigo-500 inline-block">
//                                             <TextTransition
//                                                 springConfig={presets.wobbly}
//                                                 inline={true}
//                                             >
//                                                 {TEXTS[index % TEXTS.length]}
//                                             </TextTransition>
//                                         </span>
//                                     </p>
//                                     <p className="text-normal text-md font-normal text-gray-400 dark:text-gray-400 mt-2">
//                                         Welcome to my portfolio! I am a passionate software engineer
//                                         with a love for building scalable and efficient
//                                         applications. I enjoy learning new technologies and
//                                         solving complex problems.
//                                     </p>
//                                     <div className="mt-8 flex flex-col gap-4">
//                                         <Link
//                                             to="/contact"
//                                             className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
//                                         >
//                                             Contact Me
//                                         </Link>
//                                         <Link
//                                             to="/projects"
//                                             className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
//                                         >
//                                             View Projects
//                                         </Link>
//                                     </div>
//                                 </div>
//                                 <div className="p-6 flex justify-center items-center">
//                                     <img
//                                         src="https://img.icons8.com/fluency/240/000000/visual-studio-code-2019.png"
//                                         alt="VS Code Icon"
//                                         className="w-48 h-48 object-contain animate-pulse"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </section>
//                 </div>
//             )}
//         </Scrollbars>
//     );
// };

// export default Home;



import React, { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Home = () => {
    const [index, setIndex] = useState(0);
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });

    const navigate = useNavigate();
    const location = useLocation();

    // Load recent links
    const recentLinks = useMemo(() => {
        if (typeof window !== "undefined") {
            let recent = localStorage.getItem("history");
            return recent ? JSON.parse(recent) : [];
        }
        return [];
    }, [location.pathname]);

    // Auto index increment
    useEffect(() => {
        const intervalId = setInterval(() => setIndex((index) => index + 1), 2000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <Helmet>
                <title>Garvit Dani | Software Development && Full Stack Devloper</title>
                <meta name="description" content="VS code style developer portfolio" />
                <link rel="icon" href="/favicon.ico" />

                <meta property="og:title" content="Your Name - Software Development Engineer & Product Developer" />
                <meta property="og:image" content="/mainthumbnail.PNG" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>

            <main className="w-full containerCenterImage">
                <div className="container vscodecontainer mx-auto max-w-5xl w-full p-6 md:p-12">
                    <div className="flex flex-col mt-1 md:flex-row md:space-x-4">

                        {/* LEFT SECTION */}
                        <div className="flex-1 mb-4 md:mb-0">
                            <div className="p-2">

                                <h2 className="text-5xl font-sans mb-2">Garvit Dani</h2>
                                <h3 className="text-2xl font-sans text-gray-500 pt-1 mb-2">Software Development Engineer</h3>

                                <p className="text-xl text-gray-300 pt-5 mb-4">Start</p>

                                {/* SKILLS */}
                                <Link to="/Skills">
                                    <p className="text-blue-500 cursor-pointer text-sm pb-2 font-sans flex gap-1 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                        </svg>
                                        Skills...
                                    </p>
                                </Link>

                                {/* PROJECTS */}
                                <Link to="/Projects">
                                    <p className="text-blue-500 cursor-pointer text-sm pb-2 font-sans flex gap-1 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                                        </svg>
                                        Projects...
                                    </p>
                                </Link>

                                {/* EMAIL */}
                                <Link to="/Email">
                                    <p className="text-blue-500 cursor-pointer text-sm pb-2 font-sans flex gap-1 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
                                        </svg>
                                        Get in Touch...
                                    </p>
                                </Link>

                                {/* HOBBIES */}
                                <Link to="/Hobbies">
                                    <p className="text-blue-500 cursor-pointer text-sm pb-2 font-sans flex gap-1 items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                                        </svg>
                                        Hobbies...
                                    </p>
                                </Link>

                                {/* RECENT LINKS */}
                                <p className="text-xl text-gray-300 pt-6 mb-2">Recent</p>

                                {recentLinks.length < 1 ? (
                                    <p className="text-sm font-sans text-gray-500">No recent activity!</p>
                                ) : (
                                    <div className="pt-1">
                                        {recentLinks.map((item, idx) => (
                                            <Link to={item} key={idx}>
                                                <div className="text-blue-500 cursor-pointer text-sm pb-2 font-sans flex gap-1 items-center">
                                                    {item.slice(1)}
                                                    <span className="text-gray-300 pl-2">E:/RajSavaliya{item}</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT SECTION */}
                        <div className="flex-1">
                            <div className="p-2" style={{ paddingTop: isTabletOrMobile ? "5%" : "22%" }}>
                                <p className="text-xl text-gray-300 pt-6 mb-1">About</p>

                                {/* Social Blocks */}
                                {[
                                    {
                                        icon: "https://img.icons8.com/fluency/30/null/linkedin-circled.png",
                                        text: "LinkedIn Profile",
                                        link: "https://www.linkedin.com/in/savaliya-raj",
                                    },
                                    {
                                        icon: "https://img.icons8.com/3d-fluency/28/null/github.png",
                                        text: "Github Page",
                                        link: "https://github.com/SRX9",
                                    },
                                    {
                                        icon: "https://img.icons8.com/color/28/null/twitter--v1.png",
                                        text: "Twitter Handle",
                                        link: "https://twitter.com/s_r_x_9",
                                    },
                                    {
                                        icon: "https://img.icons8.com/color/28/null/javascript--v1.png",
                                        text: "Full Stack Engineer",
                                        link: "https://twitter.com/s_r_x_9",
                                    },
                                    {
                                        icon: "https://img.icons8.com/ios-filled/20/ffffff/learn-more.png",
                                        text: "Constant Learner",
                                        link: "https://twitter.com/s_r_x_9",
                                    },
                                ].map((item, i) => (
                                    <a
                                        key={i}
                                        href={item.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="block mt-4 first:mt-1 "
                                    >
                                        <div
                                            className="cursor-pointer w-full flex items-center gap-2 rounded-sm border-b border-blue-500 p-1"
                                            style={{ backgroundColor: "#262626", borderBottomWidth: "0.3rem" }}
                                        >
                                            <img className="w-7 h-7" src={item.icon} alt="" />
                                            <p className="text-gray-200 text-sm font-sans">{item.text}</p>
                                        </div>
                                    </a>
                                ))}


                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
