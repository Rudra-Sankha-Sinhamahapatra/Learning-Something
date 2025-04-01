"use client";
import { deleteAuthCookie } from "../actions/auth";
import { useRouter } from "next/navigation";

export const NavOptions = () => {
    const router = useRouter();
    return (
        <div className="flex items-center space-x-3">
              <span className="hidden md:inline-block px-3 py-1 text-xs font-medium bg-blue-800 text-white rounded-full">
                Free Plan
              </span>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                Upgrade
              </button>
              <button className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-300 via-blue-500 to-blue-700 border-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors" onClick={() => {
                deleteAuthCookie("token");
                router.push("/login");
              }}>
               Log out
              </button>
            </div>
    )
}