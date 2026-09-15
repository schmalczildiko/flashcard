export const CATEGORIES = ['animals', 'food', 'verbs'] as const

export type Category = (typeof CATEGORIES)[number]

export type AppMode = 'study' | 'quiz'

export type QuizType = 'multiple-choice' | 'fill-in-the-blank'

export interface Flashcard {
  category: Category
  spanish: string
  english: string
  quiz: {
    type: QuizType
    options: string[]
  }
}

export const CATEGORY_LABELS: Record<Category, string> = {
  animals: 'Animals',
  food: 'Food',
  verbs: 'Verbs',
}

/** Narrows a route param (or any string) to a known flashcard category. */
export function isCategory(value: string | undefined): value is Category {
  return value !== undefined && (CATEGORIES as readonly string[]).includes(value)
}
