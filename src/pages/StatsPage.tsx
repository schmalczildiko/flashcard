import { Link } from 'react-router-dom'
import styles from './StatsPage.module.css'

/** Placeholder until session stats are persisted in a later phase. */
export default function StatsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Link className={styles.back} to="/">
          ← Home
        </Link>
        <h1 className={styles.title}>Statistics</h1>
        <p className={styles.subtitle}>
          Progress tracking will appear here in a later phase. No sessions recorded
          yet.
        </p>
      </div>
    </main>
  )
}
