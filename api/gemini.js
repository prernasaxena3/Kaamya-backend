import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { prompt } = req.body;

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent({
      contents: [{ parts: [{ text: prompt }] }],
    });

    const text = result.response.text();
    res.status(200).json({ content: text });
  } catch (err) {
    console.error("Gemini backend error:", err);
    res.status(500).json({ error: "Gemini API call failed." });
  }
}
