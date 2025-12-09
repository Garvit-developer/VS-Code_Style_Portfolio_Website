


import { Scrollbars } from "react-custom-scrollbars";
import { useEffect } from "react";

const programming = [
    { name: "C language", icon: "https://images.icon-icons.com/2415/PNG/512/c_plain_logo_icon_146610.png" },
    { name: "JavaScript", icon: "https://upload.wikimedia.org/wikipedia/commons/9/99/Unofficial_JavaScript_logo_2.svg" },
    { name: "Core Java", icon: "https://logo-teka.com/wp-content/uploads/2025/09/java-icon-logo.svg" },
];

const fullStack = [
    { name: "HTML5", icon: "https://img.icons8.com/color/144/000000/html-5.png" },
    { name: "CSS3", icon: "https://img.icons8.com/color/144/000000/css3.png" },
    { name: "React.js", icon: "https://img.icons8.com/color/144/000000/react-native.png" },
    { name: "Node.js", icon: "https://img.icons8.com/fluency/144/000000/node-js.png" },
    { name: "express.js", icon: "https://img.icons8.com/fluency/144/000000/express-js.png" },
    { name: "Tailwind ", icon: "https://bourhaouta.gallerycdn.vsassets.io/extensions/bourhaouta/tailwindshades/0.0.5/1592520164095/Microsoft.VisualStudio.Services.Icons.Default" },
    { name: "Rest API", icon: "https://miro.medium.com/v2/resize:fit:1100/format:webp/1*106km8msNjMje898Y6H7ww.png" },
];

const database = [
    { name: "MySQL", icon: "https://www.citypng.com/public/uploads/preview/hd-mysql-dolphin-logo-sign-symbol-png-701751694771793vkktlflenp.png" },
    { name: "MongoDB", icon: "https://img.icons8.com/color/144/000000/mongodb.png" },
];

const Deployment = [


    { name: "Vercel", icon: "https://www.svgrepo.com/show/354513/vercel-icon.svg" },
    { name: "Netlify", icon: "https://images.icon-icons.com/2699/PNG/512/netlify_logo_icon_169923.png" },
    { name: "Env management ", icon: "https://api.nuget.org/v3-flatcontainer/dotenv.net/2.0.0/icon" },
];

const tools = [{ name: "Git", icon: "https://img.icons8.com/color/144/000000/git.png" },
{ name: "GitHub", icon: "https://img.icons8.com/fluency/144/000000/github.png" },
{ name: "Visual Studio Code", icon: "https://img.icons8.com/fluency/144/000000/visual-studio-code-2019.png" },
{ name: "Antigravity", icon: "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/google-antigravity-logo-icon.png" },
{ name: "Postman", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTILwHh21Dky51ePyPy2V_qsPeQWd5n136Sa8PQuhIMmOGLpprK6Zt7qWn9cRL21LE3RzM&usqp=CAU" },
{ name: "Figma", icon: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg" },
];

const SkillSection = ({ title, skills }) => (
    <div className="mt-8">
        <p className="tracking-tight text-gray-300 text-xl mb-3 font-semibold">{title}</p>

        <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {skills.map((skill) => (
                <div
                    key={skill.name}
                    className="
                        flex items-center gap-3 p-3 
                        rounded-lg bg-white/5 backdrop-blur-sm
                        hover:bg-white/10 transition-all duration-200 
                        hover:scale-[1.03]
                    "
                >
                    <div className="h-10 w-10 flex items-center justify-center bg-white rounded-md overflow-hidden">
                        <img
                            src={skill.icon}
                            alt={skill.name}
                            className="h-8 w-8 object-contain"
                        />
                    </div>
                    <p className="text-base font-medium text-gray-100">{skill.name}</p>
                </div>
            ))}
        </dl>
    </div>
);

// 📌 Main Page — Small UI
const Skills = () => {
    useEffect(() => {
        document.title = "Skills";
    }, []);

    return (
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} universal={true}>
            <div className="w-full p-5 pb-40">
                <h2 className="text-3xl lg:text-4xl font-bold text-indigo-500">Skills</h2>

                <p className="mt-3 text-base max-w-2xl text-gray-300">
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

