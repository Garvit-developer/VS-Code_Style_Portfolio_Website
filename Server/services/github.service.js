import axios from "axios";
import config from "../config/env.config.js";

/**
 * GitHub service
 * Handles GitHub API integration
 */
class GitHubService {
    /**
     * Fetch GitHub contribution data
     */
    async getContributions() {
        try {
            const query = `
                query {
                    user(login: "${config.github.username}") {
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
                        Authorization: `Bearer ${config.github.token}`
                    }
                }
            );

            const weeks =
                response?.data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

            if (!Array.isArray(weeks)) {
                throw new Error("Invalid response from GitHub API");
            }

            return weeks;
        } catch (err) {
            console.error("❌ GitHub API error:", err.response?.data || err.message);
            throw err;
        }
    }
}

// Export singleton instance
export default new GitHubService();
