"use client";

import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-amber-100 to-yellow-200">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-amber-700">Login to Your Account</h2>
        <LoginForm />
      </div>
    </div>
  );
}