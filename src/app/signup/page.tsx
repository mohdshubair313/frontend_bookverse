"use client";

import SignupForm from "@/components/forms/SignUpForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-green-100 to-emerald-200">
      <div className="w-full max-w-md p-6 rounded-2xl shadow-xl bg-white">
        <h2 className="text-3xl font-bold text-center mb-6 text-green-700">Create a New Account</h2>
        <SignupForm />
      </div>
    </div>
  );
}
