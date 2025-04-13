"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Context/AuthContext";
import { Book } from "@/types";

export default function BookDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch(`https://backendbooksrent-production.up.railway.app/api/getAllbooks/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data));
  }, [id]);

  if (!book) return <div className="text-center py-10 text-muted-foreground">Loading book details...</div>;

  const isOwner = currentUser?.email === book.ownerName;

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card className="shadow-xl p-6 rounded-3xl border border-muted bg-background/50 backdrop-blur-lg">
        <CardContent className="space-y-5">
          <h2 className="text-3xl font-bold text-primary">{book.title}</h2>
          <p className="text-muted-foreground">{book.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <p><strong>Author:</strong> {book.ownerName}</p>
            <p><strong>City:</strong> {book.title}</p>
            {/* <p><strong>Status:</strong> {book.status}</p> */}
            <p><strong>Owner:</strong> {book.ownerName}</p>
            <Badge className="w-fit">{book.category}</Badge>
          </div>

          {isOwner && (
            <Button className="mt-4" onClick={() => router.push(`/getAllbooks/${id}/edit`)}>
              Edit Book
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
