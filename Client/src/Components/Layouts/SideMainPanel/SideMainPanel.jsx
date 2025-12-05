import { useState } from "react";
import { Link } from "react-router-dom";
import { AvatarIcon, Copyicon, ChatbotIcon } from "../../SVG/IconsSVG";
import styles from "../Layout.module.css";

export const SideMainPanel = (props) => {
    const [selectedSideTab, setselectedSideTab] = useState("main");

    return (
        <div className="side-header text-center">
            <ul className="side-header-menu text-center relative h-full">

                {/* Main Sidebar Toggle Button */}
                <li
                    className={`${props.mainActiveSideButton && selectedSideTab === "main"
                        ? "active"
                        : ""
                        } ${styles.faicons}`}
                    title="Sidebar"
                    onClick={() => {
                        props.toggleSideMainMenu();
                        setselectedSideTab("main");
                    }}
                >
                    <Copyicon width={25} height={25} />
                </li>

                {/* Chatbot Toggle Button */}
                <li
                    className={`${props.showChatbot && selectedSideTab === "chatbot"
                        ? "active"
                        : ""
                        } ${styles.faicons}`}
                    title="Copilot Chat"
                    onClick={() => {
                        props.toggleChatbot();
                        setselectedSideTab("chatbot");
                    }}
                >
                    <ChatbotIcon width={25} height={25} />
                </li>

                {/* About Button at Bottom */}
                <li
                    className={`${styles.faicons}`}
                    style={{ position: "absolute", bottom: "0" }}
                    title="About"
                >
                    <Link to="/">
                        <div className="cursor-pointer" title="About">
                            <AvatarIcon width={30} height={30} />
                        </div>
                    </Link>
                </li>

            </ul>
        </div>
    );
};
