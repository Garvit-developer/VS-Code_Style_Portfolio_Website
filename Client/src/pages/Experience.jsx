import { Scrollbars } from "react-custom-scrollbars";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

const MyWork = () => {
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 943px)" });

    useEffect(() => {
        document.title = "Professional Experience";
    }, []);

    return (
        <Scrollbars
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            universal={true}
        >
            <div>
                {!isTabletOrMobile ? (
                    <div className="p-3  pl-5 pb-60 text-center ">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span className="block lg:text-5xl  font-bold leading-tight text-3xl text-white">
                                Work
                            </span>
                            <span className="block pt-3 text-indigo-500 text-2xl">
                                Industry Experience
                            </span>
                        </h2>
                        <div className="pt-3 w-full timeline">
                            <VerticalTimeline>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: "linear-gradient(to right, #4A00E0, #8E2DE2)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight: "7px solid  #4A00E0",
                                    }}
                                    date="Aug 2021 - present"
                                    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                                    icon={
                                        <img
                                            src={"/velotio.jpg"}
                                            width="500"
                                            height="500"
                                            className="rounded-full"
                                            alt="velotio"
                                        />
                                    }
                                >
                                    <h3 className="vertical-timeline-element-title font-bold">
                                        Software Development Engineer I
                                    </h3>
                                    <h4 className="vertical-timeline-element-subtitle">
                                        Your Company, IN
                                    </h4>
                                    <div className="text-left">
                                        <p>• Work experience Points</p>
                                        <p>
                                            • Tech Stack: JavaScript, TypeScript, React, Node.js,
                                            Redux, SASS, LESS, Bootstrap, Jest, HTML5, CSS3
                                        </p>
                                    </div>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: "linear-gradient(to right, #4A00E0, #8E2DE2)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight: "7px solid  #4A00E0",
                                    }}
                                    date="Dec 2020 - Aug 2021"
                                    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                                    icon={
                                        <img
                                            src={"/hha.png"}
                                            width="500"
                                            height="500"
                                            className="rounded-full"
                                            alt="velotio"
                                        />
                                    }
                                >
                                    <h3 className="vertical-timeline-element-title font-bold">
                                        Software Development Engineer I
                                    </h3>
                                    <h4 className="vertical-timeline-element-subtitle">
                                        Your Company 2, IN
                                    </h4>
                                    <div className="text-left">
                                        <p>• Work experience Points</p>
                                        <p>
                                            • Tech Stack: JavaScript, TypeScript, React, Node.js,
                                            Redux, SASS, LESS, Bootstrap, Jest, HTML5, CSS3
                                        </p>
                                    </div>
                                </VerticalTimelineElement>
                            </VerticalTimeline>
                        </div>
                    </div>
                ) : (
                    <div className=" pt-5 text-center ">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            <span className="block lg:text-5xl  font-bold leading-tight text-3xl text-white">
                                Work
                            </span>
                            <span className="block pt-3 text-indigo-500 text-2xl">
                                Industry Experience
                            </span>
                        </h2>
                        <div className="pt-3 h-full pb-60 w-full">
                            <VerticalTimeline>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: "linear-gradient(to right, #4A00E0, #8E2DE2)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight: "7px solid  #4A00E0",
                                    }}
                                    date="Aug 2021 - present"
                                    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                                    icon={
                                        <img
                                            src={"/velotio.jpg"}
                                            width="500"
                                            height="500"
                                            className="rounded-full"
                                            alt="velotio"
                                        />
                                    }
                                >
                                    <h3 className="vertical-timeline-element-title font-bold">
                                        Software Development Engineer I
                                    </h3>
                                    <h4 className="vertical-timeline-element-subtitle">
                                        Your Company, IN
                                    </h4>
                                    <div className="text-left">
                                        <p>• Work experience Points</p>
                                        <p>
                                            • Tech Stack: JavaScript, TypeScript, React, Node.js,
                                            Redux, SASS, LESS, Bootstrap, Jest, HTML5, CSS3
                                        </p>
                                    </div>
                                </VerticalTimelineElement>
                                <VerticalTimelineElement
                                    className="vertical-timeline-element--work"
                                    contentStyle={{
                                        background: "linear-gradient(to right, #4A00E0, #8E2DE2)",
                                        color: "#fff",
                                    }}
                                    contentArrowStyle={{
                                        borderRight: "7px solid  #4A00E0",
                                    }}
                                    date="Dec 2020 - Aug 2021"
                                    iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
                                    icon={
                                        <img
                                            src={"/hha.png"}
                                            width="500"
                                            height="500"
                                            className="rounded-full"
                                            alt="velotio"
                                        />
                                    }
                                >
                                    <h3 className="vertical-timeline-element-title font-bold">
                                        Software Development Engineer I
                                    </h3>
                                    <h4 className="vertical-timeline-element-subtitle">
                                        Your Company 2, IN
                                    </h4>
                                    <div className="text-left">
                                        <p>• Work experience Points</p>
                                        <p>
                                            • Tech Stack: JavaScript, TypeScript, React, Node.js,
                                            Redux, SASS, LESS, Bootstrap, Jest, HTML5, CSS3
                                        </p>
                                    </div>
                                </VerticalTimelineElement>
                            </VerticalTimeline>
                        </div>
                    </div>
                )}
            </div>
        </Scrollbars>
    );
};

export default MyWork;
