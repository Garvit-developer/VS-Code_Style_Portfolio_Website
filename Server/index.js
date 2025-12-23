
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { callGroq, callGroqSuggestions } from "./groq.js";

import findRelevantContext from "./tfidf.js";
import fs from "fs";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (Must be before routes)
app.use(cors());
app.use(express.json());

// chatboard
let companyText = "";
let websiteTexts = [];

// ✅ Load static JSON data and scrape data at startup
(async () => {
    try {
        const companyData = JSON.parse(fs.readFileSync("company_info.json", "utf-8"));
        companyText = Object.values(companyData).flat().join(" ");
        // websiteTexts = await scrapeGeekTheo();
        console.log("✅ Static content loaded");
    } catch (err) {
        console.error("❌ Error loading data:", err.message);
    }
})();

// ✅ Chatbot API endpoint
app.post("/api/chat", async (req, res) => {
    console.log("📩 Incoming chat request:", req.body);
    try {
        const { input, history = [] } = req.body;
        if (!input) {
            console.error("❌ Missing input in request body");
            return res.status(400).json({ reply: "❌ Input is required" });
        }

        const context = findRelevantContext(input, [companyText, ...websiteTexts]);
        const reply = await callGroq(input, context, history);

        let suggestions = [];
        try {
            // const { callGroqSuggestions } = require("./groq");
            suggestions = await callGroqSuggestions(history, reply, context);
        } catch (err) {
            console.error("⚠️ Error fetching suggestions:", err.message);
            suggestions = [];
        }

        console.log("✅ Sending response:", { reply, suggestions });
        res.json({ reply, suggestions });
    } catch (err) {
        console.error("❌ Chat error:", err.message);
        res.status(500).json({ reply: "❌ Internal server error" });
    }
});

// Nodemailer SMTP Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'garvitdani@gmail.com',
        pass: process.env.EMAIL_PASSWORD // App Password from Gmail
    }
});

// Routes
app.post("/api/sendEmail", async (req, res) => {
    const { name, email, message } = req.body;

    // Validate request body
    if (!name || !email || !message) {
        return res.status(400).json({
            data: false,
            error: "Missing required fields: name, email, and message are required",
        });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            data: false,
            error: "Invalid email format",
        });
    }

    // Email to you (notification of new contact)
    const notificationEmail = {
        from: `"Portfolio Contact Form" <${process.env.EMAIL_USER || 'garvitdani@gmail.com'}>`,
        to: 'garvitdani@gmail.com',
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
    };

    // Auto-reply email to the user
    const autoReplyEmail = {
        from: `"Garvit Dani" <${process.env.EMAIL_USER || 'garvitdani@gmail.com'}>`,
        to: email,
        subject: 'Thank you for contacting me - Garvit Dani',
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
    };

    try {
        // Send notification email to you
        await transporter.sendMail(notificationEmail);
        console.log("✅ Notification email sent to garvitdani@gmail.com");

        // Send auto-reply to the user
        await transporter.sendMail(autoReplyEmail);
        console.log(`✅ Auto-reply email sent to ${email}`);

        res.status(200).json({ data: true, error: "" });
    } catch (err) {
        console.error("❌ Error sending email:", err);
        res.status(500).json({
            data: false,
            error: err.message || "Failed to send email",
        });
    }
});



//Github stats
app.get("/github-contributions", async (req, res) => {
    try {
        const query = `
      query {
        user(login: "Garvit-developer") {
          contributionsCollection {
            contributionCalendar {
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

        const response = await axios.post(
            "https://api.github.com/graphql",
            { query },
            {
                headers: {
                    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
                },
            }
        );

        const weeks =
            response?.data?.data?.user?.contributionsCollection?.contributionCalendar
                ?.weeks;

        if (!Array.isArray(weeks)) {
            return res.status(500).json([]);
        }

        res.json(weeks);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json([]);
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
