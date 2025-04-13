"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/Context/AuthContext";
import { updateBook } from "@/lib/api";
import type { Book } from "@/types";

interface Props {
  initialData?: Book;
  onSuccess?: () => void;
}

export default function BookForm({ initialData, onSuccess }: Props) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return alert("Please login first");

    setLoading(true);
    try {
      if (initialData) {
        await updateBook(initialData.id, formData);
      } else {
        console.log("no message")
        // await addBook({ ...formData, title: user.name, ownerId: user.id });
      }
      onSuccess?.();
      alert("Book saved successfully!");
    } catch (error) {
        console.error("something happen in bookform component",error)
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto p-6">
      <Input
        name="title"
        placeholder="Book Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <Textarea
        name="description"
        placeholder="Book Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <Input
        name="category"
        placeholder="Category (e.g., Fiction, Science)"
        value={formData.category}
        onChange={handleChange}
        required
      />
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : initialData ? "Update Book" : "Add Book"}
      </Button>
    </form>
  );
}
