// ✅ types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  mobile: string;
  role: "owner" | "seeker";
}

export interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  city: string;
  ownerEmail: string;
  status: string;
}
