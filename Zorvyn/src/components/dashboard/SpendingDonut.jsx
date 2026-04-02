import React, { useState } from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Sector } from 'recharts'
import { motion } from 'framer-motion'
import { useApp } from '../../context/AppContext.jsx'
import { getCategoryBreakdown } from '../../data/mockData.js'

function ActiveShape(props) {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="var(--text-primary)" fontFamily="Outfit, sans-serif" fontSize={20} fontWeight={700}>
        {payload.icon}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--text-primary)" fontSize={14} fontWeight={600} fontFamily="Outfit, sans-serif">
        {payload.name}
      </text>
      <text x={cx} y={cy + 32} textAnchor="middle" fill="var(--text-muted)" fontSize={11}>
        {(percent * 100).toFixed(1)}%
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 8}
        startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} innerRadius={outerRadius + 10} outerRadius={outerRadius + 14}
        startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.4} />
    </g>
  )
}

export default function SpendingDonut() {
  const { transactions, formatAmount } = useApp()
  const [activeIdx, setActiveIdx] = useState(0)
  const data = getCategoryBreakdown(transactions).slice(0, 6)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.55 }}
      className="rounded-2xl p-6"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-col)' }}
    >
      <div className="mb-4">
        <h3 className="font-semibold text-base" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>Spending Breakdown</h3>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>By category</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%" cy="50%"
            innerRadius={65} outerRadius={95}
            dataKey="value"
            activeIndex={activeIdx}
            activeShape={<ActiveShape />}
            onMouseEnter={(_, i) => setActiveIdx(i)}
            animationBegin={200}
            animationDuration={1200}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} stroke="transparent" />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex flex-col gap-2 mt-2">
        {data.map((d, i) => (
          <motion.div
            key={d.name}
            whileHover={{ x: 4 }}
            className="flex items-center justify-between cursor-pointer py-1"
            onClick={() => setActiveIdx(i)}
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
              <span className="text-xs font-medium" style={{ color: activeIdx === i ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {d.icon} {d.name}
              </span>
            </div>
            <span className="text-xs font-semibold" style={{ color: d.color }}>{formatAmount(d.value)}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
