import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

async function main() {
  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY) {
    throw new Error("No api key found");
  }
  const google = createGoogleGenerativeAI({
    apiKey: API_KEY,
  });
  try {
    const location = "Kolkata";
    const weatherTool = {
      description: "Get the weather for the user's location",
      parameters: z.object({
        location: z.string().describe("user's location"),
      }),
      execute: async ({ location }: { location: string }) => {
        const temperature = Math.floor(Math.random() * 31);
        return { temperature };
      },
    };

    const weatherResult = await weatherTool.execute({ location });
    const temperature = weatherResult.temperature;

    const result = streamText({
      model: google("gemini-1.5-pro-latest"),
      tools: {
        weather: weatherTool,
      },
      prompt: `You are a funny chatbot. Tell me a joke that incorporates ${location} and it's current temperature (${temperature})°C)`,
    });

    for await (const textPart of result.textStream) {
      process.stdout.write(textPart);
    }
  } catch (error) {
    console.log("error ", error);
  }
}
main();
