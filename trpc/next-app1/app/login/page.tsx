"use client";

import { Eye, EyeOff, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "../_trpc/client";

export default function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    },
    onError: (error) => {
      console.error("login failed: ", error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#a7dcf0] via-[#d3e8f1] to-white flex items-center  justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gradient-to-b  from-[#a3e1f6] via-[#f0f7fa] to-white backdrop-blur-sm rounded-3xl p-8 shadow-xl">
          <div className="flex items-center justify-center">
            <div className="rounded-xl bg-white p-3 shadow-xl">
              <LogIn className="h-6 w-6 text-gray-500" />
            </div>
          </div>

          <div className="text-center mt-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Sign in with Email
            </h2>
            <p className="text-gray-600 text-center max-w-[360px] mx-auto tracking-tight text-md">
              Make your life easier with TaskFlow, organize your tasks and get
              things done.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full text-black pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <LogIn className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full text-black pl-10 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
              {showPassword===true?  <Eye className="h-5 w-5 text-gray-400" />: <EyeOff className="h-5 w-5 text-gray-400" />}
              </button>
            </div>

            {loginMutation.error && (
              <div className="text-red-500 text-sm text-center">
                {loginMutation.error.message}
              </div>
            )}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-600 hover:gray-800"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 cursor-pointer"
            >
              {loginMutation.isPending ? "Logging in..." : "Get Started"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
