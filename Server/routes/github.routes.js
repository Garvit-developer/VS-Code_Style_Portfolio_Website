import express from "express";
import { getContributions } from "../controllers/github.controller.js";

const router = express.Router();

/**
 * GET /github-contributions
 * GitHub contributions endpoint
 */
router.get("/github-streak", getContributions);

export default router;
