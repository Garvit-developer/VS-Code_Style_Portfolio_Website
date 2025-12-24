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
} catch (err) {
    console.error(err.message);
    process.exit(1);
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Initialize services
(async () => {
    try {
        await chatbotService.initialize();
    } catch (err) {
        console.error("❌ Failed to initialize services:", err.message);
        process.exit(1);
    }
})();

// Mount routes
app.use("/", routes);

// Error handling (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
    console.log(`✅ Server is running on port ${config.port}`);
    console.log(`✅ Environment: ${config.nodeEnv}`);
    console.log(`✅ Frontend URL: ${config.frontendUrl}`);
});
