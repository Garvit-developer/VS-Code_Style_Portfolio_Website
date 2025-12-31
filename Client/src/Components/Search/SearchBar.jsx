import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, FileText, Code, Monitor, Zap } from "lucide-react";
import { projectsdata } from "../JSON/projectsdata";
import { programming, fullStack, database, Deployment, tools } from "../JSON/skillsData.js";
import { experiences } from "../JSON/experienceData";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (!value.trim()) {
            setResults([]);
            setIsOpen(false);
            return;
        }

        setIsOpen(true);
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

        pages.forEach(page => {
            if (
                page.title.toLowerCase().includes(term) ||
                page.desc.toLowerCase().includes(term)
            ) {
                hits.push({ ...page, category: "Page" });
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
        <div
            ref={searchRef}
            className="relative w-full max-w-[50px] sm:max-w-[160px] md:max-w-[270px] lg:max-w-lg mx-auto hidden sm:block"
        >
            {/* SEARCH INPUT */}
            <div className="relative flex items-center justify-center">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Search className="w-[11px] h-[11px] text-[#6a6a6a]" />
                </span>

                <input
                    type="text"
                    className="
                        w-xl sm:w-full  h-[21px]
                        pl-6 pr-2
                        bg-[#1e1e1e]
                        border border-[#3c3c3c]
                        rounded-[7px]
                        text-[11px]
                        text-[#cccccc]
                        placeholder-[#6a6a6a]
                        focus:outline-none
                        focus:border-[#007acc]
                        transition
                    "
                    placeholder="Search"
                    value={query}
                    onChange={handleSearch}
                    onFocus={() => query.trim() && setIsOpen(true)}
                />
            </div>

            {/* DROPDOWN */}
            {isOpen && (
                <div className="
                    absolute mt-1 w-full
                    bg-[#252526]
                    border border-[#3c3c3c]
                    rounded-[3px]
                    shadow-xl
                    z-50
                ">
                    {results.length > 0 ? (
                        <ul className="max-h-72 overflow-y-auto py-1">
                            {results.map((result, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(result.path)}
                                    className="
                                        px-2 py-1
                                        flex gap-2
                                        cursor-pointer
                                        text-[12px]
                                        hover:bg-[#094771]
                                    "
                                >
                                    <div className="flex items-center gap-2 truncate">
                                        {result.icon}
                                        <span className="text-[#cccccc]">{result.title}</span>
                                        <span className="text-[#858585]"> — {result.desc}</span>
                                        <div className="text-[9px] border border-[#5a5a5a] rounded px-1 text-[#9a9a9a]">
                                            {result.category}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="py-2 text-center text-[11px] text-[#858585]">
                            No results found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
