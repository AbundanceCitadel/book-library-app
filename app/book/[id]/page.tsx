import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllBooks, getBookById, CATEGORY_LABELS } from "@/lib/books";
import Badge from "@/app/components/Badge";

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

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="tap-target -ml-1 text-sm text-neutral-500 hover:text-accent-600 hover:underline dark:hover:text-accent-400"
      >
        ← Library
      </Link>

      <h1 className="mt-3 text-2xl font-semibold leading-tight sm:text-3xl">
        {book.title}
      </h1>
      <p className="mt-1 text-neutral-500">{book.author}</p>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        {book.categories.map((cat) => (
          <Badge key={cat} tone="accent">
            {CATEGORY_LABELS[cat] ?? cat}
          </Badge>
        ))}
        <Badge>{LANGUAGE_LABELS[book.language] ?? book.language}</Badge>
        <Badge>~{book.estimatedOriginalReadingTimeMinutes} min original read</Badge>
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Whole-Book Summary</h2>
        <p className="prose-reading mt-3 whitespace-pre-line">{book.summary}</p>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">
          {book.structureType === "parts"
            ? "Part-by-Part Breakdown"
            : "Chapter-by-Chapter Breakdown"}
        </h2>
        <ol className="mt-4 space-y-5 border-l-2 border-neutral-200 pl-4 dark:border-neutral-800">
          {book.sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <li key={section.order}>
                <h3 className="text-sm font-semibold">
                  {section.order}. {section.title}
                </h3>
                <p className="prose-reading mt-1 text-sm">{section.summary}</p>
              </li>
            ))}
        </ol>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Key Lessons</h2>
        <ul className="mt-3 space-y-2">
          {book.keyLessons.map((lesson, i) => (
            <li key={i} className="flex gap-2 text-sm">
              <span className="mt-0.5 text-accent-500" aria-hidden="true">
                ✓
              </span>
              <span className="prose-reading text-sm">{lesson}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold">Quotes</h2>
        <div className="mt-3 space-y-4">
          {book.quotes.map((q, i) => (
            <blockquote
              key={i}
              className="border-l-2 border-accent-300 pl-4 dark:border-accent-700"
            >
              <p className="prose-reading italic">&ldquo;{q.text}&rdquo;</p>
              <div className="mt-1 text-xs not-italic text-neutral-500">
                — {q.attribution}
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold">Who This Is For</h2>
          <p className="prose-reading mt-2 text-sm">{book.whoThisIsFor}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">When To Read This</h2>
          <p className="prose-reading mt-2 text-sm">{book.whenToReadThis}</p>
        </div>
      </section>

      {book.relatedBooks.length > 0 && (
        <section className="mt-10 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <h2 className="text-lg font-semibold">Related Books</h2>
          <ul className="mt-3 space-y-1">
            {book.relatedBooks.map((relId) => (
              <li key={relId}>
                <Link
                  href={`/book/${relId}`}
                  className="tap-target text-sm text-accent-600 hover:underline dark:text-accent-400"
                >
                  {relId}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
