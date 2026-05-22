import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: any, res: any) {
  // Support CORS if needed or handle POST request
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY is not configured on the server. Please add it in Settings > Secrets." 
      });
    }

    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format. Expected array." });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = `You are "Shauransh Capital Services AI Assistant", an elite financial engineering and wealth advisory virtual consultant.
Your tone is sophisticated, professional, highly helpful, and client-centric.

Shauransh Capital Services specializes in:
1. Personal Loans - Customized, flexible, premium rates, designed for ambition.
2. Business Loans / Capital Solutions - Built for expansion, strategic growth, institutional scale.
3. Home Loans - Turning aspirations into addresses, high-value properties, fast approvals.
4. Vehicle Loans - Elite luxury and personal automotive financing solutions.
5. Insurance - Asset protection, wealth safeguarding, comprehensive corporate and personal risk consulting.
6. Financial Intelligence & Strategic Wealth Management solutions.

Guide clients beautifully through their inquiries. Inform them about:
- Our 24/7 dedicated lead management where advisors contact users within 2 hours of submitting any form.
- The Interactive EMI Calculator on our portal which tracks rates, tenures, and lets them lock in rates instantly in 1-click!
- The Digital Assessment Tool for fast instant eligibility verification.
- Advise, guide, and do simple financial calculations if they ask, while maintaining an elegant brand image.

Keep responses relatively concise, scannable with bullet points, and professionally warm. Use markdown representation.
Highlight the website's digital tools (Forms, Calculators, Eligibility checks).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: messages,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return res.status(200).json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in Serverless:", error);
    return res.status(500).json({ error: error?.message || "Internal server error during AI operations." });
  }
}
