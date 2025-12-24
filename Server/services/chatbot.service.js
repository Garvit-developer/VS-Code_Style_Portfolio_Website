import path from "path";
import findRelevantContext from "../utils/tfidf.js";
import { callGroq, callGroqSuggestions } from "../utils/groq.js";
import companyData from "../company_info.json" with { type: "json" };

/**
 * Chatbot service
 * Handles chatbot business logic and context management
 */
class ChatbotService {
    constructor() {
        this.companyText = "";
        this.websiteTexts = [];
        this.initialized = false;
    }

    /**
     * Initialize chatbot by loading static content
     */
    async initialize() {
        try {
            console.log("📖 Loading company data from imported JSON");

            this.companyText = Object.values(companyData).flat().join(" ");
            this.initialized = true;
            console.log("✅ Chatbot static content loaded successfully");
        } catch (err) {
            console.error("❌ Chatbot initialization error:", err.message);
            throw err;
        }
    }

    /**
     * Process chat message and generate response
     */
    async processMessage(input, history = []) {
        if (!this.initialized) {
            throw new Error("Chatbot service not initialized");
        }

        const context = findRelevantContext(input, [
            this.companyText,
            ...this.websiteTexts
        ]);

        const reply = await callGroq(input, context, history);

        let suggestions = [];
        try {
            suggestions = await callGroqSuggestions(history, reply, context);
        } catch (err) {
            console.error("⚠️ Error fetching suggestions:", err.message);
            suggestions = [];
        }

        return { reply, suggestions };
    }
}

// Export singleton instance
export default new ChatbotService();
