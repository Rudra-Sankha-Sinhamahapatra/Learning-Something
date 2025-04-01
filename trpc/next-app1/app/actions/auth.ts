'use server';

import { cookies } from "next/headers";
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { type AppRouter } from '@/app/api/trpc/[trpc]/router';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/trpc`,
    }),
  ],
});

export async function setAuthCookie(name:string, token:string) {
    (await cookies()).set(name, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "strict",
        maxAge: 60*60*24*30,
    });
}

export async function deleteAuthCookie(name:string) {
    (await cookies()).delete(name);
}

export async function checkAuth() {
    const token = (await cookies()).get("token")?.value;
    if(!token) {
        return {isAuthenticated: false};
    }

    try {
        const result = await trpc.auth.verifyToken.query({ token });
        return {isAuthenticated: result.valid, token};
    } catch (error) {
        return {isAuthenticated: false, error};
    }
}

export async function getUserId() {
    const token = (await cookies()).get("token")?.value;
    if(!token) {
        return null;
    }

    try {
        const result = await trpc.auth.verifyToken.query({ token });
        return result.valid && 'userId' in result ? result.userId : null;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}