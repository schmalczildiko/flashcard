import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import CategorySelectionPage from './pages/CategorySelectionPage'
import ComingSoonPage from './pages/ComingSoonPage'
import HomePage from './pages/HomePage'
import StatsPage from './pages/StatsPage'
import StudyPage from './pages/StudyPage'

export default function App() {
  // Study and quiz share CategorySelectionPage; only study/:category is interactive.
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/study" element={<CategorySelectionPage mode="study" />} />
          <Route path="/quiz" element={<CategorySelectionPage mode="quiz" />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/study/:category" element={<StudyPage />} />
          <Route path="/quiz/:category" element={<ComingSoonPage mode="quiz" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
