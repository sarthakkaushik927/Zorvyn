import { v4 as uuidv4 } from 'uuid';

export const CATEGORIES = {
  Food: { color: '#ff6b6b', icon: '🍔', budget: 8000 },
  Transport: { color: '#ffd93d', icon: '🚗', budget: 4000 },
  Shopping: { color: '#6c63ff', icon: '🛍️', budget: 10000 },
  Entertainment: { color: '#00d4aa', icon: '🎮', budget: 5000 },
  Healthcare: { color: '#54a0ff', icon: '💊', budget: 3000 },
  Utilities: { color: '#ff9f43', icon: '⚡', budget: 3500 },
  Salary: { color: '#00d4aa', icon: '💼', budget: null },
  Freelance: { color: '#a29bfe', icon: '💻', budget: null },
  Investment: { color: '#fd79a8', icon: '📈', budget: null },
  Rent: { color: '#e17055', icon: '🏠', budget: 15000 },
};

export const CURRENCIES = {
  USD: { symbol: '$', rate: 1 },
  INR: { symbol: '₹', rate: 83.5 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.79 },
};

const makeTransaction = (id, date, amount, category, type, description, pinned = false) => ({
  id,
  date,
  amount,
  category,
  type,
  description,
  pinned,
});

export const INITIAL_TRANSACTIONS = [
  // October 2024
  makeTransaction(uuidv4(), '2024-10-01', 85000, 'Salary', 'income', 'Monthly Salary'),
  makeTransaction(uuidv4(), '2024-10-02', 15000, 'Rent', 'expense', 'October Rent'),
  makeTransaction(uuidv4(), '2024-10-03', 1200, 'Food', 'expense', 'Grocery Shopping'),
  makeTransaction(uuidv4(), '2024-10-05', 850, 'Transport', 'expense', 'Monthly Metro Pass'),
  makeTransaction(uuidv4(), '2024-10-07', 12000, 'Freelance', 'income', 'Web Design Project'),
  makeTransaction(uuidv4(), '2024-10-09', 2400, 'Shopping', 'expense', 'Clothes Shopping'),
  makeTransaction(uuidv4(), '2024-10-11', 600, 'Entertainment', 'expense', 'Netflix + Spotify'),
  makeTransaction(uuidv4(), '2024-10-14', 1800, 'Food', 'expense', 'Restaurant Dinner'),
  makeTransaction(uuidv4(), '2024-10-16', 950, 'Utilities', 'expense', 'Electricity Bill'),
  makeTransaction(uuidv4(), '2024-10-18', 5000, 'Investment', 'income', 'Dividend Income'),
  makeTransaction(uuidv4(), '2024-10-20', 1100, 'Healthcare', 'expense', 'Doctor Visit'),
  makeTransaction(uuidv4(), '2024-10-22', 3200, 'Shopping', 'expense', 'Electronics'),
  makeTransaction(uuidv4(), '2024-10-25', 780, 'Food', 'expense', 'Weekly Groceries'),
  makeTransaction(uuidv4(), '2024-10-28', 1500, 'Entertainment', 'expense', 'Concert Tickets'),
  makeTransaction(uuidv4(), '2024-10-30', 400, 'Transport', 'expense', 'Cab Rides'),

  // November 2024
  makeTransaction(uuidv4(), '2024-11-01', 85000, 'Salary', 'income', 'Monthly Salary', true),
  makeTransaction(uuidv4(), '2024-11-02', 15000, 'Rent', 'expense', 'November Rent'),
  makeTransaction(uuidv4(), '2024-11-04', 980, 'Food', 'expense', 'Grocery Shopping'),
  makeTransaction(uuidv4(), '2024-11-06', 2200, 'Transport', 'expense', 'Car Service'),
  makeTransaction(uuidv4(), '2024-11-08', 18000, 'Freelance', 'income', 'Mobile App Project'),
  makeTransaction(uuidv4(), '2024-11-10', 4500, 'Shopping', 'expense', 'Diwali Shopping'),
  makeTransaction(uuidv4(), '2024-11-12', 1200, 'Entertainment', 'expense', 'Movie Night Out'),
  makeTransaction(uuidv4(), '2024-11-15', 870, 'Utilities', 'expense', 'Internet Bill'),
  makeTransaction(uuidv4(), '2024-11-17', 1450, 'Food', 'expense', 'Family Dinner'),
  makeTransaction(uuidv4(), '2024-11-20', 700, 'Healthcare', 'expense', 'Medicines'),
  makeTransaction(uuidv4(), '2024-11-22', 8500, 'Shopping', 'expense', 'Festival Gifts'),
  makeTransaction(uuidv4(), '2024-11-25', 650, 'Food', 'expense', 'Weekly Groceries'),
  makeTransaction(uuidv4(), '2024-11-28', 3000, 'Investment', 'income', 'Stock Profit'),

  // December 2024
  makeTransaction(uuidv4(), '2024-12-01', 85000, 'Salary', 'income', 'Monthly Salary'),
  makeTransaction(uuidv4(), '2024-12-02', 15000, 'Rent', 'expense', 'December Rent'),
  makeTransaction(uuidv4(), '2024-12-03', 1350, 'Food', 'expense', 'Grocery Shopping'),
  makeTransaction(uuidv4(), '2024-12-05', 600, 'Transport', 'expense', 'Cab Rides'),
  makeTransaction(uuidv4(), '2024-12-08', 25000, 'Freelance', 'income', 'Year-End Contract'),
  makeTransaction(uuidv4(), '2024-12-10', 12000, 'Shopping', 'expense', 'Christmas Shopping'),
  makeTransaction(uuidv4(), '2024-12-14', 3500, 'Entertainment', 'expense', 'Holiday Party'),
  makeTransaction(uuidv4(), '2024-12-16', 1100, 'Utilities', 'expense', 'Gas + Electricity'),
  makeTransaction(uuidv4(), '2024-12-20', 2200, 'Food', 'expense', 'Holiday Dinners'),
  makeTransaction(uuidv4(), '2024-12-22', 4500, 'Healthcare', 'expense', 'Annual Checkup'),
  makeTransaction(uuidv4(), '2024-12-25', 800, 'Entertainment', 'expense', 'Streaming Services'),
  makeTransaction(uuidv4(), '2024-12-28', 7500, 'Investment', 'income', 'Year-End Bonus'),

  // January 2025
  makeTransaction(uuidv4(), '2025-01-01', 90000, 'Salary', 'income', 'Monthly Salary (Raise!)'),
  makeTransaction(uuidv4(), '2025-01-02', 15000, 'Rent', 'expense', 'January Rent'),
  makeTransaction(uuidv4(), '2025-01-04', 1100, 'Food', 'expense', 'Grocery Shopping'),
  makeTransaction(uuidv4(), '2025-01-06', 750, 'Transport', 'expense', 'Monthly Pass'),
  makeTransaction(uuidv4(), '2025-01-09', 2800, 'Shopping', 'expense', 'New Year Clothes'),
  makeTransaction(uuidv4(), '2025-01-12', 500, 'Entertainment', 'expense', 'Gaming'),
  makeTransaction(uuidv4(), '2025-01-15', 920, 'Utilities', 'expense', 'Bills'),
  makeTransaction(uuidv4(), '2025-01-18', 1600, 'Food', 'expense', 'Restaurants'),
  makeTransaction(uuidv4(), '2025-01-20', 15000, 'Freelance', 'income', 'Consulting Project'),
  makeTransaction(uuidv4(), '2025-01-24', 1800, 'Healthcare', 'expense', 'Gym Membership'),
  makeTransaction(uuidv4(), '2025-01-28', 600, 'Food', 'expense', 'Weekly Groceries'),

  // February 2025
  makeTransaction(uuidv4(), '2025-02-01', 90000, 'Salary', 'income', 'Monthly Salary'),
  makeTransaction(uuidv4(), '2025-02-02', 15000, 'Rent', 'expense', 'February Rent'),
  makeTransaction(uuidv4(), '2025-02-03', 1250, 'Food', 'expense', 'Grocery Shopping'),
  makeTransaction(uuidv4(), '2025-02-07', 3200, 'Shopping', 'expense', "Valentine's Day"),
  makeTransaction(uuidv4(), '2025-02-10', 800, 'Entertainment', 'expense', 'Date Night'),
  makeTransaction(uuidv4(), '2025-02-12', 1800, 'Freelance', 'income', 'Logo Design'),
  makeTransaction(uuidv4(), '2025-02-15', 900, 'Utilities', 'expense', 'Internet + Phone'),
  makeTransaction(uuidv4(), '2025-02-18', 550, 'Transport', 'expense', 'Fuel'),
  makeTransaction(uuidv4(), '2025-02-22', 1200, 'Healthcare', 'expense', 'Dental Visit'),
  makeTransaction(uuidv4(), '2025-02-25', 700, 'Food', 'expense', 'Weekly Groceries'),
  makeTransaction(uuidv4(), '2025-02-28', 10000, 'Investment', 'income', 'Mutual Fund Returns'),

  // March 2025
  makeTransaction(uuidv4(), '2025-03-01', 90000, 'Salary', 'income', 'Monthly Salary'),
  makeTransaction(uuidv4(), '2025-03-02', 15000, 'Rent', 'expense', 'March Rent'),
  makeTransaction(uuidv4(), '2025-03-04', 1400, 'Food', 'expense', 'Grocery Shopping'),
  makeTransaction(uuidv4(), '2025-03-07', 900, 'Transport', 'expense', 'Monthly Pass + Cab'),
  makeTransaction(uuidv4(), '2025-03-10', 20000, 'Freelance', 'income', 'SaaS Project'),
  makeTransaction(uuidv4(), '2025-03-12', 5500, 'Shopping', 'expense', 'Spring Wardrobe'),
  makeTransaction(uuidv4(), '2025-03-15', 1500, 'Entertainment', 'expense', 'Weekend Trip'),
  makeTransaction(uuidv4(), '2025-03-18', 1100, 'Utilities', 'expense', 'Bills'),
  makeTransaction(uuidv4(), '2025-03-20', 800, 'Food', 'expense', 'Restaurants'),
  makeTransaction(uuidv4(), '2025-03-23', 600, 'Healthcare', 'expense', 'Supplements'),
  makeTransaction(uuidv4(), '2025-03-26', 850, 'Food', 'expense', 'Weekly Groceries'),
  makeTransaction(uuidv4(), '2025-03-30', 5000, 'Investment', 'income', 'Crypto Gains', true),
];

export const getMonthlyData = (transactions) => {
  const months = ['Oct 24', 'Nov 24', 'Dec 24', 'Jan 25', 'Feb 25', 'Mar 25'];
  const monthKeys = ['2024-10', '2024-11', '2024-12', '2025-01', '2025-02', '2025-03'];

  return months.map((month, i) => {
    const key = monthKeys[i];
    const monthTx = transactions.filter(t => t.date.startsWith(key));
    const income = monthTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = monthTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { month, income, expenses, balance: income - expenses };
  });
};

export const getCategoryBreakdown = (transactions) => {
  const expenseTx = transactions.filter(t => t.type === 'expense');
  const totals = {};
  expenseTx.forEach(t => {
    totals[t.category] = (totals[t.category] || 0) + t.amount;
  });
  return Object.entries(totals).map(([name, value]) => ({
    name,
    value,
    color: CATEGORIES[name]?.color || '#888',
    icon: CATEGORIES[name]?.icon || '💰',
  })).sort((a, b) => b.value - a.value);
};

export const getInsights = (transactions) => {
  const categoryBreakdown = getCategoryBreakdown(transactions);
  const topCategory = categoryBreakdown[0];
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : 0;

  const monthly = getMonthlyData(transactions);
  const lastMonth = monthly[monthly.length - 1];
  const prevMonth = monthly[monthly.length - 2];
  const expenseDiff = prevMonth
    ? (((lastMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100).toFixed(1)
    : 0;

  const healthScore = Math.min(100, Math.max(0, Math.round(
    (savingsRate * 0.5) + (totalExpenses > 0 && topCategory?.value / totalExpenses < 0.4 ? 25 : 10) + 25
  )));

  return { topCategory, savingsRate, expenseDiff, healthScore, totalIncome, totalExpenses };
};
