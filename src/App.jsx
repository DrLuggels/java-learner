import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import ModulePage from './pages/ModulePage'
import ExamPage from './pages/ExamPage'
import WeaknessPage from './pages/WeaknessPage'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/modul/:id" element={<ModulePage />} />
        <Route path="/klausur" element={<ExamPage />} />
        <Route path="/schwaechen" element={<WeaknessPage />} />
      </Routes>
    </Layout>
  )
}
