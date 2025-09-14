import { client } from "./redis";
import type { XReadStream } from "./types";

async function main() {
    await client.connect();

    console.log("Worker Started ...");

    while (true) {
        try {
          const res = await client.xRead({
            key: 'random:data',
            id: '$'
          }, {
            COUNT: 1000,
            BLOCK: 100
          }) as XReadStream[] | null;

          if (res) {
            for (const stream of res) {
                for (const msg of stream.messages) {
                    const parsed = JSON.parse(msg.message.data!);
          console.log("New Response: ",parsed)
          }
        }
    }
        } catch (err: any) {
            console.error("Worker loop error:", err.message);

        }
    }
}

main()