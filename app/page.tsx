import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-3xl font-bold sm:text-4xl">
        Find what&apos;s good in Pokémon Champions — fast.
      </h1>
      <p className="mt-4 max-w-md text-gray-600 dark:text-gray-400">
        A companion site for casual and new competitive Pokémon Champions
        players — clear answers on what to use and why, without wading
        through raw stats.
      </p>
      <Link
        href="/pokedex"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-indigo-600 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-indigo-700"
      >
        Browse the Pokédex
      </Link>
    </main>
  );
}
