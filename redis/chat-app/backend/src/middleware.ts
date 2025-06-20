import type { Request, Response, NextFunction } from 'express';
import { AuthUtils } from './auth';
import type { JWTPayload } from './auth';

export interface AuthenticatedRequest extends Request {
    user?: JWTPayload;
}

export const authenticate = (request: Request): JWTPayload | null => {
    const authHeader = request.headers.authorization;
    const token = AuthUtils.extractTokenFromHeader(authHeader);
    
    if (!token) {
        return null;
    }

    return AuthUtils.verifyToken(token);
};

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    const user = authenticate(req);
    if (!user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
    }
    
    // Add user to request object
    (req as AuthenticatedRequest).user = user;
    next();
}; 