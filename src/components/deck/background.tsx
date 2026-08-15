"use client";

/**
 * Felt, not seen: a fine grid drifting one cell per two minutes, two grey
 * clouds crossing even slower, static paper grain. If a viewer notices any
 * of it during a sentence, it is too strong.
 */
export function DeckBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="deck-grid absolute -inset-24" />
      <div className="deck-halo absolute left-[-12%] top-[-18%] h-[110vmin] w-[110vmin] rounded-full" />
      <div className="deck-halo deck-halo-b absolute bottom-[-22%] right-[-10%] h-[95vmin] w-[95vmin] rounded-full" />
      <div className="deck-grain absolute inset-0" />
    </div>
  );
}
