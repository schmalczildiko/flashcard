import { Link, useLocation } from 'react-router-dom'
import { CATEGORIES, CATEGORY_LABELS } from '../data/types'
import type { Category } from '../data/types'
import styles from './CategorySelectionPage.module.css'

type Mode = 'study' | 'quiz'

export default function CategorySelectionPage() {
  const location = useLocation()
  const mode: Mode = location.pathname.startsWith('/quiz') ? 'quiz' : 'study'
  const title = mode === 'quiz' ? 'Choose a quiz category' : 'Choose a study category'

  function hrefFor(category: Category) {
    return mode === 'quiz' ? `/quiz/${category}` : `/study/${category}`
  }

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <Link className={styles.back} to="/">
          ← Home
        </Link>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>Animals, food, and verbs — pick one to continue.</p>
        <ul className={styles.list}>
          {CATEGORIES.map((category) => (
            <li key={category}>
              <Link className={styles.categoryLink} to={hrefFor(category)}>
                {CATEGORY_LABELS[category]}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
