import { Link, useParams } from 'react-router-dom'
import { CATEGORY_LABELS } from '../data/types'
import type { Category } from '../data/types'
import styles from './ComingSoonPage.module.css'

interface ComingSoonPageProps {
  mode: 'study' | 'quiz'
}

export default function ComingSoonPage({ mode }: ComingSoonPageProps) {
  const { category } = useParams<{ category: string }>()
  const label =
    category && category in CATEGORY_LABELS
      ? CATEGORY_LABELS[category as Category]
      : 'this category'
  const modeLabel = mode === 'study' ? 'Study' : 'Quiz'

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Link className={styles.back} to={mode === 'study' ? '/study' : '/quiz'}>
          ← Categories
        </Link>
        <h1 className={styles.title}>
          {modeLabel}: {label}
        </h1>
        <p className={styles.subtitle}>
          This mode will be built in a later phase. Category selection and navigation
          are ready.
        </p>
        <Link className={styles.home} to="/">
          Back to Home
        </Link>
      </div>
    </main>
  )
}
