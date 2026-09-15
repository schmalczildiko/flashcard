import { Link } from 'react-router-dom'
import { CATEGORIES, CATEGORY_LABELS } from '../data/types'
import type { AppMode, Category } from '../data/types'
import styles from './CategorySelectionPage.module.css'

interface CategorySelectionPageProps {
  mode: AppMode
}

export default function CategorySelectionPage({ mode }: CategorySelectionPageProps) {
  const title = mode === 'quiz' ? 'Choose a quiz category' : 'Choose a study category'

  function hrefFor(category: Category) {
    return `/${mode}/${category}`
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
