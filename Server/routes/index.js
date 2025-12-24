import express from "express";
import chatbotRoutes from "./chatbot.routes.js";
import emailRoutes from "./email.routes.js";
import githubRoutes from "./github.routes.js";

const router = express.Router();

/**
 * Mount all route modules
 */
router.use("/api", chatbotRoutes);
router.use("/api", emailRoutes);
router.use("/", githubRoutes);

export default router;
