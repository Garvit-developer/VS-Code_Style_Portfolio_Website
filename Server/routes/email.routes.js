import express from "express";
import { sendEmail } from "../controllers/email.controller.js";
import { validateEmailRequest } from "../middleware/validateRequest.js";

const router = express.Router();

/**
 * POST /api/sendEmail
 * Contact form endpoint
 */
router.post("/sendEmail", validateEmailRequest, sendEmail);

export default router;
