import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import multer from "multer";
import fs from "fs/promises";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, "../.env") });

const app = express();
const upload = multer({ dest: "uploads/" });
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const filePath = req.file.path;
    const fileBuffer = await fs.readFile(filePath);

    // Get file extension
    const ext = req.file.originalname.split(".").pop().toLowerCase();

    // Convert file to Base64
    const base64Data = fileBuffer.toString("base64");

    const mimeTypes = {
      pdf: "application/pdf",
      png: "image/png",
      jpeg: "image/jpeg",
      jpg: "image/jpeg",
    };

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const basePrompt = req.body.prompt;
    const randomSeed = Math.floor(Math.random() * 1000);
    const diversityPrompt = `${basePrompt} Provide unique variations every time. [ID: ${randomSeed}]`;
    const result = await model.generateContent([
      {
        text:
          req.body.prompt ||
          "Generate 5 multiple choice quiz questions from this file, and return structured JSON of the questions.",
      },
      {
        inlineData: {
          mimeType: mimeTypes[ext] || "application/pdf",
          data: base64Data,
        },
      },
    ]);

    const text = result.response.text();

    console.log("Generated text:", text);
    res.json({ quiz: text });
  } catch (err) {
    console.error("Upload processing failed:", err);
    res.status(500).json({ error: "Failed to process upload." });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
