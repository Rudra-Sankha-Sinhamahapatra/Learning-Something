import Replicate from "replicate";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const REPLICATE_API_KEY = process.env.REPLICATE_API_TOKEN;

const replicate = new Replicate({
  auth: REPLICATE_API_KEY,
});

const app = express();

app.use(express.json());

app.post("/create", async (req: any, res: any) => {
  const { prompt } = req.body;
  try {
    const output = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {
          prompt: prompt,
          num_outputs: "1",
          guidance_scale: 7.5,
          num_inference_steps: 50,
        },
      }
    );
    return res.status(200).json({
      message: "success",
      image: output,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "image generation failed",
      error: error,
    });
  }
});

app.listen(3000, () => {
  console.log("Server running at port 3000");
});
