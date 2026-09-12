import type { CategoryId, Meme } from '../types'

/**
 * POST /api/memes  ->  { memes: [{ id, imageUrl, caption }] }
 *
 * The request goes through the Vite dev server, which proxies /api to the
 * Express backend (vite.config.ts). This keeps the OpenRouter key off the
 * browser — secrets live on the server, never in the frontend.
 */
export async function generateMemes(category: CategoryId): Promise<Meme[]> {
  const res = await fetch('/api/memes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category }),
  })

  if (!res.ok) {
    throw new Error("Couldn't generate memes. Please try again.")
  }

  const data = (await res.json()) as { memes: Meme[] }
  return data.memes
}