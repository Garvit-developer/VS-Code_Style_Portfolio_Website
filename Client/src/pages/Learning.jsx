import { Scrollbars } from "react-custom-scrollbars";
import { useEffect } from "react";
import { learningData } from "../Components/JSON/learning";

const Learning = () => {
    useEffect(() => {
        document.title = "Learnings | Garvit Dani";
    }, []);

    return (
        <div className="h-full w-full overflow-hidden bg-[#1e1e1e]">
            <div className="relative h-full overflow-hidden">
                <Scrollbars
                    autoHide
                    autoHideTimeout={1000}
                    autoHideDuration={200}
                    universal={true}
                >

                    <div className="w-full px-2 pt-8 ml-1 text-left">
                        <div
                            className="absolute inset-0 h-full opacity-[0.09] pointer-events-none fixed"
                            style={{
                                backgroundImage:
                                    "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
                                backgroundSize: "40px 40px"
                            }}
                        />
                        <p className="text-5xl md:text-6xl ml-5 font-thin text-white tracking-tight">
                            Learning <span className="font-semibold text-blue-500">Logs</span>
                        </p>
                        <p className="font-medium pl-5 pb-5 text-gray-400 text-md pt-1 w-4/5">
                            <span className="font-mono text-green-400 mr-2">$</span>
                            Current active learning processes and milestones.
                        </p>

                        <div className="w-full mt-3 mb-5 pb-20 grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 px-5">
                            {learningData.map((item) => (
                                <div key={item.id} className="relative group">
                                    <div className="group absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-60 transition duration-500 blur-sm"></div>
                                    <div className="relative h-full bg-[#1e1e1e] rounded-xl border border-gray-800 p-6 hover:border-gray-600 transition duration-300 flex flex-col">

                                        {/* Header: Command */}
                                        <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
                                            <code className="text-sm text-green-400 font-mono">
                                                &gt; {item.command}
                                            </code>
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

                                        {/* Content */}
                                        <h3 className="text-xl font-bold text-gray-100 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mb-4 flex-grow">
                                            {item.description}
                                        </p>

                                        {/* Tech Stack Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {item.techStack.map((tech, idx) => (
                                                <span key={idx} className="px-2 py-1 text-xs font-mono text-blue-300 bg-blue-900/20 rounded border border-blue-900/50">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Progress Bar & Status */}
                                        <div className="mt-auto pt-4 border-t border-gray-800">
                                            <div className="flex justify-between text-xs font-mono text-gray-500 mb-2">
                                                <span>STATUS: <span className="text-yellow-400">{item.status}</span></span>
                                                <span>{item.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                                <div
                                                    className="bg-blue-500 h-1.5 rounded-full transition-all duration-1000"
                                                    style={{ width: `${item.progress}%` }}
                                                ></div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Scrollbars>
            </div>
        </div>
    );
};

export default Learning;
