import { expect, test } from '@playwright/test'
import { getCardsByCategory } from '../src/data/flashcards'
import { CATEGORIES, CATEGORY_LABELS } from '../src/data/types'

function pickRandom<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!
}

test.describe('Home page', () => {
  test('shows brand and main navigation links', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByText('Spanish Flashcards')).toBeVisible()
    await expect(page.getByRole('heading', { name: /Learn Spanish/i })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Study Mode' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Quiz Mode' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Stats Page' })).toBeVisible()
  })
})

test.describe('Category selection', () => {
  test('Study Mode lists all categories and opens study for Animals', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Study Mode' }).click()

    await expect(page).toHaveURL('/study')
    await expect(page.getByRole('heading', { name: 'Choose a study category' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Animals' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Food' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Verbs' })).toBeVisible()

    await page.getByRole('link', { name: 'Animals' }).click()
    await expect(page).toHaveURL('/study/animals')
    await expect(page.getByRole('heading', { name: 'Study: Animals' })).toBeVisible()
  })

  test('Quiz Mode lists categories and opens coming-soon for Food', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Quiz Mode' }).click()

    await expect(page).toHaveURL('/quiz')
    await expect(page.getByRole('heading', { name: 'Choose a quiz category' })).toBeVisible()

    await page.getByRole('link', { name: 'Food' }).click()
    await expect(page).toHaveURL('/quiz/food')
    await expect(page.getByRole('heading', { name: 'Quiz: Food' })).toBeVisible()
    await expect(page.getByText(/later phase/i)).toBeVisible()
  })
})

test.describe('Stats page', () => {
  test('navigates from home to statistics placeholder', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'Stats Page' }).click()

    await expect(page).toHaveURL('/stats')
    await expect(page.getByRole('heading', { name: 'Statistics' })).toBeVisible()
    await expect(page.getByText(/No sessions recorded/i)).toBeVisible()
  })
})

test.describe('Study mode flashcards', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/study/animals')
  })

  test('shows Spanish on the front and hides Right/Wrong until flipped', async ({ page }) => {
    await expect(page.getByText('Card 1 of 4')).toBeVisible()
    await expect(page.getByRole('button', { name: /Spanish: el gato/i })).toBeVisible()
    await expect(page.getByRole('button', { name: '✅ Right' })).toHaveCount(0)
    await expect(page.getByRole('button', { name: '❌ Wrong' })).toHaveCount(0)
  })

  test('flips to English and reveals Right/Wrong buttons', async ({ page }) => {
    await page.getByRole('button', { name: /Spanish: el gato/i }).click()

    await expect(page.getByRole('button', { name: /English: the cat/i })).toBeVisible()
    await expect(page.getByRole('button', { name: '✅ Right' })).toBeVisible()
    await expect(page.getByRole('button', { name: '❌ Wrong' })).toBeVisible()
  })

  test('Right advances to the next card and resets to Spanish', async ({ page }) => {
    await page.getByRole('button', { name: /Spanish: el gato/i }).click()
    await page.getByRole('button', { name: '✅ Right' }).click()

    await expect(page.getByText('Card 2 of 4')).toBeVisible()
    await expect(page.getByRole('button', { name: /Spanish: el perro/i })).toBeVisible()
    await expect(page.getByRole('button', { name: '✅ Right' })).toHaveCount(0)
  })

  test('Wrong advances to the next card', async ({ page }) => {
    await page.getByRole('button', { name: /Spanish: el gato/i }).click()
    await page.getByRole('button', { name: '❌ Wrong' }).click()

    await expect(page.getByText('Card 2 of 4')).toBeVisible()
    await expect(page.getByRole('button', { name: /Spanish: el perro/i })).toBeVisible()
  })

  test('completing all cards shows the end screen', async ({ page }) => {
    for (let i = 0; i < 4; i++) {
      await page.getByRole('button', { name: /Spanish:/i }).click()
      await page.getByRole('button', { name: '✅ Right' }).click()
    }

    await expect(page.getByText('You reviewed all 4 cards in this category.')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Study again' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Back to Home' })).toBeVisible()
  })

  test('Study again restarts the deck', async ({ page }) => {
    for (let i = 0; i < 4; i++) {
      await page.getByRole('button', { name: /Spanish:/i }).click()
      await page.getByRole('button', { name: '✅ Right' }).click()
    }

    await page.getByRole('button', { name: 'Study again' }).click()

    await expect(page.getByText('Card 1 of 4')).toBeVisible()
    await expect(page.getByRole('button', { name: /Spanish: el gato/i })).toBeVisible()
  })

  test('invalid category redirects to category selection', async ({ page }) => {
    await page.goto('/study/not-a-category')
    await expect(page).toHaveURL('/study')
    await expect(page.getByRole('heading', { name: 'Choose a study category' })).toBeVisible()
  })

  test('switching category starts a new deck from card 1', async ({ page }) => {
    const foodCards = getCardsByCategory('food')
    const firstFood = foodCards[0]

    await page.getByRole('button', { name: /Spanish: el gato/i }).click()
    await page.getByRole('button', { name: '✅ Right' }).click()
    await expect(page.getByText('Card 2 of 4')).toBeVisible()

    await page.getByRole('link', { name: '← Categories' }).click()
    await page.getByRole('link', { name: 'Food' }).click()

    await expect(page).toHaveURL('/study/food')
    await expect(page.getByText(`Card 1 of ${foodCards.length}`)).toBeVisible()
    await expect(
      page.getByRole('button', { name: `Spanish: ${firstFood.spanish}. Click to flip.` }),
    ).toBeVisible()
  })

  test('Animals: random Right or Wrong advances to the next card', async ({ page }) => {
    const answer = pickRandom(['✅ Right', '❌ Wrong'] as const)
    test.info().annotations.push({ type: 'answer', description: answer })

    await page.getByRole('button', { name: /Spanish: el gato/i }).click()
    await page.getByRole('button', { name: answer }).click()

    await expect(page.getByText('Card 2 of 4')).toBeVisible()
    await expect(page.getByRole('button', { name: /Spanish: el perro/i })).toBeVisible()
    await expect(page.getByRole('button', { name: '✅ Right' })).toHaveCount(0)
  })
})

test.describe('Study mode flashcards — randomized category', () => {
  test('random category, then flip, then random Right/Wrong advances', async ({ page }) => {
    const category = pickRandom(CATEGORIES)
    const cards = getCardsByCategory(category)
    const [first, second] = cards

    test.info().annotations.push({
      type: 'category',
      description: `${category} (${CATEGORY_LABELS[category]})`,
    })

    await page.goto(`/study/${category}`)

    await expect(page.getByRole('heading', { name: `Study: ${CATEGORY_LABELS[category]}` })).toBeVisible()
    await expect(page.getByText(`Card 1 of ${cards.length}`)).toBeVisible()
    await expect(page.getByRole('button', { name: `Spanish: ${first.spanish}. Click to flip.` })).toBeVisible()
    await expect(page.getByRole('button', { name: '✅ Right' })).toHaveCount(0)

    await page.getByRole('button', { name: `Spanish: ${first.spanish}. Click to flip.` }).click()
    await expect(
      page.getByRole('button', { name: `English: ${first.english}. Click to flip back.` }),
    ).toBeVisible()
    await expect(page.getByRole('button', { name: '✅ Right' })).toBeVisible()
    await expect(page.getByRole('button', { name: '❌ Wrong' })).toBeVisible()

    const answer = pickRandom(['✅ Right', '❌ Wrong'] as const)
    test.info().annotations.push({ type: 'answer', description: answer })
    await page.getByRole('button', { name: answer }).click()

    await expect(page.getByText(`Card 2 of ${cards.length}`)).toBeVisible()
    await expect(page.getByRole('button', { name: `Spanish: ${second.spanish}. Click to flip.` })).toBeVisible()
  })
})
