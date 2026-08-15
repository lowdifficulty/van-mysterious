import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <p className="text-[0.68rem] uppercase tracking-[0.3em] text-gold">
        Missing frame
      </p>
      <h1 className="font-display mt-4 text-5xl text-cream sm:text-6xl">404</h1>
      <p className="mt-4 max-w-md text-muted">
        This scene was never shot. The archive kept the number and lost the
        picture.
      </p>
      <Link href="/" className="btn-gold mt-8">
        Return
      </Link>
    </main>
  );
}
