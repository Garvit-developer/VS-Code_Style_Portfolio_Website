import fs from "fs";
import path from "path";
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
            const filePath = path.join(process.cwd(), "company_info.json");
            console.log(`📖 Attempting to load company data from: ${filePath}`);

            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }

            const fileContent = fs.readFileSync(filePath, "utf-8");
            const companyData = JSON.parse(fileContent);

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
