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
    const { text, targetLanguage } = req.body;
    console.log("Translating:", { text, targetLanguage });

    if (!text) {
      return res.status(400).json({ error: "Text is required" });
    }

    // First detect the language
    const [detection] = await translate.detect(text);
    console.log("Detected language:", detection.language);

    // If the text is not in English, translate to English
    // If the text is in English, translate to the target language (if specified)
    const targetLang =
      detection.language === "en" ? targetLanguage || "hi" : "en";

    const [translation] = await translate.translate(text, {
      from: detection.language,
      to: targetLang,
    });

    console.log("Translation result:", translation);
    res.json({
      translatedText: translation,
      detectedLanguage: detection.language,
    });
  } catch (error) {
    console.error("Translation error details:", error);
    res.status(500).json({
      error: "Translation failed",
      details: error.message,
    });
  }
});

export default router;
