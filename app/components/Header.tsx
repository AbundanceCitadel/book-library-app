import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-border bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="tap-target text-base font-semibold tracking-tight"
        >
          📚 Book Library
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
