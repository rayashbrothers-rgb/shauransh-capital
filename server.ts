import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

let currentFilename = "";
try {
  currentFilename = __filename;
} catch (e) {
  if (typeof import.meta !== "undefined" && import.meta.url) {
    currentFilename = fileURLToPath(import.meta.url);
  }
}

const currentDirname = path.dirname(currentFilename || "");

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add JSON parsing middleware
  app.use(express.json());

  // Gemini chat prompt proxy endpoint
  app.post("/api/chat", async (req, res) => {
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

      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error?.message || "Internal server error during AI operations." });
    }
  });

  // Handle production or development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        host: '0.0.0.0',
        port: 3000
      },
      appType: "spa",
    });
    
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);

    // Custom fall-through for local development so that refreshing the /authorized page on other devices doesn't return 404
    app.get("*", async (req, res, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api') || url.includes('.')) {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(currentDirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
    
    console.log("Vite development server starting with routing fallback...");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve static files from the dist directory
    app.use(express.static(distPath));

    // Fallback for SPA routing - all requests that don't match static files serve index.html
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    
    console.log("Production server starting from dist...");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
