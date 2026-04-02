import React from 'react';
import { Search, Filter, SortDesc, SortAsc } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { CATEGORIES } from '../../data/mockData.js';

export default function TransactionFilters() {
  const { filters, setFilters, dispatch, pinnedOnly } = useApp();

  const handleFilterChange = (key, value) => {
    dispatch({ type: 'SET_FILTER', payload: { [key]: value } });
  };

  const toggleSortDir = () => {
    dispatch({ type: 'SET_FILTER', payload: { sortDir: filters.sortDir === 'desc' ? 'asc' : 'desc' } });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search..." 
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="pl-9 pr-4 py-2 rounded-xl text-sm outline-none w-64 transition-all"
          style={{ 
            background: 'var(--bg-input)', color: 'var(--text-primary)', 
            border: '1px solid var(--border-col)'
          }}
          onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
          onBlur={(e) => e.target.style.borderColor = 'var(--border-col)'}
        />
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl border" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-col)' }}>
        <Filter size={14} style={{ color: 'var(--text-muted)' }} />
        <select 
          value={filters.category} 
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="bg-transparent border-none text-sm outline-none cursor-pointer"
          style={{ color: 'var(--text-primary)' }}
        >
          <option value="all">All Categories</option>
          {Object.keys(CATEGORIES).map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Type Filter */}
      <select 
        value={filters.type} 
        onChange={(e) => handleFilterChange('type', e.target.value)}
        className="px-3 py-2 rounded-xl border text-sm outline-none cursor-pointer hidden md:block"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-col)', color: 'var(--text-primary)' }}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Sort Options */}
      <div className="flex items-center rounded-xl border overflow-hidden" style={{ borderColor: 'var(--border-col)' }}>
        <select 
          value={filters.sortBy} 
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="pl-3 pr-2 py-2 border-none text-sm outline-none cursor-pointer bg-transparent"
          style={{ color: 'var(--text-primary)' }}
        >
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
        <button 
          onClick={toggleSortDir}
          className="px-3 py-2 border-l hover:opacity-80 transition-opacity flex items-center justify-center"
          style={{ borderColor: 'var(--border-col)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}
        >
          {filters.sortDir === 'desc' ? <SortDesc size={16} /> : <SortAsc size={16} />}
        </button>
      </div>

      {/* Pinned Toggle */}
      <button
        onClick={() => dispatch({ type: 'SET_PINNED_ONLY', payload: !pinnedOnly })}
        className="px-3 py-2 rounded-xl text-sm font-semibold transition-all border"
        style={{
          background: pinnedOnly ? 'rgba(var(--accent-rgb), 0.15)' : 'var(--bg-card)',
          borderColor: pinnedOnly ? 'var(--accent)' : 'var(--border-col)',
          color: pinnedOnly ? 'var(--accent)' : 'var(--text-secondary)'
        }}
      >
        ★ Pinned
      </button>

    </div>
  );
}
