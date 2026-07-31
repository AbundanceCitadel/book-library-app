export default function OfflinePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <div
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full text-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, var(--badge-teal-bg), transparent 70%)",
        }}
        aria-hidden="true"
      >
        📴
      </div>
      <h1 className="mt-4 text-xl font-semibold">You&rsquo;re offline</h1>
      <p className="prose-reading mt-3 text-sm text-muted">
        This page hasn&rsquo;t been saved for offline reading yet. Reconnect
        and visit it once — after that it&rsquo;ll be available offline.
      </p>
    </main>
  );
}
