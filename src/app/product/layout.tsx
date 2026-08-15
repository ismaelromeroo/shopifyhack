import type { Metadata } from "next";
import Link from "next/link";
import { PageBackdrop, Wordmark } from "@/components/chrome";

export const metadata: Metadata = {
  title: "Covered — same discount, different shape",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <PageBackdrop />
      <header className="mx-auto flex w-full max-w-[1080px] items-baseline justify-between px-6 pt-7 md:px-10">
        <Link href="/product" className="text-ink">
          <Wordmark />
        </Link>
        <nav className="flex items-baseline gap-6">
          <Link
            href="/product/console"
            className="text-caption font-medium text-g700 transition-colors hover:text-ink"
          >
            Console
          </Link>
          <Link
            href="/deck"
            className="text-caption text-g400 transition-colors hover:text-g600"
          >
            Deck
          </Link>
        </nav>
      </header>
      {children}
    </div>
  );
}
