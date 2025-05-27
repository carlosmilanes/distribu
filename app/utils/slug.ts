/**
 * Converts a distribu name to a URL-safe slug
 * @param name - The distribu name (e.g., "Family Budget")
 * @returns URL-safe slug (e.g., "family-budget")
 */
export function createSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Converts a URL slug back to a searchable name format
 * @param slug - The URL slug (e.g., "family-budget")
 * @returns Searchable name (e.g., "family budget")
 */
export function slugToSearchName(slug: string): string {
  return slug.replace(/-/g, ' ').toLowerCase().trim();
}

/**
 * Converts a slug to a display-friendly format
 * @param slug - The URL slug (e.g., "family-budget")
 * @returns Display name (e.g., "Family Budget")
 */
export function slugToDisplayName(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}
