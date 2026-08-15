export interface Team {
  code: string; // Kalshi market suffix
  city: string;
  nickname: string;
  aliases: string[]; // lowercase match terms, most specific first
}

export const MLB_TEAMS: Team[] = [
  { code: "NYY", city: "New York", nickname: "Yankees", aliases: ["yankees", "new york yankees", "nyy"] },
  { code: "NYM", city: "New York", nickname: "Mets", aliases: ["mets", "new york mets", "nym"] },
  { code: "BOS", city: "Boston", nickname: "Red Sox", aliases: ["red sox", "boston", "bos"] },
  { code: "LAD", city: "Los Angeles", nickname: "Dodgers", aliases: ["dodgers", "los angeles dodgers", "lad"] },
  { code: "LAA", city: "Los Angeles", nickname: "Angels", aliases: ["angels", "los angeles angels", "laa"] },
  { code: "CHC", city: "Chicago", nickname: "Cubs", aliases: ["cubs", "chicago cubs", "chc"] },
  { code: "CWS", city: "Chicago", nickname: "White Sox", aliases: ["white sox", "chicago white sox", "cws"] },
  { code: "ATL", city: "Atlanta", nickname: "Braves", aliases: ["braves", "atlanta", "atl"] },
  { code: "HOU", city: "Houston", nickname: "Astros", aliases: ["astros", "houston", "hou"] },
  { code: "PHI", city: "Philadelphia", nickname: "Phillies", aliases: ["phillies", "philadelphia", "phi"] },
  { code: "SD", city: "San Diego", nickname: "Padres", aliases: ["padres", "san diego", "sd"] },
  { code: "SF", city: "San Francisco", nickname: "Giants", aliases: ["giants", "san francisco", "sf"] },
  { code: "SEA", city: "Seattle", nickname: "Mariners", aliases: ["mariners", "seattle", "sea"] },
  { code: "TEX", city: "Texas", nickname: "Rangers", aliases: ["rangers", "texas", "tex"] },
  { code: "TB", city: "Tampa Bay", nickname: "Rays", aliases: ["rays", "tampa bay", "tampa", "tb"] },
  { code: "TOR", city: "Toronto", nickname: "Blue Jays", aliases: ["blue jays", "jays", "toronto", "tor"] },
  { code: "MIN", city: "Minnesota", nickname: "Twins", aliases: ["twins", "minnesota", "min"] },
  { code: "MIL", city: "Milwaukee", nickname: "Brewers", aliases: ["brewers", "milwaukee", "mil"] },
  { code: "STL", city: "St. Louis", nickname: "Cardinals", aliases: ["cardinals", "st. louis", "st louis", "stl"] },
  { code: "BAL", city: "Baltimore", nickname: "Orioles", aliases: ["orioles", "baltimore", "bal"] },
  { code: "CLE", city: "Cleveland", nickname: "Guardians", aliases: ["guardians", "cleveland", "cle"] },
  { code: "DET", city: "Detroit", nickname: "Tigers", aliases: ["tigers", "detroit", "det"] },
  { code: "KC", city: "Kansas City", nickname: "Royals", aliases: ["royals", "kansas city", "kc"] },
  { code: "CIN", city: "Cincinnati", nickname: "Reds", aliases: ["reds", "cincinnati", "cin"] },
  { code: "PIT", city: "Pittsburgh", nickname: "Pirates", aliases: ["pirates", "pittsburgh", "pit"] },
  { code: "MIA", city: "Miami", nickname: "Marlins", aliases: ["marlins", "miami", "mia"] },
  { code: "WSH", city: "Washington", nickname: "Nationals", aliases: ["nationals", "nats", "washington", "wsh"] },
  { code: "COL", city: "Colorado", nickname: "Rockies", aliases: ["rockies", "colorado", "col"] },
  { code: "AZ", city: "Arizona", nickname: "Diamondbacks", aliases: ["diamondbacks", "dbacks", "d-backs", "arizona", "az"] },
  { code: "ATH", city: "Sacramento", nickname: "Athletics", aliases: ["athletics", "a's", "as", "oakland", "ath"] },
];

export function findTeam(text: string): Team | null {
  const t = ` ${text.toLowerCase()} `;
  let best: { team: Team; len: number } | null = null;
  for (const team of MLB_TEAMS) {
    for (const a of team.aliases) {
      // word-boundary containment; prefer the longest alias hit
      if (t.includes(` ${a} `) || t.includes(` ${a},`) || t.includes(` ${a}.`)) {
        if (!best || a.length > best.len) best = { team, len: a.length };
      }
    }
  }
  return best?.team ?? null;
}
