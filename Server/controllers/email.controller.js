import emailService from "../services/email.service.js";

/**
 * Email controller
 * Handles contact form email requests
 */
export const sendEmail = async (req, res, next) => {
    const { name, email, message } = req.body;

    try {
        await emailService.sendContactEmail(name, email, message);
        res.status(200).json({ data: true, error: "" });
    } catch (err) {
        console.error("❌ Error sending email:", err);
        res.status(500).json({
            data: false,
            error: err.message || "Failed to send email"
        });
    }
};
