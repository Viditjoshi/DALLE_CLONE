import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("Hello AI Image Generation App!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res
        .status(400)
        .json({ success: false, message: "Prompt is required" });
    }

    const aiResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });
    console.log(aiResponse);

    const image = aiResponse.data[0].b64_json;
    res.status(200).json({ image, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error || "Something went wrong",
    });
  }
});

export default router;
