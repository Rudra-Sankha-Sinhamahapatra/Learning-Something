import { Server, ServerCredentials, type ServiceDefinition, type UntypedServiceImplementation } from "@grpc/grpc-js";
import { UserServiceService } from "./generated/user_grpc_pb";
import { userService } from "./services/userService";

function main() {
    const server = new Server();
    server.addService(
        UserServiceService as unknown as ServiceDefinition<UntypedServiceImplementation>, 
        userService as unknown as UntypedServiceImplementation
    );
    server.bindAsync("0.0.0.0:50051",ServerCredentials.createInsecure(), () => {
    console.log("🚀 gRPC server running at http://0.0.0.0:50051");
    })
}

main();