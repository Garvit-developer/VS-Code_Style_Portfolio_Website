import githubService from "../services/github.service.js";

/**
 * GitHub controller
 * Handles GitHub API requests
 */
export const getContributions = async (req, res, next) => {
    try {
        const weeks = await githubService.getContributions();
        res.json(weeks);
    } catch (err) {
        console.error("❌ GitHub contributions error:", err.message);
        res.status(500).json([]);
    }
};
