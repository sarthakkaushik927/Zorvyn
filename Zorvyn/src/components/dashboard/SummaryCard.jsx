import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useCountUp } from '../../hooks/useCountUp.js'
import { useApp } from '../../context/AppContext.jsx'
import { SparklineChart } from './SparklineChart.jsx'

export default function SummaryCard({ label, rawValue, change, changeLabel, colorRgb, icon, sparkData, index = 0 }) {
  const { formatAmount } = useApp()
  const countRef = useCountUp(rawValue, 1.4)
  const isPositive = change >= 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative rounded-2xl p-6 overflow-hidden cursor-default"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-col)',
        '--card-rgb': colorRgb,
      }}
    >
      
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(${colorRgb},0.18) 0%, transparent 70%)`,
          transform: 'translate(30%, -30%)',
        }}
      />

      <motion.div
        whileHover={{ scale: 1.15, rotate: 8 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4"
        style={{ background: `rgba(${colorRgb}, 0.15)` }}
      >
        {icon}
      </motion.div>

      <div className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)', letterSpacing: '0.06em' }}>
        {label}
      </div>

      <div
        ref={countRef}
        className="text-3xl font-bold leading-tight"
        style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)', letterSpacing: '-0.5px' }}
      >
        {formatAmount(rawValue)}
      </div>

      <div className="inline-flex items-center gap-1 mt-2 px-2 py-1 rounded-full text-xs font-semibold"
        style={{
          background: isPositive ? 'rgba(0,212,170,0.12)' : 'rgba(255,107,107,0.12)',
          color: isPositive ? 'var(--success)' : 'var(--danger)',
        }}>
        {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
        {Math.abs(change)}% {changeLabel}
      </div>

      {sparkData && (
        <div className="mt-3 h-12">
          <SparklineChart data={sparkData} color={`rgba(${colorRgb},0.8)`} />
        </div>
      )}
    </motion.div>
  )
}
