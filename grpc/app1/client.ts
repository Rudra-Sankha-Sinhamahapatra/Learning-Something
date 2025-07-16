import { credentials } from "@grpc/grpc-js";
import { UserServiceClient } from "./generated/user_grpc_pb";
import { UserRequest } from "./generated/user_pb";

const client = new UserServiceClient(
    "localhost:50051",
    credentials.createInsecure()
);

const request = new UserRequest();
request.setId("123");

client.getUser(request, (err, response) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Response:", {
            id: response?.getId(),
            name: response?.getName()
        });
    }
});
