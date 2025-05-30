import React from 'react';
import { Clock, CheckCircle, FileText, ArrowRight, Calendar, CreditCard, AlertTriangle } from 'lucide-react';
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
      <div className="text-center py-12 px-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">
        <div className="mx-auto w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm">
          <CreditCard className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No statements yet</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto">
          Upload your first credit card statement to start monitoring your transactions
        </p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      month: new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date),
      day: new Intl.DateTimeFormat('en-US', { day: 'numeric' }).format(date),
      year: new Intl.DateTimeFormat('en-US', { year: 'numeric' }).format(date),
      time: new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric' }).format(date),
    };
  };

  return (
    <div className="space-y-4">
      {statements.map((statement) => {
        const date = formatDate(statement.uploadedAt);
        const isProcessing = statement.status === 'processing';
        const hasFlags = (statement.transactionCount || 0) > 0;

        return (
          <div
            key={statement.id}
            className="bg-white rounded-xl border border-gray-100 p-5 transition-all duration-200 hover:shadow-md group"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-xl ${isProcessing ? 'bg-amber-100' : 'bg-blue-100'} transition-colors`}>
                  <FileText className={`h-5 w-5 ${isProcessing ? 'text-amber-600' : 'text-blue-600'}`} />
                </div>
                
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-gray-900">{statement.filename}</h4>
                    {isProcessing ? (
                      <div className="flex items-center text-amber-600 bg-amber-50 px-2 py-1 rounded-full text-xs">
                        <Clock className="h-3 w-3 mr-1 animate-pulse" />
                        Processing
                      </div>
                    ) : hasFlags && (
                      <div className="flex items-center text-red-600 bg-red-50 px-2 py-1 rounded-full text-xs">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        {statement.transactionCount} Transactions
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center mt-2 text-sm text-gray-500 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1.5" />
                      <span>{`${date.month} ${date.day}, ${date.year}`}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1.5" />
                      <span>{date.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {statement.status === 'completed' && (
                  <>
                    <div className="hidden group-hover:flex items-center text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full text-sm animate-fadeIn">
                      <CheckCircle className="h-4 w-4 mr-1.5" />
                      Processed
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate('/transactions')}
                    >
                      Review
                      <ArrowRight className="h-4 w-4 ml-1.5" />
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UploadedStatementsList;