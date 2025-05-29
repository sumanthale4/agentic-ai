import { Transaction, UploadedStatement, DashboardStats } from '../types';

export const dummyTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-01-05',
    merchant: 'Amazon',
    amount: 129.99,
    description: 'Online purchase',
    flagged: false,
    status: 'pending',
  },
  {
    id: '2',
    date: '2025-01-12',
    merchant: 'Starbucks',
    amount: 8.45,
    description: 'Coffee shop',
    flagged: false,
    status: 'approved',
  },
  {
    id: '3',
    date: '2025-01-15',
    merchant: 'Unknown Vendor',
    amount: 499.99,
    description: 'Online purchase',
    flagged: true,
    status: 'pending',
    aiReason: 'Unusual merchant and high amount compared to your spending patterns',
    confidenceScore: 0.89,
  },
  {
    id: '4',
    date: '2025-01-18',
    merchant: 'Target',
    amount: 86.32,
    description: 'Retail purchase',
    flagged: false,
    status: 'approved',
  },
  {
    id: '5',
    date: '2025-01-23',
    merchant: 'DigitalServices Ltd.',
    amount: 249.00,
    description: 'Subscription renewal',
    flagged: true,
    status: 'disputed',
    aiReason: 'No previous transaction history with this merchant',
    confidenceScore: 0.75,
  },
  {
    id: '6',
    date: '2025-01-25',
    merchant: 'Walmart',
    amount: 153.27,
    description: 'Grocery shopping',
    flagged: false,
    status: 'approved',
  },
  {
    id: '7',
    date: '2025-02-01',
    merchant: 'Foreign Merchant',
    amount: 325.50,
    description: 'International transaction',
    flagged: true,
    status: 'pending',
    aiReason: 'Unusual location and transaction pattern',
    confidenceScore: 0.92,
  },
  {
    id: '8',
    date: '2025-02-03',
    merchant: 'Gas Station',
    amount: 45.25,
    description: 'Fuel purchase',
    flagged: false,
    status: 'approved',
  },
];

export const dummyUploadedStatements: UploadedStatement[] = [
  {
    id: '1',
    filename: 'March_2025_Statement.pdf',
    status: 'completed',
    uploadedAt: '2025-04-01T14:30:00Z',
    transactionCount: 23
  },
  {
    id: '2',
    filename: 'February_2025_Statement.pdf',
    status: 'completed',
    uploadedAt: '2025-03-01T14:30:00Z',
    transactionCount: 23
  },
];

export const dummyDashboardStats: DashboardStats = {
  totalStatements: 2,
  flaggedTransactions: 3,
  disputesResolved: 1
};