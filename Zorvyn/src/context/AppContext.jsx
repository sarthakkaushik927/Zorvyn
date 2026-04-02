import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { INITIAL_TRANSACTIONS, CURRENCIES } from '../data/mockData';
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext();

const initialState = {
  transactions: [],
  role: 'admin',
  theme: 'dark',
  accentColor: 'purple',
  currency: 'INR',
  density: 'comfortable',
  filters: {
    search: '',
    category: 'all',
    type: 'all',
    dateFrom: '',
    dateTo: '',
    sortBy: 'date',
    sortDir: 'desc',
  },
  selectedIds: [],
  pinnedOnly: false,
};

const ACCENT_COLORS = {
  purple: '#6c63ff',
  teal: '#00d4aa',
  coral: '#ff6b6b',
  gold: '#ffd93d',
};

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'EDIT_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload.id ? action.payload : t
        ),
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload),
        selectedIds: state.selectedIds.filter(id => id !== action.payload),
      };
    case 'BULK_DELETE':
      return {
        ...state,
        transactions: state.transactions.filter(t => !state.selectedIds.includes(t.id)),
        selectedIds: [],
      };
    case 'TOGGLE_PIN':
      return {
        ...state,
        transactions: state.transactions.map(t =>
          t.id === action.payload ? { ...t, pinned: !t.pinned } : t
        ),
      };
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };
    case 'SET_ACCENT':
      return { ...state, accentColor: action.payload };
    case 'SET_CURRENCY':
      return { ...state, currency: action.payload };
    case 'SET_DENSITY':
      return { ...state, density: action.payload };
    case 'SET_FILTER':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: initialState.filters };
    case 'TOGGLE_SELECT':
      return {
        ...state,
        selectedIds: state.selectedIds.includes(action.payload)
          ? state.selectedIds.filter(id => id !== action.payload)
          : [...state.selectedIds, action.payload],
      };
    case 'SELECT_ALL':
      return { ...state, selectedIds: action.payload };
    case 'CLEAR_SELECTION':
      return { ...state, selectedIds: [] };
    case 'SET_PINNED_ONLY':
      return { ...state, pinnedOnly: action.payload };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem('finance_transactions');
    const savedPrefs = localStorage.getItem('finance_prefs');

    if (saved) {
      dispatch({ type: 'LOAD_TRANSACTIONS', payload: JSON.parse(saved) });
    } else {
      dispatch({ type: 'LOAD_TRANSACTIONS', payload: INITIAL_TRANSACTIONS });
    }

    if (savedPrefs) {
      const prefs = JSON.parse(savedPrefs);
      if (prefs.theme) dispatch({ type: 'SET_THEME_DIRECT', payload: prefs });
    }
  }, []);

  useEffect(() => {
    if (state.transactions.length > 0) {
      localStorage.setItem('finance_transactions', JSON.stringify(state.transactions));
    }
  }, [state.transactions]);

  useEffect(() => {
    localStorage.setItem('finance_prefs', JSON.stringify({
      theme: state.theme,
      accentColor: state.accentColor,
      currency: state.currency,
      density: state.density,
    }));
  }, [state.theme, state.accentColor, state.currency, state.density]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    document.documentElement.style.setProperty('--accent', ACCENT_COLORS[state.accentColor]);
    document.documentElement.style.setProperty('--accent-rgb', hexToRgb(ACCENT_COLORS[state.accentColor]));
  }, [state.theme, state.accentColor]);

  const addTransaction = (data) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: { ...data, id: uuidv4(), pinned: false } });
  };

  const editTransaction = (data) => {
    dispatch({ type: 'EDIT_TRANSACTION', payload: data });
  };

  const deleteTransaction = (id) => {
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });
  };

  const formatAmount = (amount) => {
    const { symbol, rate } = CURRENCIES[state.currency];
    const converted = amount * rate;
    return `${symbol}${converted.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  const getFilteredTransactions = () => {
    const { search, category, type, dateFrom, dateTo, sortBy, sortDir } = state.filters;
    let result = [...state.transactions];

    if (state.pinnedOnly) result = result.filter(t => t.pinned);
    if (search) result = result.filter(t =>
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.category.toLowerCase().includes(search.toLowerCase())
    );
    if (category !== 'all') result = result.filter(t => t.category === category);
    if (type !== 'all') result = result.filter(t => t.type === type);
    if (dateFrom) result = result.filter(t => t.date >= dateFrom);
    if (dateTo) result = result.filter(t => t.date <= dateTo);

    result.sort((a, b) => {
      let valA = a[sortBy], valB = b[sortBy];
      if (sortBy === 'amount') { valA = Number(valA); valB = Number(valB); }
      if (valA < valB) return sortDir === 'asc' ? -1 : 1;
      if (valA > valB) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return result;
  };

  return (
    <AppContext.Provider value={{
      ...state,
      dispatch,
      addTransaction,
      editTransaction,
      deleteTransaction,
      formatAmount,
      getFilteredTransactions,
      accentHex: ACCENT_COLORS[state.accentColor],
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
