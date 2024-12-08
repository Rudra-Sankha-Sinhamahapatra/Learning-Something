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

  const messagesWithPreprocessedToolCall = [
    {
        role: "system",
        content: `Always use the 'getInformation' tool to check the knowledge base before answering.`,
    },
    ...messages,
];


  const result = streamText({
    model:google('gemini-1.5-flash-8b'),
    system: `You are a helpful assistant.
- Always use the 'getInformation' tool to answer questions.
- If a user provides new knowledge or a statement that does not require a response, use the 'addResource' tool to store it in your knowledge base.
- Respond with "Sorry, I don't know." only if no relevant information is found and the input doesn't qualify as new knowledge.
`,
    messages:messagesWithPreprocessedToolCall,
    tools: {
      addResource: tool({
        description: `Add a resource to your knowledge base.
          Use this tool if the user provides new information or knowledge unprompted.`,
        parameters: z.object({
          content: z
            .string()
            .describe('The content or resource to add to the knowledge base'),
        }),
        execute: async ({ content }) => {
          console.log("Adding resource:", content); // Debugging
          return await createResource({ content });
        },
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