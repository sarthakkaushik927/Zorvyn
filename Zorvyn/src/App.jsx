import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/layout/Sidebar.jsx'
import Header from './components/layout/Header.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Transactions from './pages/Transactions.jsx'
import Insights from './pages/Insights.jsx'

const PAGE_META = {
  '/': { title: 'Dashboard', subtitle: 'Your financial overview at a glance' },
  '/transactions': { title: 'Transactions', subtitle: 'Track every income & expense' },
  '/insights': { title: 'Insights', subtitle: 'Understand your spending patterns' },
}

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex flex-col flex-1" style={{ marginLeft: '260px', transition: 'margin 0.3s ease' }}>
        <Header
          onMenuToggle={() => setSidebarOpen(v => !v)}
          title={PAGE_META[window.location.pathname]?.title || 'FinFlow'}
          subtitle={PAGE_META[window.location.pathname]?.subtitle || ''}
        />

        <main className="flex-1 overflow-y-auto px-8 py-7" style={{ marginTop: '70px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </main>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-col)',
            borderRadius: '12px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.875rem',
          },
        }}
      />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}
