// Enhanced BookCard Component with Modern UI/UX
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book } from "@/types";
import { motion } from "framer-motion";

export default function BookCard({ book }: { book: Book }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200 hover:border-indigo-500 transition-all duration-300">
        <CardContent className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 truncate">
            {book.title}
          </h3>
          <p className="text-gray-500 mb-4 line-clamp-3 text-sm">
            {book.description}
          </p>
          <div className="flex items-center justify-between text-xs">
            <Badge className="bg-indigo-100 text-indigo-600 font-medium px-2 py-1 rounded-full">
              {book.category}
            </Badge>
            <span className="text-gray-400 font-medium">Owner: {book.ownerName}</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}