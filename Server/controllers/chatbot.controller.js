import chatbotService from "../services/chatbot.service.js";

/**
 * Chatbot controller
 * Handles chatbot API requests
 */
export const handleChat = async (req, res, next) => {
    console.log("📩 Incoming chat request:", req.body);

    try {
        const { input, history = [] } = req.body;
        const { reply, suggestions } = await chatbotService.processMessage(input, history);

        console.log("✅ Sending response:", { reply, suggestions });
        res.json({ reply, suggestions });
    } catch (err) {
        console.error("❌ Chat error:", err.message);
        next(err);
    }
};
