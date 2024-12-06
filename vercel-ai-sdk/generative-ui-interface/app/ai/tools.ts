import {tool as createTool} from 'ai'
import {z} from 'zod'

export const weatherTool = createTool ({
description:"Display the weather for the location",
parameters: z.object({
    location:z.string()
}),
execute: async function ({location}:{location:string}) {
    await new Promise(resolve => setTimeout(resolve,2000));
    return {weather:'Sunny',temperature:18,location}
}
});

export const tools = {
    displayWeather : weatherTool
}