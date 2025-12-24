import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";

const GithubStats = () => {
    const [weeks, setWeeks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [stats, setStats] = useState({
        total: 0,
        currentStreak: 0,
        longestStreak: 0
    });
    useEffect(() => {
        document.title = "GitHub Streak";
    }, []);
    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/github-streak`);
            if (!res.ok) throw new Error("Failed to fetch");
            const data = await res.json();
            setWeeks(data);
            calculateStats(data);
            setLoading(false);
        } catch (err) {
            console.error("Failed to fetch GitHub contributions", err);
            setError(true);
            setLoading(false);
        }
    };

    const calculateStats = (data) => {
        let total = 0;
        let currentStreak = 0;
        let longestStreak = 0;
        let tempStreak = 0;

        // Flatten data to a reverse chronological list of days (Today -> Past)
        const allDays = [];
        data.forEach(week => {
            week.contributionDays.forEach(day => {
                allDays.push(day);
                total += day.contributionCount;
            });
        });

        // Use a standard loop for streak calculation to avoid recursion issues
        // Sort by date descending (Newest first)
        const sortedDays = allDays.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Calculate Current Streak
        // Find today's date to start checking
        const today = new Date().toISOString().split('T')[0];
        let foundStart = false;

        for (let i = 0; i < sortedDays.length; i++) {
            const day = sortedDays[i];

            // Handle case where today might not have data yet/timezone diffs, check if it's today or yesterday
            // Actually simpler: if count > 0, increment. If 0, stop, UNLESS it is today and we haven't contributed yet (then we keep checking from yesterday)

            if (day.contributionCount > 0) {
                currentStreak++;
                foundStart = true;
            } else {
                // If we haven't found a contribution yet and the date is Today, it means the streak is still valid from yesterday
                // But if we hit a 0 after finding contributions, streak is over.
                if (foundStart) break;
                // If it's the very first day we check (today) and it's 0, we continue to check yesterday.
                // If yesterday is also 0, then streak is 0.
                if (i > 0) break;
            }
        }

        // Calculate Longest Streak
        // Sort back to chronological for easier sequential counting
        const chronologicalDays = allDays.sort((a, b) => new Date(a.date) - new Date(b.date));

        chronologicalDays.forEach(day => {
            if (day.contributionCount > 0) {
                tempStreak++;
            } else {
                if (tempStreak > longestStreak) longestStreak = tempStreak;
                tempStreak = 0;
            }
        });
        // Final check
        if (tempStreak > longestStreak) longestStreak = tempStreak;

        setStats({ total, currentStreak, longestStreak });
    };

    useEffect(() => {
        fetchData();
        // 🔥 auto refresh every 5 minutes
        const interval = setInterval(fetchData, 300000);
        return () => clearInterval(interval);
    }, []);

    const getColor = (count) => {
        if (count === 0) return "#1e1e1e";
        if (count < 3) return "#0e4429";
        if (count < 5) return "#006d32";
        if (count < 7) return "#26a641";
        return "#39d353";
    };

    // Helper to get month labels
    const getMonthLabels = () => {
        const months = [];
        let currentMonth = -1;

        weeks.forEach((week, index) => {
            const date = new Date(week.contributionDays[0].date);
            const month = date.getMonth();
            if (month !== currentMonth) {
                months.push({ name: date.toLocaleString('default', { month: 'short' }), index });
                currentMonth = month;
            }
        });
        return months;
    };

    return (
        <div className="relative h-full w-full bg-[#1e1e1e]">
            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none fixed"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, #808080 1px, transparent 1px), linear-gradient(to bottom, #808080 1px, transparent 1px)",
                    backgroundSize: "40px 40px"
                }}
            />

            <Scrollbars
                autoHide
                autoHideTimeout={1000}
                autoHideDuration={200}
                universal={true}
            >
                <div className="text-white w-full flex flex-col items-center p-6 py-10 gap-4 animate-fade-in-up transition-all duration-500">
                    {/* Heading */}
                    <div className="flex flex-col gap-3 mb-6">
                        <div className="text-5xl md:text-6xl font-thin text-white tracking-tight">
                            GitHub <span className="font-semibold text-blue-500">Activity</span>
                        </div>
                        <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
                            Real-time contribution tracking and coding consistency.
                        </p>
                    </div>

                    {/* Dashboard Stats Card */}
                    <div className="w-full max-w-4xl bg-[#181818] border border-[#3c3c3c] rounded-2xl py-8 px-5 flex flex-wrap items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-visible group transition-all duration-300 hover:border-[#007acc]/80 hover:shadow-[0_8px_32px_rgba(0,122,204,0.2)]">

                        {/* Background Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#007acc]/10 via-transparent to-[#007acc]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

                        {/* Total Contributions */}
                        <div className="flex-1 min-w-[180px] flex flex-col items-center justify-center p-4 relative z-10 transition-all duration-300 hover:scale-105 hover:bg-[#252526]/50 rounded-xl">
                            <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                                Total
                            </div>
                            <span className="text-4xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] leading-none py-1">
                                {stats.total}
                            </span>
                            <span className="text-[9px] text-blue-400 mt-1 font-mono">
                                CONTRIBUTIONS
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-[1px] h-20 bg-gradient-to-b from-transparent via-[#3c3c3c] to-transparent"></div>

                        {/* Current Streak */}
                        <div className="flex-1 min-w-[220px] flex flex-col items-center justify-center p-3 relative z-10 scale-105 lg:scale-110">
                            <div className="relative group/ring">

                                {/* Outer Glow */}
                                <div className="absolute -inset-2 bg-[#007acc]/20 rounded-full blur-lg opacity-40 group-hover/ring:opacity-70 transition-opacity duration-500"></div>

                                {/* Ring */}
                                <svg className="w-24 h-24 transform -rotate-90 drop-shadow-[0_0_12px_rgba(0,122,204,0.4)]">
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="#1e1e1e"
                                        strokeWidth="5"
                                        fill="transparent"
                                    />
                                    <circle
                                        cx="48"
                                        cy="48"
                                        r="40"
                                        stroke="url(#activeGradient)"
                                        strokeWidth="7"
                                        fill="transparent"
                                        strokeDasharray="251.2"
                                        strokeDashoffset={251.2 - (251.2 * Math.min(stats.currentStreak, 100)) / 100}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out"
                                    />
                                    <defs>
                                        <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#007acc" />
                                            <stop offset="100%" stopColor="#0098ff" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Inner Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-xl drop-shadow-[0_0_6px_rgba(255,165,0,0.6)] animate-bounce-slow">
                                        🔥
                                    </span>
                                    <span className="text-3xl font-black text-white leading-none mt-0.5 tracking-tight">
                                        {stats.currentStreak}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-3 text-center">
                                <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">
                                    Current Streak
                                </span>
                                <div className="h-1 w-10 bg-[#007acc] mx-auto mt-1 rounded-full"></div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block w-[1px] h-20 bg-gradient-to-b from-transparent via-[#3c3c3c] to-transparent"></div>

                        {/* Longest Streak */}
                        <div className="flex-1 min-w-[180px] flex flex-col items-center justify-center p-4 relative z-10 transition-all duration-300 hover:scale-105 hover:bg-[#252526]/50 rounded-xl">
                            <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                                Longest
                            </div>
                            <span className="text-4xl font-black text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] leading-none py-1">
                                {stats.longestStreak}
                            </span>
                            <span className="text-[9px] text-green-400 mt-1 font-mono">
                                DAY STREAK
                            </span>
                        </div>
                    </div>


                    <div className="w-full max-w-3xl flex flex-col gap-4">
                        <div className="flex justify-between items-baseline">
                            <h2 className="text-xl font-semibold text-gray-200">
                                Contribution Graph
                            </h2>
                        </div>

                        <div className="w-full overflow-x-auto shadow-2xl rounded-xl p-4 md:p-6 bg-[#181818] border border-[#30363d] transition-all duration-300">
                            {loading ? (
                                <div className="flex justify-center items-center h-40 text-blue-400">
                                    <svg className="animate-spin h-8 w-8 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className="ml-3 text-lg">Loading contributions...</span>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col justify-center items-center h-40 text-gray-400">
                                    <p>Failed to load data.</p>
                                    <p className="text-sm mt-2">Make sure the backend server is running and configured.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col text-xs">
                                    {/* Month Labels */}
                                    <div className="flex mb-2 ml-8 relative h-4">
                                        {getMonthLabels().map((month, i) => (
                                            <span
                                                key={i}
                                                className="absolute text-gray-400"
                                                style={{ left: `${month.index * 13}px` }} // 13px approx width of column + gap
                                            >
                                                {month.name}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex">
                                        {/* Day Labels */}
                                        <div className="flex flex-col  mr-2 pt-5 text-gray-400 text-[10px] items-end leading-[0]">
                                            <span className="h-3 relative -top-1">Mon</span>
                                            <span className="h-3 mt-4 relative -top-1">Wed</span>
                                            <span className="h-3 mt-4 relative -top-1">Fri</span>
                                        </div>

                                        {/* Grid */}
                                        <div className="flex gap-[3px]">
                                            {weeks.map((week, wIndex) => (
                                                <div key={wIndex} className="flex flex-col gap-[3px]">
                                                    {week.contributionDays.map((day) => (
                                                        <div
                                                            key={day.date}
                                                            data-tooltip={`${day.contributionCount} contributions on ${day.date}`}
                                                            className="w-[10px] h-[10px] rounded-[2px] cursor-pointer hover:border hover:border-gray-400 transition-colors duration-75 relative group"
                                                            style={{ backgroundColor: getColor(day.contributionCount) }}
                                                        >
                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-max bg-[#6e7681] text-white text-xs rounded py-1 px-2 z-50 shadow-xl pointer-events-none">
                                                                {day.contributionCount} contributions on {new Date(day.date).toLocaleDateString(undefined, {
                                                                    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric'
                                                                })}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Legend */}
                                    <div className="flex items-center justify-end gap-3 text-[10px] text-gray-500 mt-6 pt-4 border-t border-[#30363d]/50">
                                        <span className="uppercase ">Less </span>
                                        <div className="flex gap-[3px]">
                                            <div className="w-[11px] h-[11px] rounded-[2px]" style={{ background: "#161b22" }}></div>
                                            <div className="w-[11px] h-[11px] rounded-[2px]" style={{ background: "#0e4429" }}></div>
                                            <div className="w-[11px] h-[11px] rounded-[2px]" style={{ background: "#006d32" }}></div>
                                            <div className="w-[11px] h-[11px] rounded-[2px]" style={{ background: "#26a641" }}></div>
                                            <div className="w-[11px] h-[11px] rounded-[2px]" style={{ background: "#39d353" }}></div>
                                        </div>
                                        <span className="uppercase ">More</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer Text */}
                    <p className="text-gray-400 text-sm max-w-2xl md:max-w-3xl text-center leading-relaxed pb-20">
                        This section dynamically syncs with my <a href="https://github.com/Garvit-developer" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">GitHub profile</a>, showing near real-time
                        contributions and coding consistency.
                    </p>
                </div>
            </Scrollbars>
        </div>
    );
};

export default GithubStats;
