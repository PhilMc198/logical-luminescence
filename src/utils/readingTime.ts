/**
 * Estimates reading time for a given body of text.
 * Used in essay layouts and index cards.
 * Average adult reading speed: ~238 words/minute (research-backed).
 */
export function readingTime(text: string, wordsPerMinute = 238): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

/**
 * Formats reading time for display.
 * e.g. readingTimeLabel(7) → "7 min read"
 */
export function readingTimeLabel(minutes: number): string {
  return `${minutes} min read`;
}
