import React from "react";

const GithubStreak = () => {
    return (
        <div className="text-white w-full h-full flex flex-col justify-center items-center overflow-hidden p-8">
            <h1 className="text-4xl text-blue-400 font-bold mb-8">My GitHub Streak</h1>
            <div className="shadow-2xl rounded-xl p-4 bg-[#1e1e1e] border border-[#3c3c3c]">
                <img
                    src="https://github-readme-streak-stats.herokuapp.com/?user=Garvit-developer&theme=dark&background=1e1e1e&hide_border=true&ring=3b82f6&currStreakLabel=3b82f6"
                    alt="GitHub Streak"
                    className="w-full h-auto"
                />
            </div>
            <p className="mt-8 text-gray-400 text-lg max-w-2xl text-center">
                Consistency is key. This real-time chart tracks my continuous coding contributions on GitHub.
            </p>
        </div>
    );
};

export default GithubStreak;
