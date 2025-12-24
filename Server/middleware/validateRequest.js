/**
 * Middleware to validate chatbot request body
 */
export const validateChatRequest = (req, res, next) => {
    const { input } = req.body;

    if (!input) {
        return res.status(400).json({
            reply: "❌ Input is required"
        });
    }

    next();
};
