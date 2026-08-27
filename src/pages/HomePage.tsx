import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Spanish Flashcards</p>
        <h1 className={styles.title}>Learn Spanish, one card at a time</h1>
        <p className={styles.subtitle}>
          Study vocabulary, take quizzes, and track your progress across animals,
          food, and verbs.
        </p>
        <nav className={styles.nav} aria-label="Main modes">
          <Link className={styles.primary} to="/study">
            Study Mode
          </Link>
          <Link className={styles.secondary} to="/quiz">
            Quiz Mode
          </Link>
          <Link className={styles.secondary} to="/stats">
            Stats Page
          </Link>
        </nav>
      </div>
    </main>
  )
}
