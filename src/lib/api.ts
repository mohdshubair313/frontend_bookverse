// ✅ src/lib/api.ts

import type { Book } from "@/types/index";

const BASE_URL = "https://backendbooksrent-production.up.railway.app";

export const fetchBooks = async (): Promise<Book[]> => {
  const res = await fetch(`${BASE_URL}/api/getAllbooks`);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
};

export const fetchBookById = async (id: string): Promise<Book> => {
  const res = await fetch(`${BASE_URL}/api/getAllbooks/${id}`);
  if (!res.ok) throw new Error("Book not found");
  return res.json();
};

export const addBook = async (bookData: Omit<Book, "id" | "ownerName">) => {
  const res = await fetch(`${BASE_URL}/api/getAllbooks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });
  if (!res.ok) throw new Error("Failed to add book");
  return res.json();
};

export const updateBook = async (id: string, bookData: Partial<Book>) => {
  const res = await fetch(`${BASE_URL}/api/getAllbooks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bookData),
  });
  if (!res.ok) throw new Error("Failed to update book");
  return res.json();
};

export const deleteBook = async (id: string) => {
  const res = await fetch(`${BASE_URL}/api/getAllbooks/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete book");
  return res.json();
};
