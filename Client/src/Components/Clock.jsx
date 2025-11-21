import { useEffect, useState } from "react";
import moment from "moment-timezone";

const Clock = ({
    format = "dddd, MMMM Do, YYYY, h:mm:ss A",
    ticking = true,
    timezone
}) => {
    const [time, setTime] = useState(() => {
        const now = timezone ? moment.tz(timezone) : moment();
        return now.format(format);
    });

    useEffect(() => {
        if (!ticking) {
            return;
        }

        const intervalId = setInterval(() => {
            const now = timezone ? moment.tz(timezone) : moment();
            setTime(now.format(format));
        }, 1000);

        return () => clearInterval(intervalId);
    }, [format, ticking, timezone]);

    return <>{time}</>;
};

export default Clock;
