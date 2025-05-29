export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  description: string;
  flagged: boolean;
  status: 'pending' | 'approved' | 'disputed';
  aiReason?: string;
  confidenceScore?: number;
}

export interface UploadedStatement {
  id: string;
  filename: string;
  status: 'processing' | 'completed';
  uploadedAt: string;
  transactionCount?: number;
}

export interface DashboardStats {
  totalStatements: number;
  flaggedTransactions: number;
  disputesResolved: number;
}