import React, { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { FileCode, Check } from "lucide-react";

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
            border: "border-blue-500/20"
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
                "}",
                " ",
                " "
            ],
            language: "javascript",
            border: "border-yellow-500/20"
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
                "    // Experience is the best teacher",
                "}"
            ],
            language: "java",
            border: "border-orange-500/20"
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
                "</section>",
                ""
            ],
            language: "html",
            border: "border-red-500/20"
        }
    ];

    const CodeLine = ({ text, index }) => (
        <div className="flex font-mono text-[13.5px] md:text-[14px] leading-6 hover:bg-[#2a2d2e] transition-colors">
            <span className="w-8 flex-none text-right select-none text-[#858585] mr-4 opacity-50">
                {index + 1}
            </span>
            <span className="text-[#d4d4d4] whitespace-pre">
                {text.replace(/(".*?")/g, '<span class="text-[#ce9178]">$1</span>')
                    .replace(/('.*?')/g, '<span class="text-[#ce9178]">$1</span>')
                    .replace(/(&lt;.*?&gt;)/g, '<span class="text-[#569cd6]">$1</span>') // HTML tags
                    .split(/(<span.*?>.*?<\/span>)/g)
                    .map((part, i) =>
                        part.startsWith('<span') ?
                            <span key={i} dangerouslySetInnerHTML={{ __html: part.replace(/<span.*?>(.*?)<\/span>/, '$1') }} className={part.includes('text-[#ce9178]') ? "text-[#ce9178]" : "text-[#569cd6]"} /> :
                            <span key={i} className={
                                part.includes('//') || part.trim().startsWith('/*') ? "text-[#6a9955]" :
                                    part.trim().startsWith('<!--') ? "text-[#6a9955]" :
                                        part.includes('const') || part.includes('let') || part.includes('var') || part.includes('struct') || part.includes('void') || part.includes('class') || part.includes('public') ? "text-[#569cd6]" :
                                            part.includes('return') || part.includes('if') || part.includes('while') || part.includes('for') ? "text-[#c586c0]" :
                                                "text-[#d4d4d4]"
                            }>{part}</span>
                    )
                }
            </span>
        </div>
    );

    return (
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

            <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                universal={true}
            >
                <div className="w-full px-6 pt-3 pb-10 font-sans text-left min-h-screen">
                    {/* Header */}
                    <div className="flex flex-col gap-1 mb-8">
                        <h1 className="text-5xl md:text-6xl font-thin text-white tracking-tight">
                            My <span className="font-bold text-blue-500">Vision</span>
                        </h1>
                        <div className="max-w-3xl space-y-4 text-gray-400 leading-relaxed font-light text-lg">
                            <p>
                                design isn't just about making things look beautiful—it's about solving real problems that matter. <br/>
                                I build things from existing components, refining and adding value to create something unique.
                            </p>
                        </div>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl">
                       {philosophies.map((item, idx) => (
    <div
        key={idx}
        className="
            group relative bg-[#1e1e1e] rounded-lg overflow-hidden
            border border-[#3c3c3c]
            hover:border-[#007acc]/50 hover:shadow-[0_0_15px_rgba(0,122,204,0.1)]
            transition-all duration-300
        "
    >
        {/* VS Code Title Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-[#1e1e1e]">
            <div className="flex items-center gap-2">
                {item.icon}
                <span className="text-xs font-normal text-[#cccccc] group-hover:text-white transition-colors">
                    {item.filename}
                </span>
            </div>

            {/* macOS Dots (same as learning cards) */}
            <div className="flex items-center space-x-2">
                {/* Close */}
                <div
                    className="
                        w-3 h-3 rounded-full
                        bg-red-500/20
                        border border-red-500/50
                        transition-all duration-200
                        group-hover:bg-red-500
                        group-hover:border-red-500
                    "
                />

                {/* Minimize */}
                <div
                    className="
                        w-3 h-3 rounded-full
                        bg-yellow-500/20
                        border border-yellow-500/50
                        transition-all duration-200
                        group-hover:bg-yellow-400
                        group-hover:border-yellow-400
                    "
                />

                {/* Maximize */}
                <div
                    className="
                        w-3 h-3 rounded-full
                        bg-green-500/20
                        border border-green-500/50
                        transition-all duration-200
                        group-hover:bg-green-500
                        group-hover:border-green-500
                    "
                />
            </div>
        </div>

        {/* Code Area */}
        <div className="p-1 md:p-2 bg-[#1e1e1e] overflow-x-auto">
            <div className="min-w-max">
                {item.code.map((line, i) => (
                    <CodeLine key={i} text={line} index={i} />
                ))}
            </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="h-6 bg-[#007acc] text-white flex items-center px-3 gap-4 text-[10px] font-medium">
            <div className="flex items-center gap-1">
                <FileCode className="w-3 h-3" />
                {item.language.toUpperCase()}
            </div>
            <div className="flex items-center gap-1 ml-auto">
                Ln {item.code.length}, Col 1
                <div className="ml-2 flex items-center gap-1">
                    UTF-8
                </div>
            </div>
        </div>
    </div>
))}

                    </div>
                </div>
            </Scrollbars>
        </div>
    );
};

export default MyVision;
