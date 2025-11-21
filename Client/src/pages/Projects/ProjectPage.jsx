import { useParams } from "react-router-dom";
import { projectsdata } from "../../Components/JSON/projectsdata";
import ProjectDetails from "../../Components/ProjectDetails";
import { useEffect } from "react";

const ProjectPage = () => {
    const { projectname } = useParams();
    const projects = projectsdata();

    const projectIndex = projectname ? parseInt(projectname) - 1 : -1;

    const projectDetails = projects && projectIndex >= 0 && projectIndex < projects.length
        ? projects[projectIndex]
        : undefined;

    const altt = projectDetails
        ? `${projectDetails.name || ""} - ${projectDetails.title || ""}`
        : "Project Details";

    useEffect(() => {
        document.title = "Project's Detail";
    }, []);

    if (!projectDetails) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <p className="text-gray-400 text-xl">Project not found</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <ProjectDetails projectDetails={projectDetails} altt={altt} />
        </>
    );
};

export default ProjectPage;
