// import { Scrollbars } from "react-custom-scrollbars";
// import { useEffect } from "react";

// const programming = [
//     { name: "JavaScript", icon: "https://img.icons8.com/color/144/000000/javascript--v1.png", width: "90%" },
//     { name: "TypeScript", icon: "https://img.icons8.com/color/96/000000/typescript.png", width: "90%" },
//     { name: "Python", icon: "https://img.icons8.com/color/48/null/python--v1.png", width: "90%" },
// ];

// const fullStack = [
//     { name: "React", icon: "https://img.icons8.com/color/144/000000/react-native.png", width: "90%" },
//     { name: "Node.js", icon: "https://img.icons8.com/fluency/144/000000/node-js.png" },
//     { name: "Next.js", icon: "https://i.ibb.co/Kj1TqRv/image.png", width: "90%" },
//     { name: "Tailwind", icon: "https://bourhaouta.gallerycdn.vsassets.io/extensions/bourhaouta/tailwindshades/0.0.5/1592520164095/Microsoft.VisualStudio.Services.Icons.Default" },
//     { name: "Bootstrap", icon: "https://img.icons8.com/color/144/000000/bootstrap.png" },
//     { name: "SASS", icon: "https://img.icons8.com/color/144/000000/sass.png" },
//     { name: "JQuery", icon: "https://img.icons8.com/ios-filled/150/000000/jquery.png", width: "90%" },
// ];

// const database = [
//     { name: "SQL", icon: "https://img.icons8.com/ios-filled/100/000000/sql.png" },
//     { name: "Redis", icon: "https://img.icons8.com/color/48/null/redis.png" },
//     { name: "PostgresSQL", icon: "https://img.icons8.com/color/48/null/postgreesql.png" },
//     { name: "Cassandra", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Cassandra_logo.svg/1200px-Cassandra_logo.svg.png" },
//     { name: "MongoDB", icon: "https://img.icons8.com/color/48/000000/mongodb.png" },
// ];

// const devOps = [
//     { name: "AWS", icon: "https://img.icons8.com/color/144/000000/amazon-web-services.png", width: "70%" },
//     { name: "Cloudflare", icon: "https://i.ibb.co/CnLsjhp/download.png", width: "70%" },
//     { name: "Git", icon: "https://img.icons8.com/color/144/000000/git.png" },
//     { name: "GitHub", icon: "https://img.icons8.com/fluency/144/000000/github.png", width: "80%" },
//     { name: "Bitbucket", icon: "https://img.icons8.com/color/144/000000/bitbucket.png", width: "80%" },
//     { name: "Azure App Service", icon: "https://img.icons8.com/color/144/000000/azure-1.png", width: "80%" },
// ];

// const tools = [
//     { name: "Visual Studio Code", icon: "https://img.icons8.com/fluency/144/000000/visual-studio-code-2019.png", width: "80%" },
//     { name: "Postman", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTILwHh21Dky51ePyPy2V_qsPeQWd5n136Sa8PQuhIMmOGLpprK6Zt7qWn9cRL21LE3RzM&usqp=CAU", width: "80%" },
//     { name: "JIRA", icon: "https://img.icons8.com/color/144/000000/jira.png", width: "80%" },
// ];


// // 📌 Reusable Section Component
// const SkillSection = ({ title, skills }) => (
//     <div className="mt-8">
//         <p className="tracking-tight text-gray-400 text-xl mb-4">{title}</p>

//         <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
//             {skills.map((skill) => (
//                 <div key={skill.name} className="flex items-center space-x-4 p-3 rounded-lg">
//                     <div className="h-14 w-14 flex items-center justify-center bg-white rounded-md gap-3">
//                         <img
//                             src={skill.icon}
//                             alt={skill.name}
//                             width={skill.width || "50px"}
//                             className="p-1"
//                         />
//                     </div>
//                     <p className="text-lg font-medium text-gray-100">{skill.name}</p>
//                 </div>
//             ))}
//         </dl>
//     </div>
// );


// // 📌 Main Page
// const Skills = () => {
//     useEffect(() => {
//         document.title = "Skills";
//     }, []);

//     return (
//         <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} universal={true}>

//             <div className="w-full p-6 pb-40">
//                 <h2 className="text-3xl lg:text-5xl font-bold text-indigo-500">Skills</h2>

//                 <p className="mt-4 text-lg max-w-2xl text-gray-300">
//                     Data Structures and Algorithms, Frontend Development, Backend Development,
//                     Database Management, System Design and Cloud.
//                 </p>

//                 {/* Programming */}
//                 <SkillSection title="Programming" skills={programming} />

//                 {/* Other Sections */}
//                 <SkillSection title="Full-Stack Development" skills={fullStack} />
//                 <SkillSection title="Database" skills={database} />
//                 <SkillSection title="DevOps" skills={devOps} />
//                 <SkillSection title="Tools" skills={tools} />
//             </div>
//         </Scrollbars>
//     );
// };

// export default Skills;


import { Scrollbars } from "react-custom-scrollbars";
import { useEffect } from "react";

const programming = [
    { name: "JavaScript", icon: "https://img.icons8.com/color/144/000000/javascript--v1.png" },
    { name: "TypeScript", icon: "https://img.icons8.com/color/96/000000/typescript.png" },
    { name: "Python", icon: "https://img.icons8.com/color/48/null/python--v1.png" },
];

const fullStack = [
    { name: "React", icon: "https://img.icons8.com/color/144/000000/react-native.png" },
    { name: "Node.js", icon: "https://img.icons8.com/fluency/144/000000/node-js.png" },
    { name: "Next.js", icon: "https://i.ibb.co/Kj1TqRv/image.png" },
    { name: "Tailwind", icon: "https://bourhaouta.gallerycdn.vsassets.io/extensions/bourhaouta/tailwindshades/0.0.5/1592520164095/Microsoft.VisualStudio.Services.Icons.Default" },
    { name: "Bootstrap", icon: "https://img.icons8.com/color/144/000000/bootstrap.png" },
    { name: "SASS", icon: "https://img.icons8.com/color/144/000000/sass.png" },
    { name: "JQuery", icon: "https://img.icons8.com/ios-filled/150/000000/jquery.png" },
];

const database = [
    { name: "SQL", icon: "https://img.icons8.com/ios-filled/100/000000/sql.png" },
    { name: "Redis", icon: "https://img.icons8.com/color/48/null/redis.png" },
    { name: "PostgresSQL", icon: "https://img.icons8.com/color/48/null/postgreesql.png" },
    { name: "Cassandra", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Cassandra_logo.svg/1200px-Cassandra_logo.svg.png" },
    { name: "MongoDB", icon: "https://img.icons8.com/color/48/000000/mongodb.png" },
];

const devOps = [
    { name: "AWS", icon: "https://img.icons8.com/color/144/000000/amazon-web-services.png" },
    { name: "Cloudflare", icon: "https://i.ibb.co/CnLsjhp/download.png" },
    { name: "Git", icon: "https://img.icons8.com/color/144/000000/git.png" },
    { name: "GitHub", icon: "https://img.icons8.com/fluency/144/000000/github.png" },
    { name: "Bitbucket", icon: "https://img.icons8.com/color/144/000000/bitbucket.png" },
    { name: "Azure App Service", icon: "https://img.icons8.com/color/144/000000/azure-1.png" },
];

const tools = [
    { name: "Visual Studio Code", icon: "https://img.icons8.com/fluency/144/000000/visual-studio-code-2019.png" },
    { name: "Postman", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTILwHh21Dky51ePyPy2V_qsPeQWd5n136Sa8PQuhIMmOGLpprK6Zt7qWn9cRL21LE3RzM&usqp=CAU" },
    { name: "JIRA", icon: "https://img.icons8.com/color/144/000000/jira.png" },
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
                    Data Structures and Algorithms, Frontend Development, Backend Development,
                    Database Management, System Design and Cloud.
                </p>

                <SkillSection title="Programming" skills={programming} />
                <SkillSection title="Full-Stack Development" skills={fullStack} />
                <SkillSection title="Database" skills={database} />
                <SkillSection title="DevOps" skills={devOps} />
                <SkillSection title="Tools" skills={tools} />
            </div>
        </Scrollbars>
    );
};

export default Skills;

