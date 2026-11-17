/**
 * Parses highlighted text from the admin home configuration into individual points.
 * Handles:
 * - Line breaks / newlines
 * - Bullet points (•, -, *, etc.)
 * - Pipe separators ( | )
 * - Single-line sentence breaks when multiple sentences are present
 */
export function parseHighlightPoints(text: string): string[] {
  if (!text) return [];

  // Split by newlines first
  let lines = text
    .split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean);

  // If there's only 1 line, check if it contains bullet points, pipes, or sentence boundaries
  if (lines.length === 1) {
    const single = lines[0];
    if (single.includes('•')) {
      lines = single.split('•').map(s => s.trim()).filter(Boolean);
    } else if (single.includes(' | ')) {
      lines = single.split(' | ').map(s => s.trim()).filter(Boolean);
    } else if (/(?<=\.)\s+(?=[A-Z0-9\[])/.test(single)) {
      lines = single.split(/(?<=\.)\s+(?=[A-Z0-9\[])/).map(s => s.trim()).filter(Boolean);
    }
  }

  // Remove leading bullet or numbering markers: •, -, *, 1., 1), etc.
  return lines
    .map(line => line.replace(/^([•\-\*–—✓✔]|\d+[\.\)])\s*/, '').trim())
    .filter(Boolean);
}
