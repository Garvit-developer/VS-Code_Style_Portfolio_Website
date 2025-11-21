import { Scrollbars } from "react-custom-scrollbars";
import { useEffect } from "react";

const Startup = () => {
    useEffect(() => {
        document.title = "Startup";
    }, []);

    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
        >
            {" "}
            <article className="ml-3 scrollbar text-left ">
                <section className="pr-5  mt-5 mb-12">
                    <div className="flex flex-row justify-center items-center h-full rounded-lg bg-applearn bg-center bg-no-repeat bg-cover">
                        <main className="flex flex-col lg:flex-row  backdrop-filter backdrop-blur-md bg-opacity-20 rounded-xl overflow-hidden w-full max-w-5xl shadow-lg m-4 lg:m-6">
                            <div className="flex-1 p-4 lg:p-6">
                                <div className="text-lg text-white mb-4 flex items-center">
                                    <div className="md:flex items-cente text0 ">
                                        <h1 className="pl-3 text-4xl font-bold block w-full py-2  lg:inline">
                                            Under Development
                                        </h1>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </section>{" "}
            </article>
        </Scrollbars>
    );
};

export default Startup;
