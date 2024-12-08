import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";
import { tools } from '@/ai/tools'

export async function POST(request:Request) {

    const API_KEY = process.env.GEMINI_API_KEY
    if(!API_KEY) {
        throw new Error("No api key found");
    }
    const google = createGoogleGenerativeAI({
        apiKey:API_KEY,
    })

    try {

    const {messages} = await request.json();

    const result = streamText({
        model:google('gemini-1.5-flash-8b'),
        system:"You are a friendly assistant!",
        messages,
        maxSteps:5,
        tools
    })
    return result.toDataStreamResponse();
}
catch(error){
    console.log(error);
}
}