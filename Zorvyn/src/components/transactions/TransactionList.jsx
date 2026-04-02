import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Inbox } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import TransactionRow from './TransactionRow.jsx';

export default function TransactionList() {
  const { getFilteredTransactions, selectedIds, dispatch } = useApp();
  const transactions = getFilteredTransactions();

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      dispatch({ type: 'SELECT_ALL', payload: transactions.map(t => t.id) });
    } else {
      dispatch({ type: 'CLEAR_SELECTION' });
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
          style={{ background: 'rgba(var(--accent-rgb), 0.1)' }}
        >
          <Inbox size={48} style={{ color: 'var(--accent)' }} opacity={0.8} />
        </motion.div>
        <h3 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>No transactions found</h3>
        <p className="text-sm mt-1 max-w-xs" style={{ color: 'var(--text-muted)' }}>
          We couldn't find any transactions matching your current filters.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="sticky top-0 z-10 grid grid-cols-[40px_minmax(150px,1fr)_120px_100px_120px_40px] items-center gap-4 px-6 py-3 border-b text-xs font-semibold uppercase tracking-wider backdrop-blur-md"
        style={{ background: 'rgba(var(--bg-card), 0.85)', borderColor: 'var(--border-col)', color: 'var(--text-muted)' }}>
        <div className="flex justify-center flex-shrink-0 w-5">
          <input 
            type="checkbox" 
            className="checkbox-custom" 
            checked={transactions.length > 0 && selectedIds.length === transactions.length}
            onChange={handleSelectAll}
          />
        </div>
        <div>Description</div>
        <div>Category</div>
        <div>Date</div>
        <div className="text-right">Amount</div>
        <div className="text-center">Act</div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 tx-list">
        <AnimatePresence initial={false}>
          {transactions.map((tx, index) => (
            <motion.div
              layout
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <TransactionRow tx={tx} selected={selectedIds.includes(tx.id)} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}
