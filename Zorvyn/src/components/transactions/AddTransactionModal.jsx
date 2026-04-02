import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { CATEGORIES } from '../../data/mockData.js';
import toast from 'react-hot-toast';

export default function AddTransactionModal({ onClose }) {
  const { addTransaction } = useApp();
  
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    addTransaction({
      ...formData,
      amount: Number(formData.amount)
    });
    
    toast.success('Transaction added successfully!');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md rounded-3xl p-8 shadow-2xl"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-col)' }}
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X size={20} />
          </button>

          <h2 className="text-2xl font-bold mb-6 font-display" style={{ color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}>
            New Transaction
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            
            {/* Type Toggle */}
            <div className="flex p-1 rounded-xl" style={{ background: 'var(--bg-input)' }}>
              {['expense', 'income'].map(type => (
                <div
                  key={type}
                  onClick={() => setFormData({ ...formData, type, category: type === 'expense' ? 'Food' : 'Salary' })}
                  className="flex-1 text-center py-2 rounded-lg text-sm font-semibold capitalize cursor-pointer transition-all"
                  style={{ 
                    background: formData.type === type ? 'var(--bg-card)' : 'transparent',
                    color: formData.type === type ? 'var(--text-primary)' : 'var(--text-secondary)',
                    boxShadow: formData.type === type ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  {type}
                </div>
              ))}
            </div>

            {/* Amount */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-1 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold" style={{ color: 'var(--text-muted)' }}>$</span>
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={e => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="0.00"
                  className="w-full pl-8 pr-4 py-3 rounded-xl outline-none font-bold text-lg font-display transition-all"
                  style={{ background: 'var(--bg-input)', border: '1px solid var(--border-col)', color: 'var(--text-primary)', fontFamily: 'Outfit, sans-serif' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border-col)'}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 ml-1 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Description</label>
              <input
                type="text"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="What was this for?"
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all"
                style={{ background: 'var(--bg-input)', border: '1px solid var(--border-col)', color: 'var(--text-primary)' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-col)'}
              />
            </div>

            <div className="flex gap-4">
              {/* Category */}
              <div className="flex-1">
                <label className="block text-xs font-semibold mb-1.5 ml-1 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm cursor-pointer transition-all border-none"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-col)' }}
                >
                  {Object.keys(CATEGORIES).filter(c => 
                    formData.type === 'expense' ? CATEGORIES[c].budget !== null || ['Rent'].includes(c) : ['Salary', 'Freelance', 'Investment'].includes(c)
                  ).map(c => <option key={c} value={c}>{CATEGORIES[c].icon} {c}</option>)}
                </select>
              </div>

              {/* Date */}
              <div className="flex-1">
                <label className="block text-xs font-semibold mb-1.5 ml-1 uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={e => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl outline-none text-sm cursor-pointer transition-all text-center"
                  style={{ background: 'var(--bg-input)', color: 'var(--text-primary)', border: '1px solid var(--border-col)' }}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl text-white font-bold text-sm mt-2 transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'var(--accent)', boxShadow: '0 4px 15px rgba(var(--accent-rgb), 0.3)' }}
            >
              Add {formData.type === 'income' ? 'Income' : 'Expense'}
            </button>

          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
