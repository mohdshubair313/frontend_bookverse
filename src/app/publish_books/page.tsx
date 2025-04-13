"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/Context/AuthContext";
import { useRouter } from "next/navigation";

export default function AddBookForm() {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false); // 🔥 you forgot this earlier

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    city: "",
    ownerEmail: "",
    status: "available",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 🚫 prevent default form submit

    if (isLoading) return; // wait for user to be loaded

    if (!currentUser || !currentUser.email) {
      toast({
        title: "Login required",
        description: "Please login before publishing a book.",
        variant: "destructive",
      });
      return;
    }

    const payload = {
      ...formData,
      ownerEmail: currentUser.email,
    };

    console.log("Payload being sent:", payload);

    setLoading(true);

    try {
      const res = await fetch(
        "https://backendbooksrent-production.up.railway.app/api/publish_books",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to add book");

      toast({
        title: "Book Published 🎉",
        description: `“${formData.title}” is now live in your dashboard.`,
      });

      router.push("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: String(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-2xl border border-muted mt-8 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        📚 Rent Out Your Book
      </h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <Input
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="rounded-xl"
        />
        <Textarea
          name="description"
          placeholder="Book Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="rounded-xl"
        />
        <Input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="rounded-xl"
        />
        <Input 
        name = "ownerEmail"
        placeholder="Enter you Email"
        value={formData.ownerEmail}
        onChange={handleChange}
        required
        className="rounded-xl"
        />
        <Input
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
          className="rounded-xl"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="p-2 rounded-xl border border-input bg-background text-foreground"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <Button type="submit" disabled={loading || isLoading} className="rounded-xl text-md">
          {loading ? "Publishing..." : "Publish Book"}
        </Button>
      </form>
    </div>
  );
}
