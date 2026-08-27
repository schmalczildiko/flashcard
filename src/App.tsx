import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import CategorySelectionPage from './pages/CategorySelectionPage'
import ComingSoonPage from './pages/ComingSoonPage'
import HomePage from './pages/HomePage'
import StatsPage from './pages/StatsPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/study" element={<CategorySelectionPage />} />
          <Route path="/quiz" element={<CategorySelectionPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/study/:category" element={<ComingSoonPage mode="study" />} />
          <Route path="/quiz/:category" element={<ComingSoonPage mode="quiz" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
