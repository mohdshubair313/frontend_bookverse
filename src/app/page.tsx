"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";

export default function LandingPage() {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#e0e7ff] flex flex-col justify-center items-center text-center px-4">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-6xl font-bold text-[#1f2937] mb-6"
      >
        📚 Welcome to BookVerse
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-[#374151] max-w-xl mb-10"
      >
        Discover, rent, and share your favorite books with a vibrant community of readers.
      </motion.p>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {!currentUser ? (
          <>
            <Link href="/login">
              <Button variant="outline" className="bg-white hover:bg-[#f3f4f6] text-[#1f2937] border-[#cbd5e1]">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white">
                Signup
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Button onClick={() => router.push("/dashboard")} className="bg-[#34d399] hover:bg-[#10b981] text-white">
              Go to Dashboard
            </Button>
            <Button onClick={() => router.push("/getAllbooks")} className="bg-[#60a5fa] hover:bg-[#3b82f6] text-white">
              Browse Books
            </Button>
            <Button onClick={() => logout()}>
              Log out <LogOut />  
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <Button onClick={() => router.push("/getAllbooks")} className="bg-[#fbbf24] hover:bg-[#f59e0b] text-black">
          📖 Rent a Book
        </Button>
        {currentUser?.role === "owner" && (
          <Button onClick={() => router.push("/publish_books")} className="bg-[#ef4444] hover:bg-[#dc2626] text-white">
            ➕ Add New Book
          </Button>
        )}

        <Link href="https://github.com/mohdshubair313/frontend_bookverse">
        <Button>
          Github link
        </Button>
        </Link>
      </div>
    </main>
  );
}
