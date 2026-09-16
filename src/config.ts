/**
 * Base URL of the Django backend API.
 *
 * In local dev this is left empty and Vite's dev server proxies `/api/*`
 * to Django directly (see vite.config.ts). In production, set
 * VITE_API_BASE_URL at build time (e.g. Render static site env var) to the
 * deployed Django service's URL, since the React app and the Django API
 * are deployed as two separate Render services with different origins.
 *
 * Example: VITE_API_BASE_URL=https://foodsnap-django.onrender.com
 */
export const API_BASE_URL: string = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

/** Prefix a `/api/...` path with the configured backend origin. */
export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}