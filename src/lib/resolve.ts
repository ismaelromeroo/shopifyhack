import { findTeam, type Team } from "./teams";

export interface Resolution {
  ticker: string;
  seriesTicker: string;
  team: Team;
  /** plain-language restatement of the trigger, for the claim ticket */
  plain: string;
  triggerKind: "world_series" | "playoffs";
}

const WS_PATTERNS = /\b(world series|championship|win(s)? it all|go(es)? all the way)\b/;
const PLAYOFF_PATTERNS = /\b(playoffs?|postseason|october)\b/;

/**
 * Resolve a plain-English promo sentence to a Kalshi market.
 * Deliberately narrow: MLB team + {World Series, playoffs}. Anything else
 * returns null and the console explains what it can resolve.
 */
export function resolvePromo(text: string): Resolution | null {
  const team = findTeam(text);
  if (!team) return null;
  const lower = text.toLowerCase();

  if (WS_PATTERNS.test(lower)) {
    return {
      ticker: `KXMLB-26-${team.code}`,
      seriesTicker: "KXMLB",
      team,
      plain: `the ${team.nickname} win the World Series`,
      triggerKind: "world_series",
    };
  }
  if (PLAYOFF_PATTERNS.test(lower)) {
    return {
      ticker: `KXMLBPLAYOFFS-26-${team.code}`,
      seriesTicker: "KXMLBPLAYOFFS",
      team,
      plain: `the ${team.nickname} make the playoffs`,
      triggerKind: "playoffs",
    };
  }
  return null;
}
