import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createResource } from '@/lib/actions/resources';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import { findRelevantContent } from '@/lib/ai/embedding';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const API_KEY = process.env.GEMINI_API_KEY
    if(!API_KEY) {
        throw new Error("No api key found");
    }
    const google = createGoogleGenerativeAI({
        apiKey:API_KEY,
    })

  const { messages } = await req.json();

  const result = streamText({
    model:google('gemini-1.5-pro'),
    system: `You are a helpful assistant. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond, "Sorry, I don't know."`,
    messages,
    tools: {
        addResource: tool({
          description: `add a resource to your knowledge base.
            If the user provides a random piece of knowledge unprompted, use this tool without asking for confirmation.`,
          parameters: z.object({
            content: z
              .string()
              .describe('the content or resource to add to the knowledge base'),
          }),
          execute: async ({ content }) => createResource({ content }),
        }),
        getInformation: tool({
            description: `get information from your knowledge base to answer questions.`,
            parameters: z.object({
              question: z.string().describe('the users question'),
            }),
            execute: async ({ question }) => findRelevantContent(question),
          }),
      },
  });

  return result.toDataStreamResponse();
}