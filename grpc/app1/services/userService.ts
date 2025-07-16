import type { IUserServiceServer } from "../generated/user_grpc_pb";
import { UserRequest, UserResponse } from "../generated/user_pb";
import type { sendUnaryData,ServerUnaryCall } from "@grpc/grpc-js";

export const userService: IUserServiceServer = {
    getUser: (
        call: ServerUnaryCall<UserRequest, UserResponse>,
        callback: sendUnaryData<UserResponse>
    ) => {
        const userId = call.request.getId();
        const response = new UserResponse();
        response.setId(userId);
        response.setName("Rudra");
        callback(null,response);
    }

}