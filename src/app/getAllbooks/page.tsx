"use client";

import { useEffect, useState } from "react";
import { Book } from "@/types";
import BookCard from "@/components/book/BooksCard";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://backendbooksrent-production.up.railway.app/api/getAllbooks")
      .then(res => res.json())
      .then(data => setBooks(data.books || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-3xl font-bold">Available Books</h1>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => <BookCard key={book.id} book={book} />)}
        </div>
      )}
    </div>
  );
}
