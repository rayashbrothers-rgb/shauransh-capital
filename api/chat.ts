import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: {
        "Content-Type": "application/json",
        "Allow": "POST",
      },
    });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          error: "GEMINI_API_KEY is not configured on the server. Please add it in Settings > Secrets."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await req.json();
    const { messages } = body;
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format. Expected array." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
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

    return new Response(JSON.stringify({ text: response.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Gemini API Error in Serverless:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Internal server error during AI operations." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
