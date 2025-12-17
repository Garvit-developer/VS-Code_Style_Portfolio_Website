import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Command, FileText, Code, Terminal, Monitor, Zap } from "lucide-react";
import { projectsdata } from "../JSON/projectsdata";
import { programming, fullStack, database, Deployment, tools } from "../JSON/skillsData";
import { experiences } from "../JSON/experienceData";

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    // Close on click outside
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

        // 1. Search Pages
        const pages = [
            { title: "Home", path: "/", icon: <Monitor className="w-4 h-4 text-blue-400" />, desc: "Portfolio Home" },
            { title: "About", path: "/", icon: <FileText className="w-4 h-4 text-green-400" />, desc: "About Me" },
            { title: "Experience", path: "/Experience", icon: <Monitor className="w-4 h-4 text-purple-400" />, desc: "Professional Journey" },
            { title: "My Vision", path: "/MyVision", icon: <Zap className="w-4 h-4 text-yellow-400" />, desc: "My Vision & Values" },
            { title: "Skills", path: "/Skills", icon: <Code className="w-4 h-4 text-pink-400" />, desc: "Tech Stack" },
            { title: "Contact", path: "/Email", icon: <FileText className="w-4 h-4 text-red-400" />, desc: "Get in Touch" },
        ];

        pages.forEach(page => {
            if (page.title.toLowerCase().includes(term) || page.desc.toLowerCase().includes(term)) {
                hits.push({ ...page, category: "Page" });
            }
        });

        // 2. Search Projects
        const projects = projectsdata(); // It's a function call
        projects.forEach(proj => {
            if (proj.name.toLowerCase().includes(term) ||
                proj.title.toLowerCase().includes(term) ||
                proj.description.toLowerCase().includes(term)) {
                hits.push({
                    title: proj.name,
                    path: "/Projects", // Could be specific project path
                    icon: <Monitor className="w-4 h-4 text-cyan-400" />,
                    desc: "Project",
                    category: "Project"
                });
            }
        });

        // 3. Search Skills
        const allSkills = [...programming, ...fullStack, ...database, ...Deployment, ...tools];
        allSkills.forEach(skill => {
            if (skill.name.toLowerCase().includes(term)) {
                hits.push({
                    title: skill.name,
                    path: "/Skills",
                    icon: <Code className="w-4 h-4 text-orange-400" />,
                    desc: "Skill",
                    category: "Skill"
                });
            }
        });

        // 4. Search Experience
        experiences.forEach(exp => {
            if (exp.company.toLowerCase().includes(term) || exp.title.toLowerCase().includes(term)) {
                hits.push({
                    title: `${exp.title} @ ${exp.company}`,
                    path: "/Experience",
                    icon: <Monitor className="w-4 h-4 text-indigo-400" />,
                    desc: "Experience",
                    category: "Experience"
                });
            }
        });

        setResults(hits.slice(0, 8)); // Limit results
    };

    const handleSelect = (path) => {
        navigate(path);
        setIsOpen(false);
        setQuery("");
    };

    return (
        <div className="relative w-full max-w-lg mx-auto hidden md:block" ref={searchRef}>
            <div className="relative group flex items-center justify-center">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <Search className="h-3.5 w-3.5 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-8 pr-10 py-1 border border-[#3c3c3c] rounded-[4px] leading-4 bg-[#252526] text-gray-300 placeholder-gray-500 text-sm focus:outline-none focus:bg-[#2d2d2d] focus:border-[#007fd4] focus:ring-1 focus:ring-[#007fd4] transition-all"
                    placeholder="Search (Ctrl+K)"
                    value={query}
                    onChange={handleSearch}
                    onFocus={() => query.trim() && setIsOpen(true)}
                />
            </div>

            {/* Results Dropdown */}
            {isOpen && (
                <div className="absolute mt-1 w-full bg-[#252526] border border-[#454545] rounded-md shadow-2xl z-50 overflow-hidden text-left">
                    {results.length > 0 ? (
                        <ul className="max-h-80 overflow-y-auto py-1">
                            {results.map((result, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelect(result.path)}
                                    className="cursor-pointer px-3 py-1.5 hover:bg-[#094771] hover:text-white flex items-center gap-2 group transition-colors"
                                >
                                    <div className="flex-shrink-0 flex items-center justify-center">
                                        {result.icon}
                                    </div>
                                    <div className="flex-1 flex items-center min-w-0 overflow-hidden">
                                        <span className="text-sm font-medium text-gray-200 truncate group-hover:text-white mr-2">
                                            {result.title}
                                        </span>
                                        <span className="text-xs text-gray-500 truncate group-hover:text-gray-300">
                                            — {result.desc}
                                        </span>
                                    </div>
                                    <div className="flex-shrink-0 ml-auto">
                                        <span className="text-[10px] uppercase border border-gray-600 rounded px-1.5 py-0.5 text-gray-400 group-hover:text-gray-300 group-hover:border-gray-400">
                                            {result.category}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-3 py-4 text-center text-gray-500 text-xs">
                            <p>No results found</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
