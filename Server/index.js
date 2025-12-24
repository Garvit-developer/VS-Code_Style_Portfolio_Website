import express from "express";
import cors from "cors";
import config, { validateEnv } from "./config/env.config.js";
import corsOptions from "./config/cors.config.js";
import routes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import chatbotService from "./services/chatbot.service.js";

const app = express();

// Validate environment variables on startup
try {
    validateEnv();
    console.log("✅ Environment variables validated");
} catch (err) {
    console.error("❌ Environment validation failed:", err.message);
    // In production/serverless, we log but don't exit to allow Vercel to show logs
    if (process.env.NODE_ENV !== "production") process.exit(1);
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Initialize services
(async () => {
    try {
        console.log("📂 Current Working Directory:", process.cwd());
        await chatbotService.initialize();
    } catch (err) {
        console.error("❌ Failed to initialize services:", err.message);
        if (process.env.NODE_ENV !== "production") process.exit(1);
    }
})();

// Mount routes
app.use("/", routes);

// Error handling (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
if (process.env.NODE_ENV !== "production") {
    app.listen(config.port, () => {
        console.log(`✅ Server is running on port ${config.port}`);
        console.log(`✅ Environment: ${config.nodeEnv}`);
        console.log(`✅ Frontend URL: ${config.frontendUrl}`);
    });
}

export default app;
