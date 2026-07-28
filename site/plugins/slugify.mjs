/** Shared slugifier — used by the wikilink plugin and the blog routes so they always agree. */
export function slugify(input) {
  return String(input)
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9/]+/g, '-')
    .replace(/\/+/g, '/')
    .replace(/^-+|-+$/g, '')
    .replace(/-*\/-*/g, '/');
}
