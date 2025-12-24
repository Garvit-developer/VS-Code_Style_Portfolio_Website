/**
 * Validates email format
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Middleware to validate email request body
 */
export const validateEmailRequest = (req, res, next) => {
    const { name, email, message } = req.body;

    // Check for required fields
    if (!name || !email || !message) {
        return res.status(400).json({
            data: false,
            error: "Missing required fields: name, email, and message are required"
        });
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({
            data: false,
            error: "Invalid email format"
        });
    }

    next();
};

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
