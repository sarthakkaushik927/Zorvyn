import React from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Menu } from 'lucide-react'
import { useApp } from '../../context/AppContext.jsx'

const ACCENTS = {
  purple: '#6c63ff',
  teal: '#00d4aa',
  coral: '#ff6b6b',
  gold: '#ffd93d',
}

export default function Header({ onMenuToggle, title, subtitle }) {
  const { theme, dispatch, role, accentColor, currency } = useApp()

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center justify-between px-8"
      style={{
        left: '260px',
        height: '70px',
        background: theme === 'dark' ? 'rgba(8,8,26,0.85)' : 'rgba(240,240,255,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-col)',
        transition: 'background 0.3s ease, left 0.3s ease',
      }}
    >
      
      <div>
        <h1 className="text-xl font-bold leading-tight" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>{title}</h1>
        {subtitle && <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{subtitle}</p>}
      </div>

      <div className="flex items-center gap-3">

        <div className="flex items-center gap-2">
          {Object.entries(ACCENTS).map(([name, color]) => (
            <motion.button
              key={name}
              whileHover={{ scale: 1.25 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch({ type: 'SET_ACCENT', payload: name })}
              title={`${name} theme`}
              className="w-5 h-5 rounded-full border-2 cursor-pointer transition-all duration-200"
              style={{
                background: color,
                borderColor: accentColor === name ? 'white' : 'transparent',
                boxShadow: accentColor === name ? `0 0 0 2px ${color}` : 'none',
              }}
            />
          ))}
        </div>

        <div className="w-px h-6" style={{ background: 'var(--border-col)' }} />

        <select
          value={currency}
          onChange={e => dispatch({ type: 'SET_CURRENCY', payload: e.target.value })}
          className="text-xs font-semibold px-2 py-1.5 rounded-lg border cursor-pointer outline-none"
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            borderColor: 'var(--border-col)',
          }}
        >
          {['USD', 'INR', 'EUR', 'GBP'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border"
          style={{ background: 'var(--bg-card)', borderColor: 'var(--border-col)' }}>
          <span className="w-2 h-2 rounded-full"
            style={{ background: role === 'admin' ? 'var(--success)' : 'var(--warning)' }} />
          <select
            value={role}
            onChange={e => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
            className="text-xs font-semibold bg-transparent border-none outline-none cursor-pointer"
            style={{ color: 'var(--text-primary)' }}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
          className="w-9 h-9 rounded-lg flex items-center justify-center border cursor-pointer"
          style={{
            background: 'var(--bg-card)',
            borderColor: 'var(--border-col)',
            color: 'var(--text-secondary)',
          }}
        >
          <motion.div
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </motion.div>
        </motion.button>

      </div>
    </header>
  )
}
