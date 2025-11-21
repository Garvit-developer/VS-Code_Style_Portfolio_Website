const express = require("express");
const cors = require("cors");
const AWS = require("aws-sdk");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// AWS SES Configuration
const ses = new AWS.SES({
    apiVersion: "2010-12-01",
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || "ap-south-1",
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

    const params = {
        Destination: {
            CcAddresses: [],
            ToAddresses: [process.env.TO_EMAIL || "toemail@tomail.com"],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `<div>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>`,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: `Hi I am ${name}, from contact page.`,
            },
        },
        Source: process.env.FROM_EMAIL || "youremail@gmail.com",
        ReplyToAddresses: [],
    };

    try {
        const data = await ses.sendEmail(params).promise();
        console.log("Email sent successfully:", data);
        res.status(200).json({ data: true, error: "" });
    } catch (err) {
        console.error("Error sending email:", err);
        res.status(500).json({
            data: false,
            error: err.message || "Failed to send email",
        });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
