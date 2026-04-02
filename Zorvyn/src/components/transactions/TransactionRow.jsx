import React from 'react';
import { format } from 'date-fns';
import { Star, Trash2 } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData.js';
import { useApp } from '../../context/AppContext.jsx';

export default function TransactionRow({ tx, selected }) {
  const { role, formatAmount, dispatch } = useApp();
  const cat = CATEGORIES[tx.category] || { color: '#888', icon: '💰' };
  
  const handleSelect = (e) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_SELECT', payload: tx.id });
  };

  const handlePin = (e) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_PIN', payload: tx.id });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm('Delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: tx.id });
    }
  };

  return (
    <div className={`grid grid-cols-[40px_minmax(150px,1fr)_120px_100px_120px_40px] items-center gap-4 px-2 py-3 rounded-xl cursor-default transition-all duration-200 border border-transparent hover:bg-black/5 dark:hover:bg-white/5 relative group ${tx.pinned ? 'bg-black/5 dark:bg-white/5' : ''}`}>
      
      {tx.pinned && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-2/3 rounded-r" style={{ background: 'var(--accent)' }} />
      )}

      <div className="flex justify-center flex-shrink-0 w-5 ml-2">
        <input 
          type="checkbox" 
          className="checkbox-custom" 
          checked={selected}
          onChange={handleSelect}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
          style={{ background: `rgba(${hexToRgb(cat.color)}, 0.15)` }}>
          {cat.icon}
        </div>
        <div className="min-w-0">
          <div className="font-medium truncate text-sm" style={{ color: 'var(--text-primary)' }}>{tx.description}</div>
          <div className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>{tx.type === 'income' ? 'Income' : 'Expense'}</div>
        </div>
      </div>

      <div className="text-xs font-semibold px-2 py-1 rounded-md w-fit"
        style={{ color: cat.color, background: `rgba(${hexToRgb(cat.color)}, 0.1)` }}>
        {tx.category}
      </div>

      <div className="text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
        {format(new Date(tx.date), 'dd MMM yyyy')}
      </div>

      <div className="text-right font-bold font-display" style={{ 
        fontFamily: 'Outfit, sans-serif',
        color: tx.type === 'income' ? 'var(--success)' : 'var(--text-primary)' 
      }}>
        {tx.type === 'income' ? '+' : '-'}{formatAmount(tx.amount)}
      </div>

      <div className="flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={handlePin} className="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors" title={tx.pinned ? "Unpin" : "Pin"}>
          <Star size={16} fill={tx.pinned ? "var(--warning)" : "transparent"} color={tx.pinned ? "var(--warning)" : "var(--text-muted)"} />
        </button>
        {role === 'admin' && (
          <button onClick={handleDelete} className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors text-red-500" title="Delete">
            <Trash2 size={16} />
          </button>
        )}
      </div>

    </div>
  );
}

// Utility for hover background
function hexToRgb(hex) {
  if(!hex) return '136, 136, 136';
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
