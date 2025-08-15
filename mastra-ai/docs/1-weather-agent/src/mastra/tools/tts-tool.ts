import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const ttsTool = createTool({
  id: 'speak',
  description: 'Convert text to speech using Google Translate TTS',
  inputSchema: z.object({
    text: z.string().describe('Text to convert to speech'),
    language: z.string().default('en').optional(),
  }),
  outputSchema: z.object({
    audioUrl: z.string(),
    message: z.string(),
  }),
  execute: async ({ context }) => {
    const { text, language = 'en' } = context;
    
    const limitedText = text.length > 100 ? text.substring(0, 100) + '...' : text;
    
    const encodedText = encodeURIComponent(limitedText);
    
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=${language}&client=tw-ob`;
    
    return {
      audioUrl,
      message: `Generated speech for: "${limitedText}"`,
    };
  },
});