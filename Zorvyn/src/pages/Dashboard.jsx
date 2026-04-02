import React, { useMemo } from 'react';
import { Wallet, ArrowDownRight, ArrowUpRight, Target } from 'lucide-react';
import { getInsights, getMonthlyData } from '../data/mockData.js';
import { useApp } from '../context/AppContext.jsx';

import SummaryCard from '../components/dashboard/SummaryCard.jsx';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart.jsx';
import SpendingDonut from '../components/dashboard/SpendingDonut.jsx';
import BudgetProgress from '../components/dashboard/BudgetProgress.jsx';

export default function Dashboard() {
  const { transactions } = useApp();

  const insights = useMemo(() => getInsights(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);

  const rawBalance = insights.totalIncome - insights.totalExpenses;

  return (
    <div className="page-transition flex flex-col gap-6 max-w-[1400px] mx-auto pb-10">
      
      {/* 1. Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <SummaryCard 
          label="Total Balance"
          rawValue={rawBalance}
          change={12.5}
          changeLabel="vs last month"
          colorRgb="108, 99, 255"
          icon={<Wallet size={24} color="#6c63ff" />}
          index={0}
          sparkData={monthlyData.map(m => m.balance)}
        />
        <SummaryCard 
          label="Total Income"
          rawValue={insights.totalIncome}
          change={8.2}
          changeLabel="vs last month"
          colorRgb="0, 212, 170"
          icon={<ArrowUpRight size={24} color="#00d4aa" />}
          index={1}
          sparkData={monthlyData.map(m => m.income)}
        />
        <SummaryCard 
          label="Total Expenses"
          rawValue={insights.totalExpenses}
          change={-4.1}
          changeLabel="vs last month"
          colorRgb="255, 107, 107"
          icon={<ArrowDownRight size={24} color="#ff6b6b" />}
          index={2}
          sparkData={monthlyData.map(m => m.expenses)}
        />
        <SummaryCard 
          label="Savings Rate"
          rawValue={Number(insights.savingsRate)}
          change={2.3}
          changeLabel="vs last month"
          colorRgb="255, 217, 61" 
          icon={<Target size={24} color="#ffd93d" />}
          index={3}
        />
      </div>

      {/* 2. Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <BalanceTrendChart />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-5">
          <SpendingDonut />
          <BudgetProgress />
        </div>
      </div>
      
    </div>
  );
}
