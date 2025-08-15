import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const visionLocationTool = createTool({
    id: 'extract-location-from-image',
    description: 'Extract location information from an image using AI vision',
    inputSchema: z.object({
        imageUrl: z.string().url().describe('URL of the image to analyze'),
        description: z.string().optional().describe('Optional description of what to look for in the image'),
    }),
    outputSchema: z.object({
        location: z.string().describe('Guessed location from the image'),
        confidence: z.string().describe('Confidence level of the location guess'),
        landmarks: z.array(z.string()).optional().describe('Landmarks or notable features identified'),
        country: z.string().optional().describe('Country if identifiable'),
        city: z.string().optional().describe('City if identifiable'),
    }),
    execute: async ({ context }) => {
        const { imageUrl, description = 'Identify the location from this image' } = context;

        try {
            const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
            if (!apiKey) {
                throw new Error('GOOGLE_GENERATIVE_AI_API_KEY is missing for vision tool');
            }

            const imageResponse = await fetch(imageUrl);
            if (!imageResponse.ok) {
                throw new Error(`Failed to fetch image: ${imageResponse.status}`);
            }

            const imageBuffer = await imageResponse.arrayBuffer();
            const base64Image = Buffer.from(imageBuffer).toString('base64');

            const requestBody = {
                contents: [
                    {
                        parts: [
                            {
                                text: `${description}. Please analyze this image and identify:
                1. The most likely location (city, country)
                2. Any identifiable landmarks or notable features
                3. Your confidence level in the location guess

                 Respond with just the location name (City, Country format) and confidence level.`
                            },
                            {
                                inline_data: {
                                    mime_type: "image/jpeg",
                                    data: base64Image
                                }
                            }
                        ]
                    }
                ]
            };

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Vision API Response:', errorText);
                throw new Error(`Vision API error: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to analyze image';

            console.log('Vision API Response:', responseText);

            const locationMatch = responseText.match(/([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*),\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/);
            const confidenceMatch = responseText.match(/(High|Medium|Low)/i);

            return {
                location: locationMatch ? locationMatch[0] : responseText.substring(0, 50) || 'Unknown location',
                confidence: confidenceMatch ? confidenceMatch[0] : 'Medium',
                landmarks: [],
                country: locationMatch ? locationMatch[2] : undefined,
                city: locationMatch ? locationMatch[1] : undefined,
            };

        } catch (error) {
            console.error('Vision API Error:', error);
            return {
                location: 'Unable to determine location',
                confidence: 'Low',
                landmarks: [],
                country: undefined,
                city: undefined,
            };
        }
    },
});