import React, { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Rocket, Heart, Brain, Layers, FileCode, Check, X, Minus, Square } from "lucide-react";

const MyVision = () => {
    useEffect(() => {
        document.title = "My Vision | Garvit Dani";
    }, []);

    const philosophies = [
        {
            filename: "passion.c",
            icon: <FileCode className="w-4 h-4 text-gray-400" />,
            title: "Passion & Purpose",
            code: [
                "struct Design {",
                "    char* focus;",
                "    char* intent;",
                "};",
                "",
                "void main() {",
                "    // Design isn't just visuals",
                "    struct Design d;",
                "    d.focus = \"Solve Problems\";",
                "    d.intent = \"Create Value\";",
                "}"
            ],
            language: "c",
            accent: "border-gray-500/20"
        },
        {
            filename: "logic.js",
            icon: <FileCode className="w-4 h-4 text-yellow-400" />,
            title: "Problem-First",
            code: [
                "const solve = (problem) => {",
                "    // Understand before building",
                "    let rootCause = analyze(problem);",
                "    ",
                "    if (isUnclear(rootCause)) {",
                "        return askQuestions();",
                "    }",
                "    return simpleSolution(rootCause);",
                "}"
            ],
            language: "javascript",
            accent: "border-yellow-500/20"
        },
        {
            filename: "Growth.java",
            icon: <FileCode className="w-4 h-4 text-orange-400" />,
            title: "Continuous Growth",
            code: [
                "public class Developer {",
                "    public void evolve() {",
                "        while (alive) {",
                "            build();",
                "            fail();",
                "            learn();",
                "        }",
                "    }",
                "}",
                "// Experience is the best teacher"
            ],
            language: "java",
            accent: "border-orange-500/20"
        },
        {
            filename: "index.html",
            icon: <FileCode className="w-4 h-4 text-red-400" />,
            title: "Simplicity",
            code: [
                "<!-- Clarity over Complexity -->",
                "<section id=\"philosophy\">",
                "    <div class=\"clean-ui\">",
                "        <h1>Keep it Simple</h1>",
                "    </div>",
                "    ",
                "    <!-- Code should speak -->",
                "    <!-- for itself -->",
                "</section>"
            ],
            language: "html",
            accent: "border-red-500/20"
        }
    ];

    const CodeLine = ({ text, index }) => (
        <div className="flex font-mono text-sm leading-6">
            <span className="w-8 flex-none text-right select-none text-gray-600 mr-4">
                {index + 1}
            </span>
            <span className="text-gray-300 whitespace-pre">
                {text.replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
                    .replace(/('.*?')/g, '<span class="text-green-400">$1</span>')
                    .replace(/(&lt;.*?&gt;)/g, '<span class="text-blue-400">$1</span>') // HTML tags
                    .split(/(<span.*?>.*?<\/span>)/g)
                    .map((part, i) =>
                        part.startsWith('<span') ?
                            <span key={i} dangerouslySetInnerHTML={{ __html: part.replace(/<span.*?>(.*?)<\/span>/, '$1') }} className={part.includes('text-green') ? "text-green-400" : "text-blue-400"} /> :
                            <span key={i} className={
                                part.includes('//') || part.trim().startsWith('/*') ? "text-gray-500 italic" :
                                    part.trim().startsWith('<!--') ? "text-gray-500 italic" :
                                        part.includes('const') || part.includes('let') || part.includes('var') || part.includes('struct') || part.includes('void') || part.includes('class') || part.includes('public') ? "text-pink-400" :
                                            part.includes('return') || part.includes('if') || part.includes('while') || part.includes('for') ? "text-purple-400" :
                                                "text-gray-200"
                            }>{part}</span>
                    )
                }
            </span>
        </div>
    );

    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
        >
            <div className="w-full p-6 pb-40 font-sans text-left min-h-screen">
                {/* Header */}
                <div className="flex flex-col gap-2 mb-8">
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
                            My
                        </h2>
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-indigo-500">
                            Vision
                        </h2>
                    </div>

                    <div className="mt-2 max-w-3xl space-y-4 text-gray-400 leading-relaxed font-medium">
                        <p>
                            For me, design isn't just about making things look beautiful—it's about solving real problems that matter.
                            I create with intent, ensuring every pixel serves a purpose.
                        </p>
                        <p>
                            I build things from existing components, refining and adding value to create something unique.
                        </p>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {philosophies.map((item, idx) => (
                        <div
                            key={idx}
                            className={`
                                group relative bg-[#0d1117] rounded-lg overflow-hidden
                                border border-gray-800 hover:border-gray-600 transition-all duration-300
                                hover:shadow-2xl hover:-translate-y-2
                            `}
                        >
                            {/* VS Code Title Bar */}
                            <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-gray-800">
                                <div className="flex items-center gap-2">
                                    {item.icon}
                                    <span className="text-xs font-mono text-gray-400 group-hover:text-gray-200 transition-colors">
                                        {item.filename}
                                    </span>
                                </div>
                                <div className="flex gap-1.5">
                                    {/* Mock window controls */}
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700 group-hover:bg-yellow-500/50 transition-colors" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700 group-hover:bg-green-500/50 transition-colors" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-700 group-hover:bg-red-500/50 transition-colors" />
                                </div>
                            </div>

                            {/* Code Area */}
                            <div className="p-4 bg-[#0d1117] overflow-x-auto">
                                <div className="min-w-max">
                                    {item.code.map((line, i) => (
                                        <CodeLine key={i} text={line} index={i} />
                                    ))}
                                </div>
                            </div>

                            {/* Bottom Status Bar Mock - decorative */}
                            <div className="h-6 bg-[#161b22] border-t border-gray-800 flex items-center px-3 gap-4 text-[10px] text-gray-500 font-mono">
                                <div className="flex items-center gap-1">
                                    <FileCode className="w-3 h-3" />
                                    {item.language}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Check className="w-3 h-3" />
                                    Prettier
                                </div>
                                <div className="ml-auto">
                                    Ln {item.code.length}, Col 1
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Scrollbars>
    );
};

export default MyVision;
