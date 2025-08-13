import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

type Summary = {
  minTemp: number;
  maxTemp: number;
  avgHumidity: number;
  avgWindSpeed: number;
  maxPrecipitationChance: number;
  conditionSummary: string;
};

function gearFromSummary(s: Summary): string[] {
    const items: string[] = [];
    if (s.maxPrecipitationChance >= 50) items.push('Umbrella or waterproof jacket');
    if (s.avgWindSpeed >= 25) items.push('Windbreaker');
    if (s.maxTemp >= 30) items.push('Light clothing, sunscreen, water bottle');
    if (s.minTemp <= 5) items.push('Warm layers, gloves, beanie');
    if (s.avgHumidity >= 80 && s.maxTemp >= 24) items.push('Breathable fabrics');
    if (/snow|hail/i.test(s.conditionSummary)) items.push('Waterproof boots');
    if (/thunder/i.test(s.conditionSummary)) items.push('Avoid exposed areas');
    if (items.length === 0) items.push('Regular attire is fine');
    return items;
  }

  export const gearAdviceTool = createTool({
    id: 'gear-advice',
    description: 'Deterministic gear/activity advice based on forecast summary',
    inputSchema: z.object({
        summary: z.object({
            minTemp: z.number(),
            maxTemp: z.number(),
            avgHumidity: z.number(),
            avgWindSpeed: z.number(),
            maxPrecipitationChance: z.number(),
            conditionSummary: z.string(),
        }),
    }),
    outputSchema: z.object({
        suggestions: z.array(z.string()),
      }),
      execute: async ({ context }) => {
        const s = context.summary as Summary;
        const suggestions = gearFromSummary(s);
        return { suggestions };
      },
  });