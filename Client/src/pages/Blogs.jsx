import { Scrollbars } from "react-custom-scrollbars";
import { useMediaQuery } from "react-responsive";
import { blogsdata } from "../Components/JSON/BlogsData";
import { useEffect } from "react";

const Blogs = () => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });
    const blogs = blogsdata();

    useEffect(() => {
        document.title = "Blogs";
    }, []);

    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
        >
            {!isTabletOrMobile ? (
                <article className="pl-7  pb-40 mb-16 pt-6 scrollbar text-left ">
                    <div className="md:flex md:mr-0 ">
                        <div className="md:flex items-cente text0 ">
                            <h1 className="lg:text-5xl text-indigo-500 font-bold leading-tight text-3xl">
                                Blogs
                            </h1>
                        </div>
                    </div>
                    <div className="pt-3 text-gray-300 font-medium dark:text-gray-400">
                        Blogs Written by me, Collaborated Blogs and some of my favorite and
                        interesting blogs written by others.
                    </div>
                    <section className="pr-5  mt-7 mb-12">
                        <article>
                            <section className="mt-6 grid grid-cols-1s xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1  gap-x-6 gap-y-8">
                                {blogs?.map((blog) => (
                                    <a
                                        key={blog.title}
                                        href={blog.link}
                                        className="bg-white group relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform duration-200"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <div className="relative w-full ">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="w-full h-full object-center object-cover"
                                                style={{ height: "12vw" }}
                                            />
                                        </div>
                                        <div className="px-3 py-4">
                                            <h3 className="text-sm text-gray-500 pb-2">
                                                <span className="bg-gray-900 py-1 px-2 text-white rounded-lg">
                                                    <span className="absolute inset-0"></span>
                                                    {blog.tag}
                                                </span>
                                            </h3>
                                            <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                                                {blog.title}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </section>
                        </article>
                    </section>
                </article>
            ) : (
                <article className=" p-2 pl-3  pb-40  scrollbar text-left ">
                    <div className=" items-cente text0 ">
                        <h1 className="lg:text-5xl text-indigo-500 font-bold leading-tight text-3xl">
                            Blogs
                        </h1>
                    </div>
                    <div className="pt-3 text-gray-300 font-medium text-sm dark:text-gray-400">
                        Blogs Written by me, Collaborated Blogs and some of my favorite and
                        interesting blogs written by others.
                    </div>
                    <section className=" mt-2 mb-12">
                        <article>
                            <section className="mt-6 grid grid-1">
                                {blogs?.map((blog) => (
                                    <a
                                        key={blog.title}
                                        href={blog.link}
                                        className="bg-white mb-5   rounded-lg overflow-hidden shadow-lg hover:shadow-2xl  "
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <div className=" w-full">
                                            <img
                                                src={blog.image}
                                                alt={blog.title}
                                                className="object-center object-cover"
                                                width="100%"
                                                style={{ height: "35vw" }}
                                            />
                                        </div>
                                        <div className="px-3 py-4">
                                            <h3 className="text-sm text-gray-500 pb-2">
                                                <span className="bg-gray-900 py-1 px-2 text-white rounded-lg">
                                                    <span className="absolute inset-0"></span>
                                                    {blog.tag}
                                                </span>
                                            </h3>
                                            <p className="text-base font-semibold text-gray-900 group-hover:text-indigo-600">
                                                {blog.title}
                                            </p>
                                        </div>
                                    </a>
                                ))}
                            </section>
                        </article>
                    </section>
                </article>
            )}
        </Scrollbars>
    );
};

export default Blogs;
