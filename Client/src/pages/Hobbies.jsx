import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

const Hobbies = () => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });

    useEffect(() => {
        document.title = "Hobbies";
    }, []);

    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
        >
            {!isTabletOrMobile ? (
                <div className=" ">
                    <main className=" backdrop-filter backdrop-blur-md bg-opacity-20 rounded-xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6">
                        <div className="p-12">
                            <div className="">
                                <h1 className="lg:text-5xl pb-2 text-indigo-500 font-bold leading-tight text-3xl">
                                    Hobbies
                                </h1>
                                <div className=" text-gray-400 dark:text-gray-400">
                                    {" "}
                                    List of stuff i like to do in my Spare Time.
                                </div>
                                <div className="grid grid-cols-3 pt-5  sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    <div className="cursor-pointer block p-1 rounded-md transition-colors hover:bg-gray-50 hover:bg-opacity-30">
                                        <Link to="/blogs">
                                            <div>
                                                <div className="bg-white rounded-md mb-2 flex justify-center items-center">
                                                    <img
                                                        className="h-20 p-3 rounded-md"
                                                        src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-blogging-free-time-wanicon-lineal-color-wanicon.png"
                                                        alt="Blogging icon"
                                                    />
                                                </div>
                                                <h2 className="text-white text-center font-semibold">
                                                    Blogging
                                                </h2>{" "}
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="cursor-pointer block p-1 rounded-md transition-colors hover:bg-gray-50 hover:bg-opacity-30">
                                        <Link to="/gaming">
                                            <div>
                                                <div className="bg-white rounded-md mb-2 flex justify-center items-center">
                                                    <img
                                                        className="h-20 p-3 rounded-md"
                                                        src="https://img.icons8.com/ios/50/000000/controller.png"
                                                        width="80"
                                                        height="50"
                                                        alt="Gaming icon"
                                                    />
                                                </div>
                                                <h2 className="text-white text-center font-semibold">
                                                    Gaming
                                                </h2>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="cursor-pointer block p-1 rounded-md transition-colors hover:bg-gray-50 hover:bg-opacity-30">
                                        <Link to="/anime">
                                            <div>
                                                <div className="bg-white rounded-md mb-2 flex justify-center items-center">
                                                    <img
                                                        className="h-20 rounded-md p-2"
                                                        src="https://img.icons8.com/ios/50/000000/naruto.png"
                                                        alt="naruto icon"
                                                    />
                                                </div>
                                                <h2 className="text-white text-center font-semibold">
                                                    Animes
                                                </h2>
                                            </div>
                                        </Link>
                                    </div>{" "}
                                    <div className="cursor-pointer block p-1 rounded-md transition-colors hover:bg-gray-50 hover:bg-opacity-30">
                                        <Link to="/learning">
                                            <div>
                                                <div className="bg-white rounded-md mb-2 flex justify-center items-center">
                                                    <img
                                                        src="https://img.icons8.com/ios/50/000000/learning.png"
                                                        alt="Learning icon"
                                                        className="h-20 rounded-md p-2"
                                                    />{" "}
                                                </div>
                                                <h2 className="text-white text-center font-semibold">
                                                    Learning
                                                </h2>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="cursor-pointer block p-1 rounded-md transition-colors hover:bg-gray-50 hover:bg-opacity-30">
                                        <Link to="/startup">
                                            <div>
                                                <div className="bg-white rounded-md mb-2 flex justify-center items-center">
                                                    <img
                                                        src="https://img.icons8.com/ios/50/000000/rocket--v1.png"
                                                        className="h-20 p-4 rounded-md"
                                                        alt="Startup icon"
                                                    />
                                                </div>
                                                <h2 className="text-white text-center font-semibold">
                                                    StartUp
                                                </h2>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            ) : (
                <div className=" p-3 ">
                    <main className=" backdrop-filter backdrop-blur-md bg-opacity-20 rounded-xl overflow-hidden w-full shadow-lg ">
                        <div className="p-1">
                            <div className="">
                                <h1 className="lg:text-5xl pb-2 text-indigo-500 font-bold leading-tight text-3xl">
                                    Hobbies
                                </h1>
                                <div className=" text-gray-400 dark:text-gray-400">
                                    {" "}
                                    List of stuff i like to do in my Spare Time.
                                </div>
                                <div className="grid grid-cols-3 pt-5  sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                                    <div className="cursor-pointer block p-1 rounded-md transition-colors hover:bg-gray-50 hover:bg-opacity-30">
                                        <Link to="/blogs">
                                            <div>
                                                <div className="bg-white rounded-md mb-2 flex justify-center items-center">
                                                    <img
                                                        className=" p-3 rounded-md"
                                                        src="https://img.icons8.com/external-wanicon-lineal-color-wanicon/64/000000/external-blogging-free-time-wanicon-lineal-color-wanicon.png"
                                                        alt="Blogging icon"
                                                        width="80"
                                                        height="auto"
                                                    />
                                                </div>
                                                <h2 className="text-white text-center font-semibold">
                                                    Blogging
                                                </h2>{" "}
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="cursor-pointer block p-1 rounded-md transition-colors hover:bg-gray-50 hover:bg-opacity-30">
                                        <Link to="/gaming">
                                            <div>
                                                <div className="bg-white rounded-md mb-2 flex justify-center items-center">
                                                    <img
                                                        className="p-3 rounded-md"
                                                        src="https://img.icons8.com/ios/50/000000/controller.png"
                                                        width="80"
                                                        height="auto"
                                                        alt="Gaming icon"
                                                    />
                                                </div>
                                                <h2 className="text-white text-center font-semibold">
                                                    Gaming
                                                </h2>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="cursor-pointer block p-1 rounded-md transition-colors hover:bg-gray-50 hover:bg-opacity-30">
                                        <Link to="/anime">
                                            <div>
                                                <div className="bg-white rounded-md mb-2 flex justify-center items-center">
                                                    <img
                                                        className="rounded-md p-2"
                                                        src="https://img.icons8.com/ios/50/000000/naruto.png"
                                                        alt="naruto icon"
                                                        width="80"
                                                        height="auto"
                                                    />
                                                </div>
                                                <h2 className="text-white text-center font-semibold">
                                                    Animes
                                                </h2>
                                            </div>
                                        </Link>
                                    </div>{" "}
                                    <div className="cursor-pointer block p-1 rounded-md transition-colors hover:bg-gray-50 hover:bg-opacity-30">
                                        <Link to="/learning">
                                            <div>
                                                <div className="bg-white rounded-md mb-2 flex justify-center items-center">
                                                    <img
                                                        src="https://img.icons8.com/ios/50/000000/learning.png"
                                                        alt="Learning icon"
                                                        className=" rounded-md p-2"
                                                        width="80"
                                                        height="auto"
                                                    />{" "}
                                                </div>
                                                <h2 className="text-white text-center font-semibold">
                                                    Learning
                                                </h2>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="cursor-pointer block p-1 rounded-md transition-colors hover:bg-gray-50 hover:bg-opacity-30">
                                        <Link to="/startup">
                                            <div>
                                                <div className="bg-white rounded-md mb-2 flex justify-center items-center">
                                                    <img
                                                        src="https://img.icons8.com/ios/50/000000/rocket--v1.png"
                                                        className="p-4 rounded-md"
                                                        alt="Startup icon"
                                                        width="80"
                                                        height="auto"
                                                    />
                                                </div>
                                                <h2 className="text-white text-center font-semibold">
                                                    StartUp
                                                </h2>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            )}
        </Scrollbars>
    );
};

export default Hobbies;
