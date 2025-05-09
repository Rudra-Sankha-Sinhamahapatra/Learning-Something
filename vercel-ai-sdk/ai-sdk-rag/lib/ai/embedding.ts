import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { db } from '../db';
import { cosineDistance, desc, gt, sql } from 'drizzle-orm';
import { embeddings } from '../db/schema/embeddings';
import { embed, embedMany } from 'ai';


const API_KEY = process.env.GEMINI_API_KEY
if(!API_KEY) {
    throw new Error("No api key found");
}
const google = createGoogleGenerativeAI({
    apiKey:API_KEY,
})

const embeddingModel = google.textEmbeddingModel("text-embedding-004", {
  outputDimensionality: 512,
});

const generateChunks = (input: string): string[] => {
    return input
      .trim()
      .split('.')
      .filter(i => i !== '');
  };
  
  export const generateEmbeddings = async (
    value: string,
  ): Promise<Array<{ embedding: number[]; content: string }>> => {
    const chunks = generateChunks(value);
    const { embeddings } = await embedMany({
      model: embeddingModel,
      values: chunks,
    });
    return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
  };
  
  export const generateEmbedding = async (value: string): Promise<number[]> => {
    const input = value.replaceAll('\\n', ' ');
    const { embedding } = await embed({
      model: embeddingModel,
      value: input,
    });
    return embedding;
  };
  
  export const findRelevantContent = async (userQuery: string) => {
    // console.log("Query received:", userQuery);
    const userQueryEmbedded = await generateEmbedding(userQuery);
    const similarity = sql<number>`1 - (${cosineDistance(
      embeddings.embedding,
      userQueryEmbedded,
    )})`;
    const similarGuides = await db
      .select({ name: embeddings.content, similarity })
      .from(embeddings)
      .where(gt(similarity, 0.5))
      .orderBy(t => desc(t.similarity))
      .limit(4);

      // console.log("Similar results:", similarGuides); 
      return similarGuides.length > 0 ? similarGuides : "Sorry, I don't know.";
  };