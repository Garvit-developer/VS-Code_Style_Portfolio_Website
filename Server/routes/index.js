import express from "express";
import chatbotRoutes from "./chatbot.routes.js";
import githubRoutes from "./github.routes.js";

const router = express.Router();

/**
 * Mount all route modules
 */
router.get("/", (req, res) => {
    res.json({
        message: "Portfolio Backend API is running",
        version: "1.0.0",
        status: "healthy",
        docs: "https://github.com/Garvit-developer/VS-Code_Style_Portfolio_Website"
    });
});

router.use("/api", chatbotRoutes);
router.use("/", githubRoutes);

export default router;
