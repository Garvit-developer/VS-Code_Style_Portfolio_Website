import nodemailer from "nodemailer";
import config from "./env.config.js";


//  Nodemailer transporter configuration
 
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email.user,
        pass: config.email.password
    }
});

//   Email template for notification to admin

export const getNotificationEmailTemplate = (name, email, message) => ({
    from: `"Portfolio Contact Form" <${config.email.user}>`,
    to: config.email.recipient,
    replyTo: email,
    subject: `New Contact Form Message from ${name}`,
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #007acc; padding-bottom: 10px;">
                    New Contact Form Submission
                </h2>
                <div style="margin-bottom: 15px;">
                    <p style="margin: 5px 0; color: #666;">
                        <strong style="color: #333;">Name:</strong> ${name}
                    </p>
                    <p style="margin: 5px 0; color: #666;">
                        <strong style="color: #333;">Email:</strong> 
                        <a href="mailto:${email}" style="color: #007acc; text-decoration: none;">${email}</a>
                    </p>
                </div>
                <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #007acc; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; color: #333; font-weight: bold;">Message:</p>
                    <p style="margin: 0; color: #666; line-height: 1.6;">${message}</p>
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                    <p style="margin: 0; color: #999; font-size: 12px;">
                        This email was sent from your portfolio contact form
                    </p>
                </div>
            </div>
        </div>
    `
});

/**
 * Email template for auto-reply to user
 */
export const getAutoReplyEmailTemplate = (name, email, message) => ({
    from: `"Garvit Dani" <${config.email.user}>`,
    to: email,
    subject: "Thank you for contacting me - Garvit Dani",
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f5f5f5;">
            <div style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <h2 style="color: #333; margin-bottom: 20px;">
                    Thank You for Reaching Out!
                </h2>
                <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
                    Hi <strong>${name}</strong>,
                </p>
                <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
                    Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.
                </p>
                <div style="margin: 25px 0; padding: 20px; background-color: #f9f9f9; border-left: 4px solid #007acc; border-radius: 4px;">
                    <p style="margin: 0 0 10px 0; color: #333; font-weight: bold;">Your Message:</p>
                    <p style="margin: 0; color: #666; line-height: 1.6; font-style: italic;">"${message}"</p>
                </div>
                <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">
                    I typically respond within 24-48 hours. If your inquiry is urgent, feel free to reach out to me directly at 
                    <a href="mailto:garvitdani@gmail.com" style="color: #007acc; text-decoration: none;">garvitdani@gmail.com</a>.
                </p>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
                    <p style="margin: 0 0 10px 0; color: #333; font-weight: bold;">Best regards,</p>
                    <p style="margin: 0; color: #666;">Garvit Dani</p>
                    <p style="margin: 5px 0 0 0; color: #999; font-size: 14px;">Software Development Engineer</p>
                </div>
                <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                    <p style="margin: 0; color: #999; font-size: 12px;">
                        This is an automated confirmation email. Please do not reply to this message.
                    </p>
                </div>
            </div>
        </div>
    `
});
