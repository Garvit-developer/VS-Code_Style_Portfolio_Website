import React, { useEffect } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Rocket, Heart, Brain, Layers } from "lucide-react";

const Philosophy = () => {
    useEffect(() => {
        document.title = "Philosophy | Garvit Dani";
    }, []);

    const cards = [
        {
            icon: <Heart className="w-6 h-6 text-rose-500" />,
            title: "Passion & Purpose",
            desc: "For me, design isn't just about making things look beautiful—it's about solving real problems that matter. I create with intent, ensuring every pixel serves a purpose.",
            gradient: "from-rose-500/20 to-pink-500/5",
            border: "group-hover:border-rose-500/50"
        },
        {
    icon: <Brain className="w-6 h-6 text-indigo-500" />,
    title: "Problem-First Thinking",
    desc: "I approach development by first understanding the problem, the user, and the goal—then translating that clarity into simple, effective web solutions.",
    gradient: "from-indigo-500/20 to-violet-500/5",
    border: "group-hover:border-indigo-500/50"
},
{
    icon: <Rocket className="w-6 h-6 text-amber-500" />,
    title: "Learning by Building",
    desc: "I believe the best learning comes from building real projects, experimenting with ideas, and improving continuously through feedback and iteration.",
    gradient: "from-amber-500/20 to-orange-500/5",
    border: "group-hover:border-amber-500/50"
},
{
    icon: <Layers className="w-6 h-6 text-emerald-500" />,
    title: "Clarity over Complexity",
    desc: "I focus on writing clean, readable code and designing straightforward user experiences that solve real problems without unnecessary complexity.",
    gradient: "from-emerald-500/20 to-teal-500/5",
    border: "group-hover:border-emerald-500/50"
}

    ];

    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
        >
            <div className="w-full p-5 pb-40 font-sans text-left">
                {/* Header matching Projects/Skills/Experience pages */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-white">
                        What
                    </h2>
                    <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-indigo-500">
                        I Do
                    </h2>
                </div>

                <p className="mt-3 text-base font-medium max-w-2xl text-gray-400 mb-10 leading-relaxed">
                    Merging creativity with engineering to build digital experiences that matter.
                </p>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 gap-6 max-w-5xl">
                    {cards.map((card, idx) => (
                        <div
                            key={idx}
                            className={`
                                group relative p-6 rounded-xl border border-[#30363d] bg-[#161b22] 
                                hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden
                                ${card.border} hover:shadow-xl
                            `}
                        >
                            {/* Gradient Background Effect - kept subtle */}
                            <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${card.gradient} blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-full -mr-16 -mt-16 pointer-events-none`} />

                            <div className="relative z-10 flex flex-col h-full">

                                <div className="flex gap-4 items-center">
                                <div className="mb-4 p-2 bg-[#0d1117] w-fit rounded-lg border border-[#30363d] group-hover:scale-110 transition-transform duration-300 shadow-md">
                                    {card.icon}
                                </div>

                                <div className="text-lg font-bold text-gray-100 mb-3 tracking-tight">
                                    {card.title}
                                </div>
                                </div>

                                <p className="text-gray-400 leading-relaxed text-base flex-grow">
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Scrollbars>
    );
};

export default Philosophy;
