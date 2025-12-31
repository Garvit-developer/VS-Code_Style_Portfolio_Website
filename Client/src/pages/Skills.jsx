
import { Scrollbars } from "react-custom-scrollbars";
import { useEffect } from "react";
import { programming, fullStack, database, Deployment, tools } from "../Components/JSON/skillsData.js";
import { motion, AnimatePresence } from "framer-motion";
import {
    VscCode,
    VscDatabase
} from "react-icons/vsc";
import { FaReact, FaNodeJs, FaJs } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

const Particle = ({ delay, icon: Icon, top, left, size, text, bottom }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
            opacity: [0.1, 0.1, 0.],
            y: [0, -20, 0],
            rotate: [0, 25, 0]
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            delay,
            ease: "easeInOut"
        }}
        className="absolute pointer-events-none z-0 text-blue-500/20"
        style={{ top, bottom, left, fontSize: size, color: text }}
    >
        <Icon />
    </motion.div>
);

const SkillSection = ({ title, skills }) => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 940px)" });

    return (
        <div className="mt-8 scrollable">
            {/* Grid Background */}
            {!isTabletOrMobile && (
                <>
                    <Particle icon={FaNodeJs} top="92%" left="22%" size="24px" text="#21a366" delay={2} />
                    <Particle icon={VscCode} top="44%" left="45%" size="24px" text="#29a5ed" delay={8} />
                    <Particle icon={FaJs} top="70%" left="80%" size="23px" text="#ffd600" delay={5} />
                    <Particle icon={VscDatabase} top="8%" left="72%" size="26px" text="#6878f7" delay={12} />
                    <Particle icon={FaReact} top="6%" left="88%" size="29px" text="#29a5ed" delay={0} />
                    <Particle icon={VscCode} top="90%" left="64%" size="23px" text="#29a5ed" delay={5} />
                    <Particle icon={VscDatabase} top="38%" left="12%" size="26px" text="#6878f7" delay={12} />
                    <Particle icon={FaReact} top="8%" left="38%" size="29px" text="#29a5ed" delay={0} />
                    <Particle icon={FaReact} bottom="-20%" left="32%" size="29px" text="#29a5ed" delay={0} />
                    <Particle icon={FaJs} bottom="-35%" left="80%" size="23px" text="#ffd600" delay={5} />
                    <Particle icon={FaNodeJs} bottom="-65%" left="42%" size="24px" text="#21a366" delay={2} />
                </>
            )}


            <p className="tracking-tight text-gray-300 text-xl mb-3 font-semibold">{title}</p>

            <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="
                        flex items-center gap-3 p-2.5 text-base0
                        rounded-lg bg-white/5 backdrop-blur-sm
                        hover:bg-white/10 transition-all duration-200 
                        hover:scale-[1.03] z-50
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
};

// 📌 Main Page — Small UI
const Skills = () => {
    useEffect(() => {
        document.title = "Skill Section | Garvit Dani";
    }, []);

    return (
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} universal={true}>
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />
            <div className="w-full flex flex-col min-h-screen">
                <div className="w-full px-5 pb-2 md:pb-5">
                    {/* Header */}

                    <div className="flex flex-col gap-3">
                        <h1 className="text-4xl md:text-5xl font-thin text-white tracking-tight">
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
            </div>
        </Scrollbars>
    );
};

export default Skills;
