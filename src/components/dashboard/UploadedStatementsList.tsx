import React from 'react';
import { Clock, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import { UploadedStatement } from '../../types';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

interface UploadedStatementsListProps {
  statements: UploadedStatement[];
}

const UploadedStatementsList: React.FC<UploadedStatementsListProps> = ({ statements }) => {
  const navigate = useNavigate();
  
  if (statements.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="mx-auto w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No statements yet</h3>
        <p className="text-gray-500 text-sm">
          Upload your first credit card statement to get started
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-4">
      {statements.map((statement) => (
        <div
          key={statement.id}
          className="bg-white rounded-xl border border-gray-100 p-4 transition-all duration-200 hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{statement.filename}</h4>
                <p className="text-sm text-gray-500">{formatDate(statement.uploadedAt)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {statement.status === 'processing' ? (
                <div className="flex items-center text-amber-600">
                  <Clock className="h-4 w-4 mr-1.5 animate-pulse" />
                  <span className="text-sm font-medium">Processing</span>
                </div>
              ) : (
                <div className="flex items-center text-emerald-600">
                  <CheckCircle className="h-4 w-4 mr-1.5" />
                  <span className="text-sm font-medium">
                    {statement.transactionCount} Transactions
                  </span>
                </div>
              )}
              
              {statement.status === 'completed' && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/transactions')}
                >
                  Review
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UploadedStatementsList;