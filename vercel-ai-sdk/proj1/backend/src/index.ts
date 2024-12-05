import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import dotenv from "dotenv"

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
const result = streamText({
  model: google('gemini-1.5-pro-latest'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});

  for await(const textPart of result.textStream){
    process.stdout.write(textPart);
  }
    } 
    catch(error) {
        console.log("error ",error)
    }
}
main();