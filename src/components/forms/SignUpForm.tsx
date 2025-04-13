// Enhanced Signup Form
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Context/AuthContext";
import Link from "next/link";

export default function SignupForm() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    mobile: string;
    role: "owner" | "seeker";
  }>({
    name: "",
    email: "",
    password: "",
    mobile: "",
    role: "owner",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(formData);
      alert("Signup successful! You can now login.");
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full mx-auto mt-10">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Join BookVerse 📘</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input name="name" placeholder="Full Name" onChange={handleChange} required />
        <Input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
        <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <Input name="mobile" placeholder="Mobile Number" onChange={handleChange} required />
        <Button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </Button>
      </form>
      <p className="text-sm text-center text-gray-500 mt-4">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-600 hover:underline font-medium">Login</Link>
      </p>
    </div>
  );
}