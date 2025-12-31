import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Code, Monitor, Zap } from "lucide-react";
import { projectsdata } from "../JSON/projectsdata";
import { programming, fullStack, database, Deployment, tools } from "../JSON/skillsData.js";
import { experiences } from "../JSON/experienceData";

const MobileSearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const navigate = useNavigate();

    /* Close on outside click */
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setIsOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /* Auto focus input when opened */
    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (!value.trim()) {
            setResults([]);
            return;
        }

        const term = value.toLowerCase();
        let hits = [];

        const pages = [
            { title: "Home", path: "/", icon: <Monitor className="w-3 h-3 text-blue-400" />, desc: "Portfolio Home" },
            { title: "About", path: "/", icon: <FileText className="w-3 h-3 text-green-400" />, desc: "About Me" },
            { title: "Experience", path: "/Experience", icon: <Monitor className="w-3 h-3 text-purple-400" />, desc: "Professional Journey" },
            { title: "My Vision", path: "/MyVision", icon: <Zap className="w-3 h-3 text-yellow-400" />, desc: "Vision & Values" },
            { title: "Skills", path: "/Skills", icon: <Code className="w-3 h-3 text-pink-400" />, desc: "Tech Stack" },
            { title: "Contact", path: "/Email", icon: <FileText className="w-3 h-3 text-red-400" />, desc: "Get in Touch" },
        ];

        pages.forEach(p => {
            if (p.title.toLowerCase().includes(term) || p.desc.toLowerCase().includes(term)) {
                hits.push({ ...p, category: "Page" });
            }
        });

        projectsdata().forEach(proj => {
            if (
                proj.name.toLowerCase().includes(term) ||
                proj.title.toLowerCase().includes(term) ||
                proj.description.toLowerCase().includes(term)
            ) {
                hits.push({
                    title: proj.name,
                    path: "/Projects",
                    icon: <Monitor className="w-3 h-3 text-cyan-400" />,
                    desc: "Project",
                    category: "Project"
                });
            }
        });

        [...programming, ...fullStack, ...database, ...Deployment, ...tools].forEach(skill => {
            if (skill.name.toLowerCase().includes(term)) {
                hits.push({
                    title: skill.name,
                    path: "/Skills",
                    icon: <Code className="w-3 h-3 text-orange-400" />,
                    desc: "Skill",
                    category: "Skill"
                });
            }
        });

        experiences.forEach(exp => {
            if (
                exp.company.toLowerCase().includes(term) ||
                exp.title.toLowerCase().includes(term)
            ) {
                hits.push({
                    title: `${exp.title} @ ${exp.company}`,
                    path: "/Experience",
                    icon: <Monitor className="w-3 h-3 text-indigo-400" />,
                    desc: "Experience",
                    category: "Experience"
                });
            }
        });

        setResults(hits.slice(0, 8));
    };

    const handleSelect = (path) => {
        navigate(path);
        setIsOpen(false);
        setQuery("");
    };

    return (
        <div ref={searchRef} className="relative block w-[50px]">
            {/* SEARCH ICON */}
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="
                    w-6 h-6 flex items-center justify-center
                    rounded-md
                    hover:border-[#007acc]
                    transition"
            >
                <Search className="w-4 h-4 text-[#cccccc]" />
            </button>

            {/* SEARCH PANEL (LEFT SIDE) */}
            {isOpen && (
                <div className="
                    absolute right-full mr-[-25px] top-7
                    w-72
                    bg-[#252526]
                    border border-[#3c3c3c]
                    rounded-sm
                    shadow-2xl
                    z-50
                ">
                    {/* INPUT */}
                    <div className="p-0.5 border-b border-[#3c3c3c]">
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={handleSearch}
                            placeholder="Search..."
                            className="
                                w-full h-7 px-2
                                bg-[#1e1e1e]
                                border border-[#3c3c3c]
                                rounded
                                text-[11px]
                                text-[#cccccc]
                                placeholder-[#6a6a6a]
                                focus:outline-none
                                focus:border-[#007acc]
                            "
                        />
                    </div>

                    {/* RESULTS */}
                    {query && (
                        results.length > 0 ? (
                            <ul className="max-h-72 overflow-y-auto py-1">
                                {results.map((item, i) => (
                                    <li
                                        key={i}
                                        onClick={() => handleSelect(item.path)}
                                        className="
                                            px-2 py-1
                                             flex-row gap-2 items-center justify-between
                                            cursor-pointer
                                            text-[12px]
                                            hover:bg-[#094771]
                                        "
                                    >
                                        {item.icon}
                                        <span className="text-[#cccccc] truncate">
                                            {item.title}
                                        </span>
                                        <span className="text-[#858585]">— {item.desc}</span>
                                        <span className="ml-auto text-[9px] border border-[#5a5a5a] rounded px-1 text-[#9a9a9a]">
                                            {item.category}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="py-2 text-center text-[11px] text-[#858585]">
                                No results found
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
};

export default MobileSearchBar;
