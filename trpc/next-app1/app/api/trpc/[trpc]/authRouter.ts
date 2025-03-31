import { initTRPC, TRPCError } from "@trpc/server";
import {z} from "zod";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const t = initTRPC.create();

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
    name: z.string().min(1)
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4)
});

export const authRouter = t.router({
    signup: t.procedure.input(signupSchema).mutation(async ({input}) => {
        const existingUser = await prisma.user.findUnique({
            where: {email: input.email}
        });

        if(existingUser) {
            throw new TRPCError({code: "BAD_REQUEST", message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(input.password,10);

        const user = await prisma.user.create({
            data: {
                email: input.email,
                password: hashedPassword,
                name: input.name
            },
            select: {
                id: true,
                email: true,
                name: true
            }
        });

        const token = jwt.sign({userId: user.id},JWT_SECRET);

        return {
            user,
            token
        }
    }),

    login: t.procedure.input(loginSchema).mutation(async ({input}) => {
        const user = await prisma.user.findUnique({
            where: {email: input.email}
        });

        if(!user) {
            throw new TRPCError({code: "BAD_REQUEST", message:"Invalid credentials"});
        }

        const isPasswordValid = await bcrypt.compare(input.password,user.password);

        if(!isPasswordValid) {
            throw new TRPCError({code:"BAD_REQUEST", message:"Invalid Credentials"});
        }

        const token = jwt.sign({userId: user.id},JWT_SECRET);

        return {
            user:{
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        }
    }),

    verifyToken: t.procedure
    .input(z.object({token : z.string() }))
    .query(({input}) => {
       try {
        const decoded = jwt.verify(input.token,JWT_SECRET) as {userId: string};
        return {valid: true, userId: decoded.userId};
       } catch (error) {
        return {valid: false, message: "Invalid token",error: error};
       }
    })
})