import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/layout/Sidebar'
import Header from './components/layout/Header'
import HomePage from './pages/HomePage'
import LearnPage from './pages/LearnPage'
import PracticePage from './pages/PracticePage'
import ExamPage from './pages/ExamPage'
import PlaygroundPage from './pages/PlaygroundPage'
import ProgressPage from './pages/ProgressPage'
import AICopilot from './components/ai/AICopilot'
import { ProgressProvider } from './hooks/useProgress'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [copilotOpen, setCopilotOpen] = useState(false)

  return (
    <ProgressProvider>
      <div className="flex h-screen overflow-hidden bg-dark-900">
        <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            onToggleCopilot={() => setCopilotOpen(!copilotOpen)}
            copilotOpen={copilotOpen}
          />
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/learn/:moduleId/:topicId" element={<LearnPage />} />
              <Route path="/practice/:exerciseId" element={<PracticePage />} />
              <Route path="/exam/:examId" element={<ExamPage />} />
              <Route path="/playground" element={<PlaygroundPage />} />
              <Route path="/progress" element={<ProgressPage />} />
            </Routes>
          </main>
        </div>
        <AICopilot isOpen={copilotOpen} onClose={() => setCopilotOpen(false)} />
      </div>
    </ProgressProvider>
  )
}
