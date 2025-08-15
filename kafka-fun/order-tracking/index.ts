import { orderStatus } from "./orderStatus";
import { sendEvent } from "./producer";
import { status } from "./types";
import "./consumer";

function main() {
    setTimeout(() => {
        setInterval(() => {
            const randomStatus = status[Math.floor(Math.random() * 4)];
            sendEvent({
                orderId: 'order-' + Math.ceil(Math.random() * 5),
                status: randomStatus!,
                timestamp: new Date().toLocaleString()
            });
        }, 1000);
    }, 3000);

    setInterval(() => {
        console.log("Current Order Status: ", Object.fromEntries(orderStatus));
    }, 5000);
}


main();