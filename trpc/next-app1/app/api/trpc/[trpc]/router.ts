import {initTRPC} from "@trpc/server";
import {z} from "zod";
import { prisma } from "@/lib/prisma";
import { authRouter } from "./authRouter";

const t = initTRPC.create();

export const appRouter = t.router({
    auth: authRouter,
    
    hello : t.procedure.input(z.object({
        text:z.string().optional()
    })).query(({input}) => {
        return { message: `Hello ${input.text ?? "world"}` }
    }),
    
    // Todo CRUD operations
    getTodos: t.procedure.query(async () => {
        return await prisma.todo.findMany({
            orderBy: { createdAt: 'desc' }
        });
    }),
    
    getTodoById: t.procedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            return await prisma.todo.findUnique({
                where: { id: input.id }
            });
        }),
    
    createTodo: t.procedure
        .input(z.object({ title: z.string().min(1),userId: z.string().min(1) }))
        .mutation(async ({ input }) => {
            return await prisma.todo.create({
                data: { title: input.title, userId: input.userId }
            });
        }),
    
    updateTodo: t.procedure
        .input(z.object({ 
            id: z.string(),
            title: z.string().min(1).optional(),
            completed: z.boolean().optional()
        }))
        .mutation(async ({ input }) => {
            const { id, ...data } = input;
            return await prisma.todo.update({
                where: { id },
                data
            });
        }),
    
    deleteTodo: t.procedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input }) => {
            return await prisma.todo.delete({
                where: { id: input.id }
            });
        })
});

export type AppRouter = typeof appRouter; 