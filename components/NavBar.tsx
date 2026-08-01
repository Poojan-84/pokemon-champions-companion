import Link from "next/link";

export function NavBar() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3"
      >
        <Link href="/" className="text-lg font-bold">
          Champions Companion
        </Link>
        <Link
          href="/pokedex"
          className="text-sm font-medium text-gray-700 hover:underline dark:text-gray-300"
        >
          Pokédex
        </Link>
      </nav>
    </header>
  );
}
