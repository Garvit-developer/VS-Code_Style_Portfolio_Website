import { Scrollbars } from "react-custom-scrollbars";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Briefcase, Calendar } from "lucide-react";
import { experiences } from "../Components/JSON/experienceData";

const MyWork = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    useEffect(() => {
        document.title = "Professional Experience | Garvit Dani";
    }, []);

    return (
        <div className="relative h-full w-full bg-[#1e1e1e]">
            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
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
                <div className="w-full flex flex-col min-h-screen">
                    <div className={`w-full ${isMobile ? 'px-2' : 'px-5'} py-5 pb-20 text-left`}>
                        {/* Header matching Projects/Skills pages */}
                        <div className="flex flex-col gap-3 mb-10">
                            <h1 className="text-5xl md:text-6xl font-thin text-white tracking-tight">
                                Work <span className="font-semibold text-blue-500">Experience</span>
                            </h1>
                            <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
                                My professional journey, internships, and industry projects.
                            </p>
                        </div>

                        {/* Timeline Section */}
                        <div className="w-full mt-8">
                            <VerticalTimeline layout="1-column-left" lineColor="#3c3c3c">
                                {experiences.map((exp, index) => (
                                    <VerticalTimelineElement
                                        key={index}
                                        className="vertical-timeline-element--work"
                                        contentStyle={{
                                            background: "#252526",
                                            color: "#cccccc",
                                            border: "1px solid #3c3c3c",
                                            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                            borderRadius: "0.5rem",
                                            padding: isMobile ? "0.8rem" : "1.5rem",
                                            textAlign: "left",
                                        }}
                                        contentArrowStyle={{
                                            borderRight: "7px solid #252526",
                                        }}
                                        iconStyle={{
                                            background: "#007acc",
                                            color: "#fff",
                                            boxShadow: "0 0 0 4px #1e1e1e",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            overflow: "hidden",
                                            border: "2px solid #1e1e1e"
                                        }}
                                        icon={
                                            exp.logo ? (
                                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-0.5">
                                                    <img
                                                        src={exp.logo}
                                                        alt={exp.company}
                                                        className="w-full h-full object-cover rounded-full"
                                                    />
                                                </div>
                                            ) : (
                                                <Briefcase className="text-white w-5 h-5" />
                                            )
                                        }
                                    >
                                        <div className="space-y-3">
                                            {/* Header with timeline date */}
                                            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between pb-3 border-b border-[#3c3c3c]">
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-medium text-white tracking-tight">
                                                        {exp.title}
                                                    </h3>
                                                    <h4 className="text-base text-blue-400 font-normal mt-1">
                                                        {exp.company}
                                                    </h4>
                                                </div>
                                                <div className="flex items-center gap-1.5 mt-2 sm:mt-0 text-gray-500">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    <span className="text-xs font-mono">{exp.date}</span>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="text-gray-400 text-sm md:text-base leading-relaxed">
                                                <ul className="space-y-2 list-disc list-inside marker:text-blue-500">
                                                    {exp.description.map((item, i) => (
                                                        <li key={i} className="text-gray-300 font-light">
                                                            {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Tech Stack */}
                                            <div className="pt-3">
                                                <p className="text-[10px] font-semibold text-[#858585] uppercase tracking-wider mb-2">
                                                    Tech Stack
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.tech.map((tech, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2 py-1 text-xs text-[#cccccc] bg-[#1e1e1e] border border-[#3c3c3c] rounded hover:border-blue-500 hover:text-white transition-colors duration-200"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Certificate Button */}
                                            {/* Certificate Button */}
                                            {exp.certificate && (
                                                <div className="pt-3.5">
                                                    <a
                                                        href={exp.certificate}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="
                                                inline-flex items-center gap-2
                                                px-4 py-1.5
                                                text-sm font-medium
                                                text-blue-400
                                                bg-blue-500/10
                                                border border-blue-500/20
                                                rounded-lg
                                                hover:bg-blue-500/20
                                                hover:border-blue-400/40
                                                transition-all duration-200
                                            "
                                                    >
                                                        <span>View Certificate</span>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            stroke="currentColor"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={1.75}
                                                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                            />
                                                        </svg>
                                                    </a>
                                                </div>

                                            )}
                                        </div>
                                    </VerticalTimelineElement>
                                ))}
                            </VerticalTimeline>
                        </div>
                    </div>
                </div>
            </Scrollbars>
        </div>
    );
};

export default MyWork;
