import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Flashcard from '../components/Flashcard'
import { getCardsByCategory } from '../data/flashcards'
import { CATEGORIES, CATEGORY_LABELS } from '../data/types'
import type { Category } from '../data/types'
import styles from './StudyPage.module.css'

function isCategory(value: string | undefined): value is Category {
  return !!value && (CATEGORIES as string[]).includes(value)
}

export default function StudyPage() {
  const { category } = useParams<{ category: string }>()
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)

  if (!isCategory(category)) {
    return <Navigate to="/study" replace />
  }

  const cards = getCardsByCategory(category)
  const total = cards.length
  const finished = index >= total
  const current = cards[index]

  function handleFlip() {
    setFlipped((prev) => !prev)
  }

  function goToNext() {
    setFlipped(false)
    setIndex((prev) => prev + 1)
  }

  function handleRight() {
    goToNext()
  }

  function handleWrong() {
    goToNext()
  }

  function handleRestart() {
    setIndex(0)
    setFlipped(false)
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Link className={styles.back} to="/study">
          ← Categories
        </Link>
        <h1 className={styles.title}>Study: {CATEGORY_LABELS[category]}</h1>

        {finished ? (
          <div className={styles.done}>
            <p className={styles.subtitle}>You reviewed all {total} cards in this category.</p>
            <div className={styles.doneActions}>
              <button type="button" className={styles.primary} onClick={handleRestart}>
                Study again
              </button>
              <Link className={styles.secondary} to="/">
                Back to Home
              </Link>
            </div>
          </div>
        ) : (
          <>
            <p className={styles.progress}>
              Card {index + 1} of {total}
            </p>
            <Flashcard
              spanish={current.spanish}
              english={current.english}
              flipped={flipped}
              onFlip={handleFlip}
            />
            {flipped && (
              <div className={styles.actions} role="group" aria-label="Mark your answer">
                <button type="button" className={styles.right} onClick={handleRight}>
                  ✅ Right
                </button>
                <button type="button" className={styles.wrong} onClick={handleWrong}>
                  ❌ Wrong
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
