import { Scrollbars } from "react-custom-scrollbars";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { projectsdata } from "../../Components/JSON/projectsdata";
import { useEffect } from "react";

const Projects = () => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });
    const projects = projectsdata();

    useEffect(() => {
        document.title = "Projects";
    }, []);

    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
        >
            <div className=" mt-2 w-full p-2 ml-1 text-left">
                <h2 className="lg:text-5xl pl-5 pb-2 font-bold leading-tight text-indigo-500 text-3xl ">
                    Projects
                </h2>
                <p className=" font-medium pl-5 pb-2 text-gray-400 text-md pt-1 w-4/5 ">
                    College and Side Projects for practice.
                </p>
                {!isTabletOrMobile ? (
                    <div className="w-full mt-3 mb-5 pb-5 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 ">
                        {projects?.map((obj, index) => (
                            <div className="mb-4 p-3" key={index}>
                                <div className="w-full rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500">
                                    <Link to={`/projects/${index + 1}`}>
                                        <div>
                                            <div className="pr-3 pl-3">
                                                <img
                                                    className="rounded-xl"
                                                    src={index === 0 ? "/ayethumb.jpg" : obj.banner}
                                                    alt="Ayedot - Short Blogging Platform logo"
                                                    width="500"
                                                    height="270"
                                                />
                                            </div>
                                            <div className="flex justify-between pr-3 pt-2 pl-3 pb-2">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={obj.logo}
                                                        alt="Ayedot - Short Blogging Platform logo"
                                                        width="35"
                                                        height="35"
                                                    />
                                                    <h1 className="text-lg text-gray-100 font-bold">
                                                        {obj.name}
                                                        <p className=" font-medium text-gray-400 text-sm pt-1 w-4/5 ">
                                                            {obj.title}
                                                        </p>
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full mt-3 pb-60 grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 ">
                        {projects?.map((obj, index) => (
                            <div className="mb-5 " key={index + 125}>
                                <div className="w-full rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:scale-105 transform transition-all duration-500">
                                    <Link to={`/projects/${index + 1}`}>
                                        <div>
                                            <div className="">
                                                <img
                                                    className="rounded-xl"
                                                    src={index === 0 ? "/ayethumb.jpg" : obj.banner}
                                                    alt="Ayedot - Short Blogging Platform logo"
                                                    width="500"
                                                    height="270"
                                                />
                                            </div>
                                            <div className="flex justify-between pr-3 pt-1 pl-3 pb-2">
                                                <div className="flex items-center space-x-4">
                                                    <img
                                                        className="h-10 w-10 rounded-full"
                                                        src={obj.logo}
                                                        alt="Ayedot - Short Blogging Platform logo"
                                                        width="45"
                                                        height="45"
                                                    />
                                                    <h1 className="text-lg text-gray-100 font-bold">
                                                        {obj.name}
                                                        <p className=" font-medium text-gray-400 text-sm pt-1  ">
                                                            {obj.title}
                                                        </p>
                                                    </h1>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Scrollbars>
    );
};

export default Projects;
