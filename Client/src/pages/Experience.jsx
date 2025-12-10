import { Scrollbars } from "react-custom-scrollbars";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useEffect } from "react";
import { Briefcase, Calendar } from "lucide-react";

const MyWork = () => {
    useEffect(() => {
        document.title = "Professional Experience | Garvit Dani";
    }, []);

    const experiences = [
        {
            title: "MERN Stack Developer Intern",
            company: "Geek Theory",
            date: "Aug - Nov 2025",
            description: [
                "Developed scalable RESTful APIs using Node.js & Express, improving backend throughput by 30%.",
                "Implemented secure JWT + Bcrypt authentication, reducing unauthorized access attempts.",
                "Integrated LLM-based AI chatbots using OpenAI/Groq APIs, boosting user engagement by 25%.",
                "Built responsive, modular React components ensuring seamless cross-device compatibility.",
                "Added lazy loading and performance optimizations, reducing page load times by 40%.",
            ],
            tech: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "OpenAI API"],
            logo: "/GeekTheoryIcon.webp",
        },
        {
            title: "Web Designing Internship",
            company: "Job Sense",
            date: "Aug 2023",
            description: [
                "Designed and developed web pages using HTML, CSS, and JavaScript",
                "Created responsive layouts and improved UI structure",
                "Implemented interactive features using JavaScript",
                "Learned basics of frontend design best practices While Maintained clean and structured code",
                "Received an Excellent Performance rating during the internship"
            ],
            tech: ["HTML", "CSS", "JavaScript"],
            logo: "/download.png",
        },
    ];

    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
        >
            <div className="w-full p-5 pb-40 text-left">
                {/* Header matching Projects/Skills pages */}
                <div className="flex items-center gap-2">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
                    Work
                </h2>
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-indigo-500">
                    Experience
                </h2>
                </div>

                <p className="mt-3 text-base font-medium max-w-2xl text-gray-400">
                    My professional journey, internships, and industry projects.
                </p>

                {/* Timeline Section */}
                <div className="w-full mt-8">
                    <VerticalTimeline layout="1-column-left" lineColor="#30363d">
                        {experiences.map((exp, index) => (
                            <VerticalTimelineElement
                                key={index}
                                className="vertical-timeline-element--work"
                                contentStyle={{
                                    background: "#161b22",
                                    color: "#c9d1d9",
                                    border: "1px solid #30363d",
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                    borderRadius: "0.75rem",
                                    padding: "1.5rem",
                                    textAlign: "left",
                                }}
                                contentArrowStyle={{
                                    borderRight: "7px solid #3f3f3fff",
                                }}
                                iconStyle={{
                                    background: "#6366f1",
                                    color: "#fff",
                                    boxShadow: "0 0 0 4px #1f2937",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    overflow: "hidden",
                                    border: "2px solid #0d1117"
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
                                        <Briefcase className="text-white w-6 h-6" />
                                    )
                                }
                            >
                                <div className="space-y-3">
                                    {/* Header with timeline date */}
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between pb-3 border-b border-gray-800">
                                        <div className="flex-1">
                                            <h3 className="mt-3  text-xl font-bold text-white tracking-tight">
                                                {exp.title}
                                            </h3>
                                            <h4 className="text-base text-indigo-400 font-semibold">
                                                {exp.company}
                                            </h4>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-5 sm:mt-3 text-gray-400">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm font-medium">{exp.date}</span>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="text-gray-400 text-sm md:text-base leading-relaxed">
                                        <ul className="space-y-2 list-disc list-inside">
                                            {exp.description.map((item, i) => (
                                                <li key={i} className="text-gray-400">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="pt-3">
                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                                            Tech Stack
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.tech.map((tech, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-gray-300 border border-gray-700 hover:border-indigo-500 hover:text-indigo-400 transition-colors duration-200"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </VerticalTimelineElement>
                        ))}
                    </VerticalTimeline>
                </div>
            </div>
        </Scrollbars>
    );
};

export default MyWork;
