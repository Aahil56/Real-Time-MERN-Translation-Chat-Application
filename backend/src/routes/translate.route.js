import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "@google-cloud/translate";
const { Translate } = pkg.v2;

const router = express.Router();

// Get the directory name properly in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Google Translate with your credentials
const translate = new Translate({
  projectId: "elegant-tangent-449817-a8",
  keyFilename: path.join(__dirname, "..", "google-translate-credentials.json"),
});

router.post("/api/translate", async (req, res) => {
  try {
    const { text } = req.body;
    console.log("Translating:", { text });

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // First detect the language
    const [detection] = await translate.detect(text);
    console.log("Detected language:", detection.language);

    // Only translate if the source language is not English
    if (detection.language === "en") {
      // If text is English, translate to Hindi
      const [translation] = await translate.translate(text, {
        from: "en",
        to: "hi",
      });

      res.json({
        translatedText: translation,
        detectedLanguage: detection.language,
      });
    } else {
      // If text is not English, translate to English
      const [translation] = await translate.translate(text, {
        from: detection.language,
        to: "en",
      });

      res.json({
        translatedText: translation,
        detectedLanguage: detection.language,
      });
    }
  } catch (error) {
    console.error("Translation error details:", error);
    res.status(500).json({
      error: "Translation failed",
      details: error.message,
    });
  }
});

export default router;
