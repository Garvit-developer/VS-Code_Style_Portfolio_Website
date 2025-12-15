


import { Scrollbars } from "react-custom-scrollbars";
import { useEffect } from "react";
import { programming, fullStack, database, Deployment, tools } from "../Components/JSON/skillsData";

const SkillSection = ({ title, skills }) => (
    <div className="mt-8">
        <p className="tracking-tight text-gray-300 text-xl mb-3 font-semibold">{title}</p>

        <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {skills.map((skill) => (
                <div
                    key={skill.name}
                    className="
                        flex items-center gap-3 p-2.5 text-base
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
            <div className="w-full p-5 pb-40">
                <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl text-indigo-500">Skills</h2>

                <p className="mt-3 text-base font-medium max-w-2xl  text-gray-400">
                    Frontend & Backend Development, Database Handling, AI Integration, Cloud Deployment and prompt engineering.
                </p>

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

