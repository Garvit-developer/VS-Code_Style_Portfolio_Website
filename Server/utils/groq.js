
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const MODEL_NAME = process.env.GROQ_API_MODEL;
const GROQ_API_URL = process.env.GROQ_API_URL;

// CHAT REPLY FUNCTION
async function callGroq(user_input, context, history = []) {

  const system_prompt = {
    role: "system",
    content: `
You are a professional AI assistant for Garvit Dani's Personal Portfolio.

Rules:
- Answer only questions related to me, my projects (Skilledu, Taskly Pro, Secure Stack, Bhasha Setu, Simon Game), skills, and experience.
- Use "My" or "me" when referring to me.
- Be polite, professional, and concise.
- Do not provide code or prices unless explicitly mentioned in the context.
- Redirect users to contact me at garvitdani@gmail.com if unsure.

Context:
${context}
`
  };

  const formattedHistory = history.flatMap(([u, b]) => [
    { role: "user", content: u },
    { role: "assistant", content: b }
  ]);

  const messages = [
    system_prompt,
    ...formattedHistory,
    { role: "user", content: user_input }
  ];

  const response = await axios.post(
    GROQ_API_URL,
    {
      model: MODEL_NAME,
      messages,
      temperature: 0.3,
      max_tokens: 900
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.choices?.[0]?.message?.content || "No reply generated.";
}


// ✅ FOLLOW-UP SUGGESTIONS
async function callGroqSuggestions(conversationHistory = [], botReply, context) {

  const system_prompt = {
    role: "system",
    content: `Suggest exactly 4 short follow-up topics (2–4 words each). Only topics related to Garvit Dani, his projects, or skills.`
  };

  const historyText = conversationHistory.map(([u, b]) => `${u} → ${b}`).join("\n");

  const messages = [
    system_prompt,
    {
      role: "user",
      content: `
Context:
${context}

Conversation:
${historyText}

Bot:
${botReply}

Return 4 short topics only (one per line).
`
    }
  ];

  const response = await axios.post(
    GROQ_API_URL,
    {
      model: MODEL_NAME,
      messages,
      temperature: 0.7,
      max_tokens: 120
    },
    {
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`
      }
    }
  );

  const raw = response.data.choices?.[0]?.message?.content || "";

  return raw
    .split("\n")
    .map(x => x.replace(/^[\d\.\-]+/, "").trim())
    .filter(Boolean)
    .slice(0, 4);
}

export { callGroq, callGroqSuggestions };
