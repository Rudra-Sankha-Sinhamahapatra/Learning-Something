import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import dotenv from "dotenv"
import fs from 'fs'
import path from 'path';

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
        const filePath = path.resolve(__dirname, '../pdf/ai.pdf');
const { text } = await generateText({
  model: google('gemini-1.5-flash'),
  messages:[
    {
        role:'user',
        content:[
            {
                type:"text",
                text:"What kind of project is this according to this document?"
            },
            {
                type:'file',
                data: fs.readFileSync(filePath),
                mimeType:"application/pdf",
            }
        ]
    }
  ]
});
console.log(text);
    } 
    catch(error) {
        console.log("error ",error)
    }
}
main();