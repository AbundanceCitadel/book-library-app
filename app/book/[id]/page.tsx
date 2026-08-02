import { notFound } from "next/navigation";
import {
  getAllBooks,
  getBookById,
  getRelatedBooksInfo,
  CATEGORY_LABELS,
} from "@/lib/books";
import Badge from "@/app/components/Badge";
import BookTabs from "@/app/components/BookTabs";
import BackLink from "@/app/components/BackLink";

export function generateStaticParams() {
  return getAllBooks().map((book) => ({ id: book.id }));
}

const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  vi: "Vietnamese",
  other: "Other language",
};

export default function BookPage({ params }: { params: { id: string } }) {
  const book = getBookById(params.id);
  if (!book) notFound();
  const relatedBooksInfo = getRelatedBooksInfo(book.relatedBooks);

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <BackLink label="Back" fallbackHref="/" />

      <p className="mt-3 font-mono text-xs text-amber-400">No. {book.code}</p>
      <h1 className="mt-1 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
        {book.title}
      </h1>
      <p className="mt-1 text-muted">{book.author}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {book.categories.map((cat) => (
          <Badge key={cat} tone="orange">
            {CATEGORY_LABELS[cat] ?? cat}
          </Badge>
        ))}
        <Badge>{LANGUAGE_LABELS[book.language] ?? book.language}</Badge>
        <Badge>~{book.estimatedOriginalReadingTimeMinutes} min original read</Badge>
      </div>

      <div className="mt-6">
        <BookTabs book={book} relatedBooksInfo={relatedBooksInfo} />
      </div>
    </main>
  );
}
