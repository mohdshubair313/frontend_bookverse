"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Context/AuthContext";
import { Book } from "@/types";

export default function EditBookPage() {
  const { id } = useParams();
  const router = useRouter();
  const { currentUser } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    city: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://backendbooksrent-production.up.railway.app/getAllbooks/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setFormData({
          title: data.title,
          description: data.description,
          author: data.author,
          city: data.city,
          status: data.status,
        });
      });
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return alert("You must be logged in");

    setLoading(true);
    try {
      const res = await fetch(
        `https://backendbooksrent-production.up.railway.app/getAllbooks/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, email: currentUser.email }),
        }
      );
      const result = await res.json();
      if (!res.ok) throw new Error(result.message);
      alert("Book updated!");
      router.push(`/books/${id}`);
    } catch (error) {
      alert(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  if (!book) return <div className="text-center py-10 text-muted-foreground">Loading book info...</div>;

  if (currentUser?.email !== book.ownerName) {
    return <div className="text-center py-10 text-destructive">Only the owner can edit this book.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl bg-background/70 shadow-xl backdrop-blur-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Book Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <Input name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <Input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
        <Input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
        <Input name="status" placeholder="Status (available/unavailable)" value={formData.status} onChange={handleChange} required />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Book"}
        </Button>
      </form>
    </div>
  );
}
