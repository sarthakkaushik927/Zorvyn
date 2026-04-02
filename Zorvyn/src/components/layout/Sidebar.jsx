import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, ArrowLeftRight, Lightbulb, TrendingUp, Settings, Wallet, ChevronRight } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/insights', icon: Lightbulb, label: 'Insights' },
]

export default function Sidebar({ mobileOpen, onClose }) {
  const { transactions } = useApp()
  const pinnedCount = transactions.filter(t => t.pinned).length

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 backdrop-blur-sm"
            style={{ background: 'rgba(0,0,0,0.55)' }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <aside
        className="fixed left-0 top-0 h-full z-50 flex flex-col"
        style={{
          width: '260px',
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-col)',
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6" style={{ borderBottom: '1px solid var(--border-col)' }}>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 8 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: 'var(--accent)', boxShadow: '0 4px 15px rgba(var(--accent-rgb),0.4)' }}
          >
            💹
          </motion.div>
          <div>
            <div className="font-display font-bold text-lg leading-tight" style={{ color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>FinFlow</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Finance Dashboard</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <div className="text-xs font-semibold uppercase tracking-widest px-2 py-2" style={{ color: 'var(--text-muted)' }}>Main</div>

          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 no-underline relative overflow-hidden ${isActive ? 'active-nav' : ''}`
              }
              style={({ isActive }) => ({
                background: isActive ? 'rgba(var(--accent-rgb), 0.15)' : 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              })}
              onClick={onClose}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3/5 rounded-r"
                      style={{ background: 'var(--accent)' }} />
                  )}
                  <Icon size={18} />
                  <span className="flex-1">{label}</span>
                  {label === 'Transactions' && pinnedCount > 0 && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: 'var(--accent)', fontSize: '0.65rem' }}>
                      {pinnedCount} ★
                    </span>
                  )}
                  {isActive && <ChevronRight size={14} />}
                </>
              )}
            </NavLink>
          ))}

          <div className="text-xs font-semibold uppercase tracking-widest px-2 pt-4 pb-1" style={{ color: 'var(--text-muted)' }}>Analytics</div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm opacity-40 cursor-not-allowed"
            style={{ color: 'var(--text-secondary)' }}>
            <TrendingUp size={18} />
            <span className="flex-1">Reports</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full text-black" style={{ background: 'var(--warning)', fontSize: '0.65rem' }}>Soon</span>
          </div>

          <div className="text-xs font-semibold uppercase tracking-widest px-2 pt-4 pb-1" style={{ color: 'var(--text-muted)' }}>Account</div>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm opacity-40 cursor-not-allowed"
            style={{ color: 'var(--text-secondary)' }}>
            <Settings size={18} />
            <span>Settings</span>
          </div>
        </nav>

        {/* Bottom stats */}
        <div className="p-3" style={{ borderTop: '1px solid var(--border-col)' }}>
          <div className="p-4 rounded-xl" style={{ background: 'rgba(var(--accent-rgb), 0.08)', border: '1px solid rgba(var(--accent-rgb), 0.15)' }}>
            <div className="flex items-center gap-2 mb-2">
              <Wallet size={14} style={{ color: 'var(--accent)' }} />
              <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>Total Transactions</span>
            </div>
            <div className="text-2xl font-bold" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
              {transactions.length}
            </div>
            <div className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
              {transactions.filter(t => t.type === 'income').length} income · {transactions.filter(t => t.type === 'expense').length} expenses
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
