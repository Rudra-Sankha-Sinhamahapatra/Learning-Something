import type { Request, Response } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../../db/db';
import { usersTable } from '../../db/schema/schema';
import { AuthUtils, validateEmail, validatePassword } from '../auth';

interface SignupRequest {
    name: string;
    email: string;
    password: string;
}

interface SigninRequest {
    email: string;
    password: string;
}

export const authRoutes = {
    signup: async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, email, password }: SignupRequest = req.body;

            // Validation
            if (!name || !email || !password) {
                res.status(400).json({ 
                    error: 'Name, email, and password are required' 
                });
                return;
            }

            if (!validateEmail(email)) {
                res.status(400).json({ 
                    error: 'Invalid email format' 
                });
                return;
            }

            if (!validatePassword(password)) {
                res.status(400).json({ 
                    error: 'Password must be at least 6 characters long' 
                });
                return;
            }

            // Check if user already exists
            const existingUser = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, email))
                .limit(1);

            if (existingUser.length > 0) {
                res.status(409).json({ 
                    error: 'User with this email already exists' 
                });
                return;
            }

            // Hash password
            const hashedPassword = await AuthUtils.hashPassword(password);

            // Create user
            const newUser = await db
                .insert(usersTable)
                .values({
                    name,
                    email,
                    password: hashedPassword,
                })
                .returning({ id: usersTable.id, name: usersTable.name, email: usersTable.email });

            if (!newUser[0]) {
                res.status(500).json({ 
                    error: 'Failed to create user' 
                });
                return;
            }

            // Generate JWT token
            const token = AuthUtils.generateToken({
                userId: newUser[0].id,
                email: newUser[0].email,
            });

            res.status(201).json({
                message: 'User created successfully',
                user: {
                    id: newUser[0].id,
                    name: newUser[0].name,
                    email: newUser[0].email,
                },
                token,
            });

        } catch (error) {
            console.error('Signup error:', error);
            res.status(500).json({ 
                error: 'Internal server error' 
            });
        }
    },

    signin: async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password }: SigninRequest = req.body;

            // Validation
            if (!email || !password) {
                res.status(400).json({ 
                    error: 'Email and password are required' 
                });
                return;
            }

            if (!validateEmail(email)) {
                res.status(400).json({ 
                    error: 'Invalid email format' 
                });
                return;
            }

            // Find user
            const user = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, email))
                .limit(1);

            if (user.length === 0) {
                res.status(401).json({ 
                    error: 'Invalid credentials' 
                });
                return;
            }

            const foundUser = user[0];
            if (!foundUser) {
                res.status(401).json({ 
                    error: 'Invalid credentials' 
                });
                return;
            }

            // Verify password
            const isValidPassword = await AuthUtils.comparePassword(password, foundUser.password);

            if (!isValidPassword) {
                res.status(401).json({ 
                    error: 'Invalid credentials' 
                });
                return;
            }

            // Generate JWT token
            const token = AuthUtils.generateToken({
                userId: foundUser.id,
                email: foundUser.email,
            });

            res.status(200).json({
                message: 'Signin successful',
                user: {
                    id: foundUser.id,
                    name: foundUser.name,
                    email: foundUser.email,
                },
                token,
            });

        } catch (error) {
            console.error('Signin error:', error);
            res.status(500).json({ 
                error: 'Internal server error' 
            });
        }
    },

    profile: async (req: Request, res: Response): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;
            const token = AuthUtils.extractTokenFromHeader(authHeader);

            if (!token) {
                res.status(401).json({ 
                    error: 'Authentication required' 
                });
                return;
            }

            const payload = AuthUtils.verifyToken(token);
            if (!payload) {
                res.status(401).json({ 
                    error: 'Invalid token' 
                });
                return;
            }

            // Get user details
            const user = await db
                .select({
                    id: usersTable.id,
                    name: usersTable.name,
                    email: usersTable.email,
                    createdAt: usersTable.createdAt,
                })
                .from(usersTable)
                .where(eq(usersTable.id, payload.userId))
                .limit(1);

            if (user.length === 0) {
                res.status(404).json({ 
                    error: 'User not found' 
                });
                return;
            }

            res.status(200).json({
                user: user[0],
            });

        } catch (error) {
            console.error('Profile error:', error);
            res.status(500).json({ 
                error: 'Internal server error' 
            });
        }
    },
}; 