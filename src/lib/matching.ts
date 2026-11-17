import { Item, SmartMatchResult } from "@/types";

// Tokenize text into normalized unique keywords (stripping punctuation, lowercased, length > 2)
function extractKeywords(text: string): Set<string> {
  const stopWords = new Set([
    "the", "and", "or", "for", "with", "this", "that", "from", "was", "were",
    "has", "had", "have", "some", "item", "pust", "pundra", "university", "bogura",
    "campus", "please", "lost", "found", "near", "around"
  ]);

  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !stopWords.has(w));

  return new Set(words);
}

// Jaccard similarity between two token sets
function calculateJaccardSimilarity(setA: Set<string>, setB: Set<string>): number {
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersectionSize = 0;
  for (const item of setA) {
    if (setB.has(item)) {
      intersectionSize++;
    }
  }
  const unionSize = new Set([...setA, ...setB]).size;
  return unionSize === 0 ? 0 : intersectionSize / unionSize;
}

/**
 * Calculates the rule-based matching score between a target item and candidate item.
 * Target and Candidate must be opposite types (e.g. one Lost, one Found).
 */
export function calculateItemMatch(target: Item, candidate: Item): SmartMatchResult | null {
  // Target and candidate must be of opposite types
  if (target.type === candidate.type) return null;
  // Cannot match an item with itself or items from the same user
  if (target.id === candidate.id || target.user_id === candidate.user_id) return null;

  const reasons: string[] = [];

  // 1. Category Score (Weight: 30%)
  let categoryScore = 0;
  if (target.category_id && candidate.category_id && target.category_id === candidate.category_id) {
    categoryScore = 30;
    reasons.push(`Matching category: ${target.category?.name || "Identical category"}`);
  }

  // 2. Title and Description Keywords (Weight: 25%)
  const targetKeywords = extractKeywords(`${target.title} ${target.description} ${target.brand || ""}`);
  const candidateKeywords = extractKeywords(`${candidate.title} ${candidate.description} ${candidate.brand || ""}`);
  
  const textSimilarity = calculateJaccardSimilarity(targetKeywords, candidateKeywords);
  const textScore = Math.min(25, Math.round(textSimilarity * 25 * 2.5)); // scaled for short descriptions
  if (textScore >= 8) {
    // Find matching keywords
    const commonKeywords: string[] = [];
    for (const kw of targetKeywords) {
      if (candidateKeywords.has(kw)) commonKeywords.push(kw);
    }
    if (commonKeywords.length > 0) {
      reasons.push(`Keyword overlap in title/description (${commonKeywords.slice(0, 3).join(", ")})`);
    }
  }

  // 3. Color Similarity (Weight: 15%)
  let colorScore = 0;
  const targetColor = target.color.trim().toLowerCase();
  const candidateColor = candidate.color.trim().toLowerCase();
  
  if (targetColor === candidateColor) {
    colorScore = 15;
    reasons.push(`Exact color match: ${target.color}`);
  } else if (
    targetColor.includes(candidateColor) ||
    candidateColor.includes(targetColor) ||
    (targetColor.split(/[\s,/]+/).some((c) => candidateColor.includes(c)))
  ) {
    colorScore = 10;
    reasons.push(`Close color resemblance: ${target.color} / ${candidate.color}`);
  }

  // 4. Location Proximity (Weight: 15%)
  let locationScore = 0;
  const targetLocTokens = extractKeywords(target.location);
  const candidateLocTokens = extractKeywords(candidate.location);
  const locSimilarity = calculateJaccardSimilarity(targetLocTokens, candidateLocTokens);

  if (locSimilarity > 0.5) {
    locationScore = 15;
    reasons.push(`High location proximity (${target.location} & ${candidate.location})`);
  } else if (locSimilarity > 0.1 || target.location.toLowerCase().includes(candidate.location.toLowerCase()) || candidate.location.toLowerCase().includes(target.location.toLowerCase())) {
    locationScore = 10;
    reasons.push(`Similar reported location`);
  }

  // 5. Date Proximity (Weight: 15%)
  // Lost and found dates within 14 days
  let dateScore = 0;
  const targetDate = new Date(target.incident_date).getTime();
  const candidateDate = new Date(candidate.incident_date).getTime();
  
  if (!isNaN(targetDate) && !isNaN(candidateDate)) {
    const diffDays = Math.abs(targetDate - candidateDate) / (1000 * 60 * 60 * 24);
    if (diffDays <= 2) {
      dateScore = 15;
      reasons.push(`Incident dates occurred within 48 hours`);
    } else if (diffDays <= 7) {
      dateScore = 12;
      reasons.push(`Incident dates occurred within the same week`);
    } else if (diffDays <= 14) {
      dateScore = 7;
      reasons.push(`Reported within 2 weeks of each other`);
    }
  }

  const totalScore = categoryScore + textScore + colorScore + locationScore + dateScore;

  // Filter out weak matches (less than 40% similarity)
  if (totalScore < 40) return null;

  return {
    targetItem: target,
    matchedItem: candidate,
    totalScore,
    breakdown: {
      categoryScore,
      textScore,
      colorScore,
      locationScore,
      dateScore,
    },
    reasons: reasons.length > 0 ? reasons : ["Potential item correspondence based on system parameters"],
  };
}

/**
 * Finds all potential matches for a given item against a pool of candidates.
 * Returns matches sorted by highest score first.
 */
export function findMatchesForItem(targetItem: Item, candidatePool: Item[]): SmartMatchResult[] {
  const matches: SmartMatchResult[] = [];

  for (const candidate of candidatePool) {
    const result = calculateItemMatch(targetItem, candidate);
    if (result) {
      matches.push(result);
    }
  }

  return matches.sort((a, b) => b.totalScore - a.totalScore);
}
