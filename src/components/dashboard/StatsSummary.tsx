import React from 'react';
import { FileText, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { DashboardStats } from '../../types';

interface StatsSummaryProps {
  stats: DashboardStats;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Statements',
      value: stats.totalStatements,
      icon: <FileText className="text-blue-600" />,
      trend: '+12% this month',
      color: 'from-blue-50 to-blue-100/50',
      iconBg: 'bg-blue-100',
      textColor: 'text-blue-600',
    },
    {
      title: 'Flagged Transactions',
      value: stats.flaggedTransactions,
      icon: <AlertTriangle className="text-amber-600" />,
      trend: '-3% from last month',
      color: 'from-amber-50 to-amber-100/50',
      iconBg: 'bg-amber-100',
      textColor: 'text-amber-600',
    },
    {
      title: 'Disputes Resolved',
      value: stats.disputesResolved,
      icon: <CheckCircle className="text-emerald-600" />,
      trend: '+8% this week',
      color: 'from-emerald-50 to-emerald-100/50',
      iconBg: 'bg-emerald-100',
      textColor: 'text-emerald-600',
    },
    {
      title: 'Protection Score',
      value: '98%',
      icon: <TrendingUp className="text-indigo-600" />,
      trend: 'Excellent',
      color: 'from-indigo-50 to-indigo-100/50',
      iconBg: 'bg-indigo-100',
      textColor: 'text-indigo-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div 
          key={index}
          className={`rounded-2xl bg-gradient-to-br ${stat.color} p-6 transition-all duration-300 hover:shadow-md relative overflow-hidden group `}
        >
          <div className="flex items-start justify-between absolute right-8">
            <div className={`${stat.iconBg} p-3 rounded-xl`}>
              {stat.icon}
            </div>
          </div>
          
          <div className="">
            <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm font-medium text-gray-600 mt-1">{stat.title}</div>
          </div>
          
          <div className={`flex items-center mt-4 text-sm ${stat.textColor}`}>
            <span className="font-medium">{stat.trend}</span>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full transition-transform duration-300 group-hover:scale-150" />
        </div>
      ))}
    </div>
  );
};

export default StatsSummary;