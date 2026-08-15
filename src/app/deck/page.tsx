import type { Metadata } from "next";
import Deck from "@/components/deck/deck";

export const metadata: Metadata = {
  title: "Deck — A Different Shape for the Discount Budget",
};

export default function DeckPage() {
  return <Deck />;
}
