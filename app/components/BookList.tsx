import type { Book } from "@/lib/books";
import BookCard from "./BookCard";

// v5 (Stage 18): reversed from v4's single shared-border divided list —
// Thai's explicit ask this round was "box in box," each book in its own
// separate box, not one continuous list. Now just a plain vertical stack
// with a gap between cards; each `BookCard` draws its own orange border.
export default function BookList({ books }: { books: Book[] }) {
  return (
    <div className="flex flex-col gap-3">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
