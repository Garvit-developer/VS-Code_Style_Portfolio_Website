import { Scrollbars } from "react-custom-scrollbars";
import { useMediaQuery } from "react-responsive";
import Zoom from "react-medium-image-zoom";
import { useEffect, useState } from "react";
import { VscLinkExternal, VscGithub } from "react-icons/vsc";

const ProjectDetails = ({ projectDetails, altt }) => {
    const isTabletOrMobileQuery = useMediaQuery({ query: "(max-width: 943px)" });
    const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);

    useEffect(() => {
        setIsTabletOrMobile(isTabletOrMobileQuery);
    }, [isTabletOrMobileQuery]);

    // Handle undefined or null projectDetails
    if (!projectDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-gray-400 text-xl">Loading project details...</p>
                </div>
            </div>
        );
    }

    return !isTabletOrMobile ? (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
        >
            <div className="relative h-full w-full bg-[#1e1e1e]">
                {/* Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none fixed"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />
                <div className="relative z-10">
                    <div
                        style={{
                            position: "relative",
                            width: "100%",
                            borderRadius: "0.5em",
                            height: "50vh",
                            backgroundImage: `url(${projectDetails?.detailBanner || projectDetails?.banner || ""})`,
                            paddingBottom: "35%",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    ></div>
                    <div className="  pb-6  maincontainerprofileprojects w-full">
                        <div className="mx-auto boxprojectdetails shadow-lg sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow-xl bg-[#252526] border border-[#3c3c3c] rounded-xl sm:rounded-lg">
                                <div>
                                    <div className=" p-8 bg-[#252526] border-t border-[#3c3c3c] sm:px-20">
                                        <div className="flex items-center justify-between">
                                            <img
                                                className="h-14 w-14 rounded-3xl bg-[#1e1e1e] border border-[#3c3c3c] p-1 shadow-inner"
                                                src={projectDetails?.logo || ""}
                                                alt={altt || "Project logo"}
                                            />

                                            {(projectDetails?.link || projectDetails?.github) && (
                                                <div className="flex items-center gap-3">
                                                    {projectDetails?.link && (
                                                        <a
                                                            href={
                                                                projectDetails.link.startsWith("http")
                                                                    ? projectDetails.link
                                                                    : `https://${projectDetails.link.replace(/^\/+/, "")}`
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="
                        group relative flex items-center gap-2
                        px-3 py-2
                        text-sm font-medium text-white
                        bg-[#1e1e1e]
                        border border-[#3c3c3c]
                        rounded-md
                        border border-[#007acc]
                        rounded-md
                        transition-all duration-200
                        hover:bg-[#1177bb]
                        hover:shadow-[0_0_16px_rgba(0,122,204,0.55)]
                        focus:outline-none focus:ring-2 focus:ring-[#007acc]/60
                    "
                                                        >
                                                            <VscLinkExternal className="text-lg h-4 w-4 text-white/90 group-hover:text-white transition" />
                                                            <span className="tracking-wide">Live Demo</span>

                                                            {/* subtle command glow */}
                                                            <span className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-r from-transparent via-[#007acc]/10 to-transparent" />
                                                        </a>
                                                    )}

                                                    {projectDetails?.github && (
                                                        <a
                                                            href={projectDetails.github}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="
                        group relative flex items-center gap-2
                        px-3 py-2
                        text-sm font-medium text-gray-300
                        bg-[#1e1e1e]
                        border border-[#3c3c3c]
                        rounded-md
                        transition-all duration-200
                        hover:bg-[#252526]
                        hover:border-[#007acc]
                        hover:text-white
                        hover:shadow-[0_0_14px_rgba(0,122,204,0.35)]
                        focus:outline-none focus:ring-2 focus:ring-[#007acc]/50
                    "
                                                        >
                                                            <VscGithub className="text-lg text-gray-400 group-hover:text-white transition" />
                                                            <span className="tracking-wide">View Code</span>

                                                            {/* editor hover line */}
                                                            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#007acc] group-hover:w-full transition-all duration-300 rounded-full" />
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>


                                        <div className="mt-5 text-2xl text-[#cccccc]">
                                            <span className="font-bold text-white">{projectDetails?.name || ""}</span> -{" "}
                                            {projectDetails?.title || ""}
                                        </div>
                                        <div className="mt-6 text-gray-400 text-md dark:text-gray-400">
                                            {projectDetails?.description || ""}
                                        </div>

                                        <div className="mt-6 text-gray-400 font-semibold text-md dark:text-gray-400">
                                            Key Features
                                        </div>
                                        <ul className="mt-2 text-gray-400 list-disc  text-md dark:text-gray-400">
                                            {projectDetails?.features?.map((feature, index) => (
                                                <li key={`feature-desktop-${index}`}>
                                                    • {feature}
                                                </li>
                                            )) || []}
                                        </ul>
                                        <div className="mt-6 text-gray-400 font-semibold text-md dark:text-gray-400">
                                            Technologies Used
                                        </div>
                                        <div className="pt-1">
                                            {projectDetails?.skills?.map((skill, index) => (
                                                <span
                                                    key={skill + index}
                                                    className="px-3 py-1 text-xs text-[#cccccc] bg-[#1e1e1e] border border-[#3c3c3c] rounded hover:border-blue-500 hover:text-white transition-colors inline-flex mt-2 items-center mr-2"
                                                >
                                                    {skill}
                                                </span>
                                            )) || []}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" pl-5 pr-5 mt-3 ml-5 mr-5 mb-3">
                            <div className="mt-6 pb-2 text-gray-400 font-semibold text-2xl dark:text-gray-400">
                                Snapshots
                            </div>
                            <div className="w-full mt-2 mb-5 pb-5 grid grid-cols-1  xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 ">
                                {projectDetails?.snapshots?.map((shot, index) => (
                                    <div
                                        className="mr-3 mb-3"
                                        key={`snapshot-${index}`}
                                    >
                                        <Zoom zoomMargin={100}>
                                            <img
                                                className="text-center rounded-xl "
                                                src={shot}
                                                alt={altt || "Project snapshot"}
                                                width="3000"
                                                height={projectDetails?.height || 2000}
                                                style={{ objectPosition: "center" }}
                                            />
                                        </Zoom>
                                    </div>
                                )) || []}
                            </div>
                        </div>
                        <h2 className="text-3xl pl-3 pt-2 pb-1 text-blue-500 font-semibold tracking-wide uppercase">
                            Other Projects
                        </h2>
                        <p className=" font-medium pl-3 pb-2 text-gray-400 text-sm pt-1 w-4/5 ">
                            Based to the current project you are watching.
                        </p>
                        <div className="w-full mt-5 mb-5 pb-5  grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 ">
                            {projectDetails?.others?.map((project, index) => (
                                <div
                                    key={`other-project-${index}`}
                                    className="mb-4 p-3"
                                >
                                    <div className="w-full h-full rounded-xl overflow-hidden cursor-pointer bg-[#252526] border border-[#3c3c3c] hover:border-[#007acc]/60 hover:shadow-[0_0_0_1px_rgba(0,122,204,0.35)] transform transition-all duration-300 flex flex-col">
                                        <a href={project?.link || "#"} className="flex flex-col h-full">
                                            <div className="flex-1">
                                                <div className="p-2">
                                                    <img
                                                        className=" w-full aspect-[2/1] overflow-hidden rounded-xl border-b border-[#3c3c3c] object-cover object-center"
                                                        src={project?.thumbnail || ""}
                                                        alt={project?.title || "Project"}
                                                        width="500"
                                                        height="270"
                                                    />
                                                </div>
                                                <div className="flex justify-between pr-3  pl-3 pb-1">
                                                    <div className="flex items-center space-x-4">
                                                        <img
                                                            className="h-10 w-10 rounded-full bg-[#1e1e1e] border border-[#3c3c3c]"
                                                            src={project?.logo || ""}
                                                            alt={project?.title || "Project logo"}
                                                            width="55"
                                                            height="55"
                                                        />
                                                        <h1 className="text-lg text-gray-100 font-bold">
                                                            {project?.title || ""}
                                                            <p className=" font-medium text-gray-400 text-sm  w-4/5 ">
                                                                {project?.description || ""}
                                                            </p>
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            )) || []}
                        </div>
                    </div>
                </div>
            </div>
        </Scrollbars>
    ) : (
        <div className="pb-40 mb-40 w-full pl-4 pr-2">
            <img
                src={projectDetails?.detailBanner || projectDetails?.banner || ""}
                alt={projectDetails?.title || "Project Banner"}
                className="w-full h-auto rounded-xl shadow-lg object-contain"
            />
            <div className=" ml-2 mr-2 mt-2 shadow-lg ">
                <div className="overflow-hidden  shadow-xl dark:bg-gray-800 rounded-xl sm:rounded-lg">
                    <div>
                        <div className="p-3 bg-[#252526] border-t border-[#3c3c3c] sm:px-20">
                            <img
                                className="h-10 w-10 inline-block rounded-lg bg-[#1e1e1e] border border-[#3c3c3c] p-1"
                                src={projectDetails?.logo || ""}
                                alt={altt || "Project logo"}
                                width="65"
                                height="65"
                            />

                            <div className="mt-5 text-xl text-[#cccccc]">
                                <span className="font-bold">{projectDetails?.name || ""}</span> -{" "}
                                {projectDetails?.title || ""}
                            </div>
                            <div className="mt-6 text-gray-400 text-sm font-medium dark:text-gray-400">
                                {projectDetails?.description || ""}
                            </div>

                            {/* Action Buttons - Mobile */}
                            {(projectDetails?.link || projectDetails?.github) && (
                                <div className="mt-6 flex flex-col gap-3">
                                    {projectDetails?.link && (
                                        <a
                                            href={
                                                projectDetails.link.startsWith("http")
                                                    ? projectDetails.link
                                                    : `https://${projectDetails.link.replace(/^\/+/, "")}`
                                            }
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex items-center justify-center gap-2 px-4 py-3 bg-[#007acc] hover:bg-[#0098ff] text-white font-medium text-sm rounded border border-[#007acc] hover:border-[#0098ff] transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,122,204,0.5)]"
                                        >
                                            <VscLinkExternal className="text-lg" />
                                            <span>Live Demo</span>
                                        </a>
                                    )}
                                    {projectDetails?.github && (
                                        <a
                                            href={projectDetails.github}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex items-center justify-center gap-2 px-4 py-3 bg-[#1e1e1e] hover:bg-[#2d2d30] text-gray-300 hover:text-white font-medium text-sm rounded border border-[#3c3c3c] hover:border-[#007acc] transition-all duration-200 hover:shadow-[0_0_12px_rgba(0,122,204,0.3)]"
                                        >
                                            <VscGithub className="text-lg" />
                                            <span>View Code</span>
                                        </a>
                                    )}
                                </div>
                            )}

                            <div className="mt-6 text-gray-400 font-semibold text-md dark:text-gray-400">
                                Key Features
                            </div>
                            <ul className="mt-2 text-gray-400 list-disc  text-sm dark:text-gray-400">
                                {projectDetails?.features?.map((feature, index) => (
                                    <li
                                        className="pb-2"
                                        key={`feature-${index}`}
                                    >
                                        • {feature}
                                    </li>
                                )) || []}
                            </ul>
                            <div className="mt-6 text-gray-400 font-semibold text-md dark:text-gray-400">
                                Technologies Used
                            </div>
                            <div className="pt-1">
                                {projectDetails?.skills?.map((skill, index) => (
                                    <span
                                        key={`skill-${index}`}
                                        className="px-3 py-1 text-xs text-[#cccccc] bg-[#1e1e1e] border border-[#3c3c3c] rounded hover:border-blue-500 hover:text-white transition-colors inline-flex mt-2 items-center mr-2"
                                    >
                                        {skill}
                                    </span>
                                )) || []}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="  mt-3 pl-2 pr-2  mb-36 pb-20">
                <div className="mt-6 pb-2 text-gray-400 font-semibold text-xl dark:text-gray-400">
                    Snapshots
                </div>
                <div className="w-full mt-2 mb-5 pb-5 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 ">
                    {projectDetails?.snapshots?.map((shot, index) => (
                        <div
                            key={`snapshot-mobile-${index}`}
                            className="mr-3 mb-3"
                        >
                            <Zoom zoomMargin={100}>
                                <img
                                    className="text-center rounded-xl "
                                    src={shot}
                                    alt={altt || "Project snapshot"}
                                    width="3000"
                                    height={projectDetails?.height || 2000}
                                    style={{ objectPosition: "center" }}
                                />
                            </Zoom>
                        </div>
                    )) || []}
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;
