import express, { type Request, type Response } from "express"
import { client } from "./redis";
import { random } from "./random";

const app = express();

app.use(express.json());

await client.connect();

app.get("/", async (req: Request, res: Response) => {
    try {
        const min = 1;
        const max = 100000;

        const rand = Math.floor(Math.random() * (max - min + 1)) + min;

        const data = random(rand);


        const redisResult = await client.xAdd(
            'random:data',
            '*', {
            'data': JSON.stringify(data),
        }, {
            TRIM: {
            strategy: 'MAXLEN',
            strategyModifier: '~',
            threshold: 150
        }
    });


        const length = await client.xLen('random:data');
        const smgrId = await client.xRange('random:data', '-', '+');
        console.log(redisResult);
        console.log(smgrId)

        return res.status(200).json({
            message: "Sent",
            redisResult,
            length
        })
    } catch (error: any) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
})

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000")
})