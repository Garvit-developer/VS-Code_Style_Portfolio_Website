import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import { projectsdata } from "../../Components/JSON/projectsdata";
import { useEffect } from "react";
import { VscRepo, VscLinkExternal } from "react-icons/vsc";

const ProjectCard = ({ project, index }) => (
    <Link
        to={`/projects/${index + 1}`}
        className="
            group flex flex-col h-full
            bg-[#252526] border border-[#3c3c3c] rounded-lg
            overflow-hidden
            hover:shadow-[0_0_0_1px_rgba(0,122,204,0.35)]
            hover:border-[#007acc]/60
            transition-all duration-300
        "
    >
        {/* Banner Image - 2:1 Aspect Ratio as requested */}
        <div className="relative w-full aspect-[2/1] overflow-hidden border-b border-[#3c3c3c]">
            <img
                src={project.banner}
                alt={`${project.name} banner`}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
        </div>

        {/* Content - Keeping Logo and Bold Name intact */}
        <div className="p-4 flex flex-col flex-grow gap-3">
            <div className="flex items-center gap-3">
                <img
                    src={project.logo}
                    alt="logo"
                    className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-[#3c3c3c] object-cover flex-shrink-0"
                />
                <div className="flex flex-col  overflow-hidden">
                    <div className="text-lg font-bold text-gray-100 group-hover:text-blue-400 transition-colors truncate">
                        {project.name}
                    </div>
                    <div className="text-sm font-medium text-gray-400 truncate">
                        {project.title}
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-auto pt-2 flex items-center gap-4 text-[11px] text-[#858585] uppercase tracking-wider font-semibold border-t border-[#3c3c3c]/50">
                <span className="flex items-center gap-1 group-hover:text-blue-400 transition-colors mt-2">
                    <VscRepo className="text-base" /> Details
                </span>
                <span className="flex items-center gap-1 group-hover:text-white transition-colors ml-auto mt-2">
                    Open <VscLinkExternal />
                </span>
            </div>
        </div>
    </Link>
);

const Projects = () => {
    const projects = projectsdata();

    useEffect(() => {
        document.title = "Projects | Garvit Dani";
    }, []);

    return (
        <div className="relative h-full w-full bg-[#1e1e1e] overflow-hidden">

            <div className="relative h-full overflow-hidden">
                {/* Grid Background */}
                <div
                    className="absolute inset-0 opacity-[0.04] pointer-events-none fixed"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />

                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    universal={true}
                >
                    <div className="w-full px-6 pt-5 md:py-5 pb-10 ">
                        {/* Header */}
                        <div className="flex flex-col gap-3 mb-8">
                            <div className="text-4xl md:text-5xl font-thin text-white tracking-tight">
                                My <span className="font-semibold text-blue-500">Projects</span>
                            </div>
                            <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
                                Internship and Side Projects for practice.
                            </p>
                        </div>

                        {/* Unified Responsive Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                            {projects?.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    project={project}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </Scrollbars>
            </div>
        </div>
    );
};

export default Projects;
