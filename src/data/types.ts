export type Category = 'animals' | 'food' | 'verbs'

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

export const CATEGORIES: Category[] = ['animals', 'food', 'verbs']

export const CATEGORY_LABELS: Record<Category, string> = {
  animals: 'Animals',
  food: 'Food',
  verbs: 'Verbs',
}
