require("dotenv").config();
const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateEventProposal = async (userPrompt) => {
  try {
    console.log("API KEY EXISTS:", !!process.env.GEMINI_API_KEY);
    console.log("MODEL USED:", "gemini-2.5-flash");

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI Event Concierge.
Read the user's event request and return a realistic venue proposal.

User request:
${userPrompt}`,
            },
          ],
        },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            venueName: { type: Type.STRING },
            location: { type: Type.STRING },
            estimatedCost: { type: Type.STRING },
            whyItFits: { type: Type.STRING },
          },
          required: ["venueName", "location", "estimatedCost", "whyItFits"],
        },
      },
    });

    const text =
      typeof response.text === "function" ? response.text() : response.text;

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return JSON.parse(text);
  } catch (err) {
    console.error("Gemini generateEventProposal error:", err.message);
    throw err;
  }
};

module.exports = generateEventProposal;