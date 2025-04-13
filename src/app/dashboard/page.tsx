"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import image1 from '@/app/assests/image1.jpg'

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://backendbooksrent-production.up.railway.app/api/getAllbooks")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-14 px-4 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))
        : books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ scale: 1.03 }}
              className="bg-gradient-to-br from-zinc-100/30 to-white/10 dark:from-zinc-800/40 dark:to-zinc-900/30 backdrop-blur-md border border-white/10 dark:border-zinc-700 rounded-3xl shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                <Image
                  src={image1}
                  alt="Book Cover"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={index < 3} // prioritize loading top cards
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
              </div>

              <CardContent className="relative z-20 p-6 space-y-3 text-zinc-800 dark:text-zinc-100">
                <CardTitle className="text-xl font-bold tracking-tight">
                  {book.title}
                </CardTitle>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 line-clamp-2">
                  <strong>Description:</strong> {book.description}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="text-sm text-zinc-600 dark:text-zinc-300">
                  <strong>City:</strong> {book.city}
                </p>
                <div
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${
                    book.status === "available"
                      ? "bg-green-500/20 text-green-700 dark:text-green-300"
                      : "bg-red-500/20 text-red-700 dark:text-red-300"
                  }`}
                >
                  {book.status}
                </div>
              </CardContent>
            </motion.div>
          ))}
    </div>
  );
}
