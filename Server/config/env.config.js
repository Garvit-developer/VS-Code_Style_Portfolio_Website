import dotenv from "dotenv";
dotenv.config();

/**
 * Centralized environment configuration
 * Validates required environment variables on startup
 */
const config = {
    // Server Configuration
    port: process.env.PORT || 5000,
    nodeEnv: process.env.NODE_ENV || "development",

    // Frontend URL
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",


    // Groq API Configuration
    groq: {
        apiKey: process.env.GROQ_API_KEY,
        apiUrl: process.env.GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions",
        model: process.env.GROQ_API_MODEL || "llama-3.3-70b-versatile"
    },

    // GitHub Configuration
    github: {
        token: process.env.GITHUB_TOKEN,
        username: process.env.GITHUB_USERNAME || "Garvit-developer"
    }
};

/**
 * Validates required environment variables
 * @throws {Error} if required variables are missing
 */
export const validateEnv = () => {
    const required = [
        { key: "GROQ_API_KEY", value: config.groq.apiKey },
        { key: "GITHUB_TOKEN", value: config.github.token },
    ];

    const missing = required.filter(({ value }) => !value).map(({ key }) => key);

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(", ")}\n` +
            `Please check your .env file and ensure all required variables are set.`
        );
    }
};

export default config;