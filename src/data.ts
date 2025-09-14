
export type Card = {
  id: string
  title: string
  subtitle?: string
  story: string
  bullets: string[]
  terms: { term: string, def: string }[]
  links: { date: string, place: string, who: string, what: string }[]
  questions: string[]
}

// Load all card JSON files eagerly at build time
const modules = import.meta.glob('./cards/*.json', { eager: true }) as Record<string, { default: Card }>

export const cards: Card[] = Object.values(modules)
  .map(m => m.default)
  .sort((a, b) => a.id.localeCompare(b.id))
