import React from 'react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext.jsx'
import { getMonthlyData } from '../../data/mockData.js'

function CustomTooltip({ active, payload, label }) {
  const { formatAmount } = useApp()
  if (!active || !payload?.length) return null
  return (
    <div className="custom-tooltip text-sm">
      <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{label}</p>
      {payload.map(p => (
        <p key={p.name} className="text-xs" style={{ color: p.color }}>
          {p.name}: {formatAmount(p.value)}
        </p>
      ))}
    </div>
  )
}

export default function BalanceTrendChart() {
  const { transactions, accentHex } = useApp()
  const data = getMonthlyData(transactions)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.45 }}
      className="rounded-2xl p-6"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-col)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-base" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>Balance Trend</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>6-month income vs expenses</p>
        </div>
        <div className="flex items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 rounded" style={{ background: 'var(--success)' }} />Income</span>
          <span className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}><span className="w-3 h-0.5 rounded" style={{ background: 'var(--danger)' }} />Expenses</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="gradIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--success)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="var(--success)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradExpense" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.25} />
              <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-col)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: 'var(--text-muted)', fontSize: 11 }}
            axisLine={false} tickLine={false}
            tickFormatter={v => `${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--border-hover)', strokeWidth: 1 }} />
          <Area type="monotone" dataKey="income" name="Income" stroke="var(--success)" strokeWidth={2.5}
            fill="url(#gradIncome)" dot={false} animationDuration={1500} />
          <Area type="monotone" dataKey="expenses" name="Expenses" stroke="var(--danger)" strokeWidth={2.5}
            fill="url(#gradExpense)" dot={false} animationDuration={1500} animationBegin={300} />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
