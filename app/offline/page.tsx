export default function OfflinePage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <div className="text-3xl" aria-hidden="true">
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
