import { Link, useParams } from 'react-router-dom'
import { CATEGORY_LABELS, isCategory } from '../data/types'
import type { AppMode } from '../data/types'
import styles from './ComingSoonPage.module.css'

interface ComingSoonPageProps {
  mode: AppMode
}

export default function ComingSoonPage({ mode }: ComingSoonPageProps) {
  const { category } = useParams<{ category: string }>()
  const label = isCategory(category) ? CATEGORY_LABELS[category] : 'this category'
  const modeLabel = mode === 'study' ? 'Study' : 'Quiz'

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Link className={styles.back} to={`/${mode}`}>
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
