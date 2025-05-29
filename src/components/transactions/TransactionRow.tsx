import React from 'react';
import { AlertTriangle, CheckCircle, Clock, Info } from 'lucide-react';
import { Transaction } from '../../types';
import Button from '../ui/Button';

interface TransactionRowProps {
  transaction: Transaction;
  onSelect: () => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({ transaction, onSelect }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const rowClasses = transaction.flagged 
    ? 'hover:bg-red-50 transition-colors bg-red-100/30 cursor-pointer' 
    : 'hover:bg-gray-50 transition-colors cursor-pointer';

  const statusIndicator = () => {
    switch (transaction.status) {
      case 'approved':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-emerald-100 text-emerald-700">
            <CheckCircle className="h-4 w-4 mr-1.5" />
            Approved
          </div>
        );
      case 'disputed':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
            <AlertTriangle className="h-4 w-4 mr-1.5" />
            Disputed
          </div>
        );
      default:
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-700">
            <Clock className="h-4 w-4 mr-1.5" />
            Pending
          </div>
        );
    }
  };

  return (
    <tr className={rowClasses}>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {formatDate(transaction.date)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
        <div className="flex items-center">
          {transaction.flagged && (
            <AlertTriangle className="h-4 w-4 text-red-500 mr-1.5" />
          )}
          <span>{transaction.merchant}</span>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {formatCurrency(transaction.amount)}
      </td>
      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
        {transaction.description}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm">
        {statusIndicator()}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onSelect}
        >
          <Info className="h-4 w-4 mr-1.5" />
          Details
        </Button>
      </td>
    </tr>
  );
};

export default TransactionRow;