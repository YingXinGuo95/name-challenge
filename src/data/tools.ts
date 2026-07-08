export interface Tool {
  slug: string;
  /** Generate a placeholder SVG thumbnail. Receives the localized label. */
  thumbnailSvg: (label: string) => string;
}

const placeholderThumbnail = (label: string, color: string) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="225" viewBox="0 0 400 225">
    <rect width="400" height="225" fill="${color}" rx="8"/>
    <text x="200" y="112" text-anchor="middle" fill="white" font-size="18" font-family="sans-serif" font-weight="bold">${escapeXml(label)}</text>
    <text x="200" y="140" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="13" font-family="sans-serif">Sample Tool</text>
  </svg>`;

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Catalog of tools shown on the homepage.
 *
 * To add a new tool:
 *   1. Add an entry to `tools` with a unique `slug`.
 *   2. Add matching content in `app/tools/[slug]/page.tsx` (toolContent).
 *   3. Add matching content in `components/layout/ToolCard.tsx` (cardContent).
 */
export const tools: Tool[] = [
  {
    slug: "text-counter",
    thumbnailSvg: (label: string) => placeholderThumbnail(label, "#4F46E5"),
  },
  {
    slug: "color-converter",
    thumbnailSvg: (label: string) => placeholderThumbnail(label, "#059669"),
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}
