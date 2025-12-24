
import { Scrollbars } from "react-custom-scrollbars";
import { useEffect } from "react";
import { programming, fullStack, database, Deployment, tools } from "../Components/JSON/skillsData.js";

const SkillSection = ({ title, skills }) => (
    <div className="mt-8">
        {/* Grid Background */}

        <p className="tracking-tight text-gray-300 text-xl mb-3 font-semibold">{title}</p>

        <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {skills.map((skill) => (
                <div
                    key={skill.name}
                    className="
                        flex items-center gap-3 p-2.5 text-base0
                        rounded-lg bg-white/5 backdrop-blur-sm
                        hover:bg-white/10 transition-all duration-200 
                        hover:scale-[1.03]
                    "
                >
                    <div className="h-9 w-9 flex items-center justify-center bg-white rounded-md overflow-hidden">
                        <img
                            src={skill.icon}
                            alt={skill.name}
                            className="h-8 w-8 object-contain"
                        />
                    </div>
                    <p className="text-medium font-medium text-gray-100">{skill.name}</p>
                </div>
            ))}
        </dl>
    </div>
);

// 📌 Main Page — Small UI
const Skills = () => {
    useEffect(() => {
        document.title = "Skill Section | Garvit Dani";
    }, []);

    return (
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} universal={true}>
             <div
                    className="absolute inset-0 opacity-[0.09] pointer-events-none fixed"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    }}
                />

            <div className="w-full px-5 py-5">
                {/* Header */}

                <div className="flex flex-col gap-3">
                    <h1 className="text-5xl md:text-6xl font-thin text-white tracking-tight">
                        Technical <span className="font-semibold text-blue-500">Skills</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
                        A comprehensive list of technologies, frameworks, and tools I work with to build scalable applications.
                    </p>
                </div>

                <SkillSection title="Programming" skills={programming} />
                <SkillSection title="Full-Stack Development" skills={fullStack} />
                <SkillSection title="Database" skills={database} />
                <SkillSection title="Deployment " skills={Deployment} />
                <SkillSection title="Tools & Platforms" skills={tools} />
            </div>
        </Scrollbars>
    );
};

export default Skills;
