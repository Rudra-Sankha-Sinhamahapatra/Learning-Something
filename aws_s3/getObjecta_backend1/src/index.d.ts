import { Request as ExpressRequest } from 'express';

declare global {
    namespace Express {
        interface Request {
            body: {
                objectName?: string;  // This makes sure the request body can have objectName
            };
        }
    }
}
