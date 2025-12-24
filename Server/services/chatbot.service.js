import fs from "fs";
import findRelevantContext from "../utils/tfidf.js";
import { callGroq, callGroqSuggestions } from "../utils/groq.js";

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
            const companyData = JSON.parse(
                fs.readFileSync("company_info.json", "utf-8")
            );
            this.companyText = Object.values(companyData).flat().join(" ");
            // this.websiteTexts = await scrapeGeekTheo(); // Commented out as in original
            this.initialized = true;
            console.log("✅ Chatbot static content loaded");
        } catch (err) {
            console.error("❌ Error loading chatbot data:", err.message);
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
