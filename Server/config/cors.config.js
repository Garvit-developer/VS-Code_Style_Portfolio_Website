import config from "./env.config.js";

/**
 * CORS configuration
 * Allows requests from the frontend URL (production and development)
 */
const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            config.frontendUrl,
            "https://garvitdani-portfolio.vercel.app",
        ];

        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
};

export default corsOptions;
