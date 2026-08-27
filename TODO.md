# ✅ Spanish Flashcards App — Feature TODO List (Easy → Hard)

## 🟢 Phase 1: Project Setup and Static Pages

- [x] Initialize project with Vite + React + TypeScript  
  ✅ *Acceptance Criteria:* Running `npm run dev` starts a Vite dev server with a working React+TS project.

- [x] Set up file structure (`/components`, `/data`, `/pages`)  
  ✅ *Acceptance Criteria:* Directory structure exists with logical separation of components, static data, and page views.

- [x] Create static JSON or TS file with flashcards grouped by category (animals, food, verbs)  
  ✅ *Acceptance Criteria:* File exports at least 3 cards per category with correct format: `spanish`, `english`, `category`, and `quiz`.

- [x] Create Home Page with navigation buttons:
  - [x] Study Mode  
    ✅ *Acceptance Criteria:* Button/link navigates to category selection for study mode.
  - [x] Quiz Mode  
    ✅ *Acceptance Criteria:* Button/link navigates to quiz category selection.
  - [x] Stats Page  
    ✅ *Acceptance Criteria:* Button/link navigates to the statistics page.

## 🟢 Phase 2: Flashcard Study Mode (Basic)

- [x] Create `CategorySelectionPage` to pick a category  
  ✅ *Acceptance Criteria:* Lists all 3 categories; clicking one proceeds to Study or Quiz based on mode selected.

- [ ] Create `Flashcard` component to show:
  - [ ] Spanish word (front side)  
    ✅ *Acceptance Criteria:* Spanish word is displayed by default.
  - [ ] English word (back side)  
    ✅ *Acceptance Criteria:* Card flips to show English translation.
  - [ ] Flip interaction (click-to-flip)  
    ✅ *Acceptance Criteria:* Card responds to click or tap and visually flips to show other side.

- [ ] Display "✅ Right" and "❌ Wrong" buttons after flipping  
  ✅ *Acceptance Criteria:* Buttons appear only after flipping and let the user mark the answer as correct or incorrect. After clicking a button, the next card is displayed.

- [ ] Track incorrect answers in React state  
  ✅ *Acceptance Criteria:* Cards marked as "Wrong" are stored in component-level or app-level state for later use.

- [ ] Allow user to move through all cards in the selected category  
  ✅ *Acceptance Criteria:* User can navigate through the flashcards one by one until all cards are reviewed.

## 🟡 Phase 3: Redo Mode (Repeat Wrong Cards)

- [ ] Add "Redo Wrong Cards" button on Home or Study end screen  
  ✅ *Acceptance Criteria:* Button appears after study session ends (if there were wrong cards); clicking it starts a redo session.

- [ ] Show only previously failed cards in redo session  
  ✅ *Acceptance Criteria:* Flashcard component is reused but only displays cards marked wrong in the previous round.

- [ ] Allow resetting of the "wrong" list  
  ✅ *Acceptance Criteria:* User can clear the list of wrong cards from a button or settings section.

## 🟡 Phase 4: Quiz Mode

- [ ] Build `QuizSelectionPage` to pick a category and quiz type  
  ✅ *Acceptance Criteria:* Page shows quiz types (Multiple Choice, Fill in the Blank) and categories to start the quiz.

- [ ] Implement Multiple Choice Quiz:
  - [ ] Display Spanish word  
    ✅ *Acceptance Criteria:* Spanish word is clearly shown at the top.
  - [ ] Show 4 English options (1 correct, 3 distractors from static data)  
    ✅ *Acceptance Criteria:* Exactly 4 options are shown; one matches the correct answer from the flashcard data.
  - [ ] Feedback on correct/incorrect selection  
    ✅ *Acceptance Criteria:* User is informed immediately whether their choice was right or wrong.

- [ ] Implement Fill-in-the-Blank Quiz:
  - [ ] Display Spanish word  
    ✅ *Acceptance Criteria:* Spanish word is visible as the prompt.
  - [ ] Input field for English word  
    ✅ *Acceptance Criteria:* User can type the English translation in a text box.
  - [ ] Case-insensitive comparison  
    ✅ *Acceptance Criteria:* Input is considered correct regardless of letter casing.
  - [ ] Show if answer is correct or not  
    ✅ *Acceptance Criteria:* App gives clear feedback (e.g., "Correct!" or "Wrong — the answer was: ...").

## 🔴 Phase 5: Statistics Tracking

- [ ] Track number of cards studied per category  
  ✅ *Acceptance Criteria:* Every time a card is studied, it is counted and stored in the app's state per category.

- [ ] Track number of correct vs. incorrect responses  
  ✅ *Acceptance Criteria:* Study and quiz sessions increment the respective counts for correct/wrong answers.

- [ ] Store data in `localStorage` (or memory if persistence isn't needed)  
  ✅ *Acceptance Criteria:* Stats persist even after browser refresh (if using localStorage); otherwise, reset with refresh.

- [ ] Create `StatsPage` to display:
  - [ ] Total cards studied  
    ✅ *Acceptance Criteria:* Shows a total count of studied cards across all categories.
  - [ ] Number/percentage correct  
    ✅ *Acceptance Criteria:* Displays total correct, incorrect, and overall accuracy %.
  - [ ] Breakdown by category  
    ✅ *Acceptance Criteria:* Stats are grouped and labeled by category (e.g., Animals: 80% correct).
