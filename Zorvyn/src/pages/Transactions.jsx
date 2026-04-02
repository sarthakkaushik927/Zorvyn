import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Download } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

import TransactionFilters from '../components/transactions/TransactionFilters.jsx';
import TransactionList from '../components/transactions/TransactionList.jsx';
import AddTransactionModal from '../components/transactions/AddTransactionModal.jsx';

export default function Transactions() {
  const { role, selectedIds, dispatch } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedIds.length} transactions?`)) {
      dispatch({ type: 'BULK_DELETE' });
      toast.success(`${selectedIds.length} transactions deleted`);
    }
  };

  return (
    <div className="page-transition flex flex-col h-[calc(100vh-130px)]">
      
      {/* Header Actions */}
      <div className="flex items-end justify-between mb-5 flex-shrink-0">
        <TransactionFilters />

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {role === 'admin' && selectedIds.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(255,107,107,0.12)', color: 'var(--danger)', border: '1px solid rgba(255,107,107,0.2)' }}
              >
                <Trash2 size={16} /> Delete ({selectedIds.length})
              </motion.button>
            )}
          </AnimatePresence>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{ background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-col)' }}>
            <Download size={16} /> Export
          </button>

          {role === 'admin' && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5"
              style={{ background: 'var(--accent)', boxShadow: '0 4px 15px rgba(var(--accent-rgb), 0.3)' }}
            >
              <Plus size={16} strokeWidth={3} /> Add New
            </button>
          )}
        </div>
      </div>

      {/* Main List */}
      <div className="flex-1 bg-card rounded-2xl border overflow-hidden flex flex-col relative"
        style={{ background: 'var(--bg-card)', borderColor: 'var(--border-col)' }}>
        <TransactionList />
      </div>

      {isAddModalOpen && (
        <AddTransactionModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}
