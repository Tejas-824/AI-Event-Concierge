const { GoogleGenerativeAI } = require("@google/generative-ai");

const client = new GoogleGenerativeAI(
  process.env.GOOGLE_GENAI_API_KEY
);

const generateEventProposal = async (userPrompt) => {
  const prompt = `
You are an AI Event Concierge.
Your job is to read a user's corporate offsite request and return a venue proposal.

Important rules:
1. Always return valid JSON only.
2. Do not return markdown.
3. Keep the answer realistic and professional.
4. If the user gives incomplete details, make sensible assumptions.
5. The JSON must exactly follow this shape:
{
  "venueName": "string",
  "location": "string",
  "estimatedCost": "string",
  "whyItFits": "string"
}

User request:
${userPrompt}
`;

  const model = client.getGenerativeModel({
    model: "gemini-1.5-flash", 
  });

  const response = await model.generateContent(prompt);

 const text = response.response
    .text()
    .replace(/```json|```/g, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error("AI returned invalid JSON");
  }
};

module.exports = generateEventProposal;