import React, { useMemo } from 'react';
import { Sparkles, Trophy, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import { getInsights, getMonthlyData, getCategoryBreakdown } from '../data/mockData.js';
import { motion } from 'framer-motion';

function InsightCard({ title, value, desc, icon: Icon, colorRgb, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl relative overflow-hidden"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-col)' }}
    >
      <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full"
        style={{ background: `radial-gradient(circle, rgba(${colorRgb}, 0.15) 0%, transparent 70%)` }} />
      
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `rgba(${colorRgb}, 0.15)`, color: `rgb(${colorRgb})` }}>
        <Icon size={20} />
      </div>
      
      <div className="text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: 'var(--text-secondary)' }}>
        {title}
      </div>
      <div className="text-2xl font-bold font-display leading-tight mb-2" style={{ color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
        {value}
      </div>
      <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
        {desc}
      </div>
    </motion.div>
  );
}

export default function Insights() {
  const { transactions, formatAmount } = useApp();
  
  const insights = useMemo(() => getInsights(transactions), [transactions]);
  const categories = useMemo(() => getCategoryBreakdown(transactions), [transactions]);
  const monthly = useMemo(() => getMonthlyData(transactions), [transactions]);

  const topCategory = categories[0];
  const lastMonth = monthly[monthly.length - 1];
  const prevMonth = monthly[monthly.length - 2];
  
  const aiMessage = `Your savings rate is ${insights.savingsRate}%. ${insights.savingsRate > 20 ? 'Great job building your wealth!' : 'Consider reducing expenses to hit a 20% goal.'} You've spent the most on ${topCategory?.name} this month.`;

  return (
    <div className="page-transition max-w-[1200px] mx-auto pb-10">

      <div className="mb-8 p-8 rounded-3xl relative overflow-hidden flex items-center gap-6"
        style={{ background: 'linear-gradient(135deg, rgba(var(--accent-rgb), 0.1) 0%, transparent 100%)', border: '1px solid rgba(var(--accent-rgb),0.2)' }}>
        
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full mix-blend-screen"
          style={{ background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.2) 0%, transparent 60%)', transform: 'translate(30%, -30%)' }} />
        
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'var(--accent)', color: 'white', boxShadow: '0 8px 30px rgba(var(--accent-rgb), 0.4)' }}>
          <Sparkles size={32} />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold font-display mb-1" style={{ color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            Financial Insights
          </h2>
          <p className="text-sm max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {aiMessage}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        <InsightCard 
          title="Health Score" 
          value={`${insights.healthScore}/100`} 
          desc="Based on savings rate and expense diversity"
          icon={Trophy}
          colorRgb="0, 212, 170"
          delay={0}
        />
        <InsightCard 
          title="Top Expense" 
          value={topCategory?.name || 'None'} 
          desc={`Amounting to ${formatAmount(topCategory?.value || 0)} total`}
          icon={AlertTriangle}
          colorRgb="255, 107, 107"
          delay={0.1}
        />
        <InsightCard 
          title="MoM Expenses" 
          value={`${insights.expenseDiff > 0 ? '+' : ''}${insights.expenseDiff}%`} 
          desc={`Compared to ${prevMonth?.month}`}
          icon={insights.expenseDiff > 0 ? TrendingUp : TrendingDown}
          colorRgb="255, 217, 61"
          delay={0.2}
        />
      </div>

    </div>
  );
}
