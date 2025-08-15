import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { LibSQLStore } from '@mastra/libsql';
import { weatherTool } from '../tools/weather-tool';
import { forecastTool } from '../tools/forecast-tool';
import { gearAdviceTool } from '../tools/gear-tool';
import { ttsTool } from '../tools/tts-tool';

const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
if (!apiKey) {
  throw new Error(
    "GOOGLE_GENERATIVE_AI_API_KEY is missing. Set it in your environment before starting the server.",
  );
}

const google = createGoogleGenerativeAI({ apiKey });

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `
      You are a helpful weather assistant that provides accurate weather information and can help planning activities based on the weather.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn't in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative
      - If the user asks for activities and provides the weather forecast, suggest activities based on the weather forecast.
      - If the user asks for activities, respond in the format they request.

      Available tools:
      - weatherTool: fetch current weather data
      - forecastTool: get forecast summary for next N hours
      - gearAdviceTool: suggest gear based on forecast
      - speak: convert text to speech (only use when explicitly requested by user)
  `,
  model: google('gemini-2.5-pro'),
  tools: { weatherTool, forecastTool, gearAdviceTool, ttsTool },
  memory: new Memory({
    storage: new LibSQLStore({
      url: 'file:../mastra.db',
    }),
  }),
});