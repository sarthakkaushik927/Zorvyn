import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext.jsx';
import { getCategoryBreakdown, CATEGORIES } from '../../data/mockData.js';

export default function BudgetProgress() {
  const { transactions, formatAmount } = useApp();

  const currentMonthPrefix = '2025-03';
  const currentMonthTx = transactions.filter(t => t.date.startsWith(currentMonthPrefix) && t.type === 'expense');
  
  const categoryTotals = {};
  currentMonthTx.forEach(t => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
  });

  const budgetItems = Object.entries(CATEGORIES)
    .filter(([_, cat]) => cat.budget !== null)
    .map(([name, cat]) => {
      const spent = categoryTotals[name] || 0;
      const progress = Math.min(100, Math.round((spent / cat.budget) * 100));
      return {
        name,
        spent,
        budget: cat.budget,
        progress,
        color: cat.color,
        icon: cat.icon
      };
    })
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.65 }}
      className="rounded-2xl p-6 h-full"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-col)' }}
    >
      <div className="mb-5">
        <h3 className="font-semibold text-base" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>Budget vs Actual</h3>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>Current month (Mar 2025)</p>
      </div>

      <div className="flex flex-col gap-4">
        {budgetItems.map(item => (
          <div key={item.name}>
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-xs font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                {item.icon} {item.name}
              </span>
              <span className="text-xs font-bold" style={{ color: item.progress > 90 ? 'var(--danger)' : 'var(--text-primary)' }}>
                {formatAmount(item.spent)} <span className="font-normal text-[0.65rem]" style={{ color: 'var(--text-muted)' }}>/ {formatAmount(item.budget)}</span>
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-input)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${item.progress}%` }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ 
                  background: item.progress > 90 ? 'var(--danger)' : 
                              item.progress > 75 ? 'var(--warning)' : item.color 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
