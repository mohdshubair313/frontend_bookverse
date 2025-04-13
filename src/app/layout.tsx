// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/Context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Book Exchange",
  description: "Rent and exchange books with ease",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
