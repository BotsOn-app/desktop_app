import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import * as React from 'react'
import { HomePage } from './pages/HomePage';
import { BotPage } from './pages/BotPage';
import { SettingsPage } from './pages/SettingsPage';

declare global {
  interface Window {
    api?: any
  }
}

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bot/:id" element={<BotPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  )
}

export default App
