import {
    transporter,
    getNotificationEmailTemplate,
    getAutoReplyEmailTemplate
} from "../config/email.config.js";

/**
 * Email service
 * Handles email sending logic
 */
class EmailService {
    /**
     * Send contact form email (notification + auto-reply)
     */
    async sendContactEmail(name, email, message) {
        try {
            // Send notification email to admin
            const notificationEmail = getNotificationEmailTemplate(name, email, message);
            await transporter.sendMail(notificationEmail);
            console.log("✅ Notification email sent to admin");

            // Send auto-reply to the user
            const autoReplyEmail = getAutoReplyEmailTemplate(name, email, message);
            await transporter.sendMail(autoReplyEmail);
            console.log(`✅ Auto-reply email sent to ${email}`);

            return { success: true };
        } catch (err) {
            console.error("❌ Error sending email:", err);
            throw err;
        }
    }
}

// Export singleton instance
export default new EmailService();
