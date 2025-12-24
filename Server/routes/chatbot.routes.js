import express from "express";
import { handleChat } from "../controllers/chatbot.controller.js";
import { validateChatRequest } from "../middleware/validateRequest.js";

const router = express.Router();

/**
 * POST /api/chat
 * Chatbot endpoint
 */
router.post("/chat", validateChatRequest, handleChat);

export default router;
