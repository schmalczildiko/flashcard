import styles from './Flashcard.module.css'

interface FlashcardProps {
  spanish: string
  english: string
  flipped: boolean
  onFlip: () => void
}

export default function Flashcard({ spanish, english, flipped, onFlip }: FlashcardProps) {
  // Accessible name is also what Playwright uses to find the card.
  const ariaLabel = flipped
    ? `English: ${english}. Click to flip back.`
    : `Spanish: ${spanish}. Click to flip.`

  return (
    <button
      type="button"
      className={`${styles.card} ${flipped ? styles.flipped : ''}`}
      onClick={onFlip}
      aria-label={ariaLabel}
    >
      <div className={styles.inner}>
        <div className={styles.face}>
          <span className={styles.label}>Spanish</span>
          <span className={styles.word}>{spanish}</span>
          <span className={styles.hint}>Tap to flip</span>
        </div>
        <div className={`${styles.face} ${styles.back}`}>
          <span className={styles.label}>English</span>
          <span className={styles.word}>{english}</span>
          <span className={styles.hint}>Tap to flip back</span>
        </div>
      </div>
    </button>
  )
}
