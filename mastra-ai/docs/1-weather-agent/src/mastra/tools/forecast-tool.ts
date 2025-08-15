import { createTool } from '@mastra/core/tools';
import { z } from "zod";

interface GeocodingResponse {
    results: { latitude: number; longitude: number; name: string }[];
}

interface ForecastResponse {
    hourly: {
        time: string[];
        temperature_2m: number[];
        relative_humidity_2m: number[];
        precipitation_probability: number[];
        wind_speed_10m: number[];
        weather_code: number[];
    };
}

function getWeatherCondition(code: number): string {
  const conditions: Record<number, string> = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Foggy', 48: 'Depositing rime fog',
    51: 'Light drizzle', 53: 'Moderate drizzle', 55: 'Dense drizzle',
    56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
    61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    66: 'Light freezing rain', 67: 'Heavy freezing rain',
    71: 'Slight snow fall', 73: 'Moderate snow fall', 75: 'Heavy snow fall',
    77: 'Snow grains', 80: 'Slight rain showers', 81: 'Moderate rain showers', 82: 'Violent rain showers',
    85: 'Slight snow showers', 86: 'Heavy snow showers',
    95: 'Thunderstorm', 96: 'Thunderstorm with slight hail', 99: 'Thunderstorm with heavy hail',
  }

  return conditions[code] || 'Unknown';
}

export const forecastTool = createTool({
    id: 'get-forecast-summary',
    description: 'Get next N hours forecast summary for a location',
    inputSchema: z.object({
        location: z.string().describe('City name'),
        hours: z.number().int().min(1).max(48).default(24),
    }),
    outputSchema: z.object({
        location: z.string(),
        from: z.string(),
        to: z.string(),
        minTemp: z.number(),
        maxTemp: z.number(),
        avgHumidity: z.number(),
        avgWindSpeed: z.number(),
        maxPrecipitationChance: z.number(),
        conditionSummary: z.string(),
    }),
    execute: async ({ context }) => {
        const { location, hours } = context;
        const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`;
        const geocodingRes = await fetch(geocodingUrl);
        const geocodingData = (await geocodingRes.json()) as GeocodingResponse;


    if (!geocodingData.results?.[0]) {
        throw new Error(`Location '${location}' not found`);
      }

      const { latitude, longitude, name } = geocodingData.results[0];
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,wind_speed_10m,weather_code&forecast_days=2`;
      const forecastRes = await fetch(forecastUrl);
      const data = (await forecastRes.json()) as ForecastResponse;

      const now = new Date();
      const idxNow = data.hourly.time.findIndex(t => new Date(t) >= now);
      const startIdx = idxNow >= 0 ? idxNow : 0;
      const endIdx = Math.min(startIdx + hours, data.hourly.time.length);

      const temps = data.hourly.temperature_2m.slice(startIdx, endIdx);
      const hums = data.hourly.relative_humidity_2m.slice(startIdx, endIdx);
      const precs = data.hourly.precipitation_probability.slice(startIdx, endIdx);
      const winds = data.hourly.wind_speed_10m.slice(startIdx, endIdx);
      const codes = data.hourly.weather_code.slice(startIdx, endIdx);

      const minTemp = Math.min(...temps);
      const maxTemp = Math.max(...temps);
      const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
      const avgHumidity = Number(avg(hums).toFixed(1));
      const avgWindSpeed = Number(avg(winds).toFixed(1));
      const maxPrecipitationChance = Math.max(...precs);

      const codeMode = (() => {
        const map = new Map<number, number>();
        for (const c of codes) map.set(c, (map.get(c) || 0) + 1);
        let best = codes[0], cnt = 0;
        for (const [c, n] of map) if (n > cnt) { best = c; cnt = n; }
        return best;
      })();


    return {
        location: name,
        from: data.hourly.time[startIdx],
        to: data.hourly.time[endIdx - 1],
        minTemp,
        maxTemp,
        avgHumidity,
        avgWindSpeed,
        maxPrecipitationChance,
        conditionSummary: getWeatherCondition(codeMode),
      };
    },
});