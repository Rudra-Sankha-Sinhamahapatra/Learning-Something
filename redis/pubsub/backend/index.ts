import { WebSocketServer, WebSocket } from "ws";
import { redisSubscriber, redisPublisher } from "./redis";
import { connectRedis } from "./redis";
import { config } from "./config";


const wss = new WebSocketServer({ port: Number(config.port) });
console.log(`WebSocket server is running on port ${config.port}`);

const clients = new Set<WebSocket>();

(async() => {
    await connectRedis();
})();

wss.on("connection",(ws)=> {
    clients.add(ws);
    ws.on("close",()=> clients.delete(ws));
});

await redisSubscriber.subscribe("stock:updates", (message) => {
    for (let client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });
  

setInterval(() => {
const stock = {
    symbol: "AAPL",
    price: (Math.random() * 1000).toFixed(2),
    time: new Date().toLocaleTimeString(),
};
redisPublisher.publish("stock:updates",JSON.stringify(stock));
},2000);