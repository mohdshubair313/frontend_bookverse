// Enhanced Login Form
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      router.push("/");
    } catch (error) {
      console.log("Login error:", error);
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Welcome Back 👋</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-4">
        Don’t have an account?{' '}
        <Link href="/signup" className="text-indigo-600 hover:underline font-medium">Signup</Link>
      </p>
    </div>
  );
}