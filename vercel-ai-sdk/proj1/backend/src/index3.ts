import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamObject } from 'ai';
import dotenv from "dotenv"
import { z } from 'zod';

dotenv.config();

async function main() {
    const API_KEY = process.env.GEMINI_API_KEY
    if(!API_KEY){
        throw new Error("No api key found");
    }
    const google = createGoogleGenerativeAI({
        apiKey:API_KEY
      });
    try {
const {partialObjectStream} =  streamObject({
  model: google('gemini-1.5-flash',{
    structuredOutputs:false,
  }),
  schema:z.object({
  name:z.string(),
  age:z.number(),
  contact: z.union([
  z.object({
    type:z.literal('email'),
    value:z.string(),
  }),
  z.object({
    type:z.literal('phone'),
    value:z.string()
  })
  ]),
  occupation: z.string().describe("The occupation of the person"),
  hobby: z.string().describe("Hobby of the person"),
  joke: z.object({
    setup: z.string().describe("The setup of the joke based on techstack"),
    punchline: z.string().describe("The punchline of the joke")
  })
  }),
  prompt: 'Generate an example person for testing',
});

  for await (const partialObject of partialObjectStream) {
    console.clear();
    console.log(partialObject);
  }
    } 
    catch(error) {
        console.log("error ",error)
    }
}
main();