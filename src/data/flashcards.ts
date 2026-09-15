import type { Flashcard } from './types'

export const flashcards: Flashcard[] = [
  // Animals
  {
    category: 'animals',
    spanish: 'el gato',
    english: 'the cat',
    quiz: {
      type: 'multiple-choice',
      options: ['the dog', 'the house', 'the cat', 'the bird'],
    },
  },
  {
    category: 'animals',
    spanish: 'el perro',
    english: 'the dog',
    quiz: {
      type: 'multiple-choice',
      options: ['the cat', 'the dog', 'the fish', 'the horse'],
    },
  },
  {
    category: 'animals',
    spanish: 'el pájaro',
    english: 'the bird',
    quiz: {
      type: 'multiple-choice',
      options: ['the bird', 'the cow', 'the mouse', 'the rabbit'],
    },
  },
  {
    category: 'animals',
    spanish: 'el caballo',
    english: 'the horse',
    quiz: {
      type: 'multiple-choice',
      options: ['the pig', 'the horse', 'the sheep', 'the duck'],
    },
  },
  // Food
  {
    category: 'food',
    spanish: 'el pan',
    english: 'the bread',
    quiz: {
      type: 'multiple-choice',
      options: ['the bread', 'the cheese', 'the milk', 'the apple'],
    },
  },
  {
    category: 'food',
    spanish: 'la manzana',
    english: 'the apple',
    quiz: {
      type: 'multiple-choice',
      options: ['the orange', 'the banana', 'the apple', 'the grape'],
    },
  },
  {
    category: 'food',
    spanish: 'el queso',
    english: 'the cheese',
    quiz: {
      type: 'multiple-choice',
      options: ['the butter', 'the cheese', 'the egg', 'the rice'],
    },
  },
  {
    category: 'food',
    spanish: 'el agua',
    english: 'the water',
    quiz: {
      type: 'multiple-choice',
      options: ['the juice', 'the wine', 'the coffee', 'the water'],
    },
  },
  // Verbs
  {
    category: 'verbs',
    spanish: 'hablar',
    english: 'to speak',
    quiz: {
      type: 'multiple-choice',
      options: ['to eat', 'to speak', 'to write', 'to run'],
    },
  },
  {
    category: 'verbs',
    spanish: 'comer',
    english: 'to eat',
    quiz: {
      type: 'multiple-choice',
      options: ['to drink', 'to sleep', 'to eat', 'to walk'],
    },
  },
  {
    category: 'verbs',
    spanish: 'escribir',
    english: 'to write',
    quiz: {
      type: 'multiple-choice',
      options: ['to write', 'to read', 'to listen', 'to see'],
    },
  },
  {
    category: 'verbs',
    spanish: 'correr',
    english: 'to run',
    quiz: {
      type: 'multiple-choice',
      options: ['to jump', 'to swim', 'to dance', 'to run'],
    },
  },
]

/** Returns the deck for a category in the same order as `flashcards`. */
export function getCardsByCategory(category: Flashcard['category']): Flashcard[] {
  return flashcards.filter((card) => card.category === category)
}
