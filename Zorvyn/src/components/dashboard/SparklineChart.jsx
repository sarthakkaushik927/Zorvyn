import React from 'react'
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts'

export function SparklineChart({ data, color }) {
  const chartData = data.map((v, i) => ({ v, i }))
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          fill={`url(#grad-${color})`}
          dot={false}
          animationDuration={1200}
        />
        <Tooltip
          content={({ active, payload }) =>
            active && payload?.length ? (
              <div className="text-xs px-2 py-1 rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-col)', color: 'var(--text-primary)' }}>
                {payload[0].value?.toLocaleString('en-IN')}
              </div>
            ) : null
          }
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
