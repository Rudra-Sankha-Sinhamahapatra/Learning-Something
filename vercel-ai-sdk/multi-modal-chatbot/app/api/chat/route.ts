import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req:Request) {
    const apiKey = process.env.GEMINI_API_KEY;

    if(!apiKey) {
        throw new Error("No api key found");
    }

    try {
        const google = createGoogleGenerativeAI({
            apiKey:apiKey
        });

        const { messages }= await req.json();

        const result = streamText({
            model:google('gemini-1.5-flash-8b'),
            messages,
        })

        return result.toDataStreamResponse();

    } catch (error) {
        console.log("Error happended ",error);
    }
}