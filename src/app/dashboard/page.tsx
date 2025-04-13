// app/books/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Book } from "@/types";

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
    <div className="max-w-6xl mx-auto py-10 px-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {loading
        ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-36 rounded-xl" />)
        : books.map((book) => (
            <Card key={book.id} className="rounded-xl hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <CardTitle className="text-lg">{book.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">Author: {book.ownerName}</p>
                <p className="text-sm text-muted-foreground">Category: {book.category}</p>
              </CardContent>
            </Card>
          ))}
    </div>
  );
}
