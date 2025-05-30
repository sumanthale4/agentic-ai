import React, { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Store,
  FileText,
  Shield,
  TrendingUp,
  X,
  Info,
  Flag,
  ChevronRight,
} from "lucide-react";
import { Transaction } from "../../types";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Badge from "../ui/Badge";
import { useApp } from "../../context/AppContext";

interface TransactionModalProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  transaction,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<"details" | "analysis">("details");
  const { updateTransactionStatus, setToastMessage } = useApp();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "full",
    }).format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const handleApprove = () => {
    updateTransactionStatus(transaction.id, "approved");
    setToastMessage({
      message: "Transaction approved successfully",
      type: "success",
    });
    onClose();
  };

  const handleDispute = () => {
    updateTransactionStatus(transaction.id, "disputed");
    setToastMessage({
      message: "Transaction disputed successfully",
      type: "info",
    });
    onClose();
  };

  const getStatusConfig = () => {
    switch (transaction.status) {
      case "approved":
        return {
          icon: CheckCircle,
          color: "text-emerald-600",
          bgColor: "bg-emerald-50",
          borderColor: "border-emerald-200",
          label: "Approved",
        };
      case "disputed":
        return {
          icon: AlertTriangle,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          label: "Disputed",
        };
      default:
        return {
          icon: Flag,
          color: "text-amber-600",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          label: "Pending Review",
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" size="lg">
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className="flex items-center justify-between pb-6 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${statusConfig.bgColor}`}>
              <StatusIcon className={`h-6 w-6 ${statusConfig.color}`} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {formatCurrency(transaction.amount)}
              </h2>
              <p className="text-sm text-gray-500">{transaction.merchant}</p>
            </div>
          </div>
          <div
            className={`px-4 py-2 rounded-full ${statusConfig.bgColor} ${statusConfig.color} font-medium text-sm`}
          >
            {statusConfig.label}
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-100 mt-4">
          <button
            className={`px-6 py-3 font-medium text-sm transition-colors duration-150 border-b-2 ${
              activeTab === "details"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            Transaction Details
          </button>
          {transaction.flagged && (
            <button
              className={`px-6 py-3 font-medium text-sm transition-colors duration-150 border-b-2 ${
                activeTab === "analysis"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("analysis")}
            >
              Risk Analysis
            </button>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-grow overflow-y-auto py-6">
          {activeTab === "details" ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">Date</span>
                  </div>
                  <p className="text-gray-900">{formatDate(transaction.date)}</p>
                </div>

                {/* Merchant */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Store className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Merchant
                    </span>
                  </div>
                  <p className="text-gray-900">{transaction.merchant}</p>
                </div>

                {/* Amount */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Amount
                    </span>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>

                {/* Description */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Description
                    </span>
                  </div>
                  <p className="text-gray-900">{transaction.description}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Risk Score */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-gray-400" />
                    <span className="font-medium text-gray-900">Risk Score</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {Math.round((transaction.confidenceScore || 0.5) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${(transaction.confidenceScore || 0.5) * 100}%`,
                    }}
                  />
                </div>
              </div>

              {/* Risk Factors */}
              <div className="bg-red-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-red-900 mb-2">
                      Risk Factors Detected
                    </h4>
                    <p className="text-red-700 text-sm">
                      {transaction.aiReason ||
                        "Unusual transaction pattern detected"}
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-2">
                      AI Analysis Details
                    </h4>
                    <div className="space-y-3 text-sm text-blue-700">
                      <p>
                        Our AI system has analyzed this transaction and identified
                        potential risks based on:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4" />
                          Unusual amount compared to your typical spending
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4" />
                          Transaction location analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4" />
                          Merchant category evaluation
                        </li>
                        <li className="flex items-center gap-2">
                          <ChevronRight className="h-4 w-4" />
                          Historical spending patterns
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 border-t border-gray-100 pt-6">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-1.5" />
            Close
          </Button>
          {transaction.status === "pending" && (
            <>
              <Button variant="success" onClick={handleApprove}>
                <CheckCircle className="h-4 w-4 mr-1.5" />
                Approve
              </Button>
              <Button variant="danger" onClick={handleDispute}>
                <AlertTriangle className="h-4 w-4 mr-1.5" />
                Dispute
              </Button>
            </>
          )}
          {transaction.status === "approved" && (
            <Button variant="danger" onClick={handleDispute}>
              <AlertTriangle className="h-4 w-4 mr-1.5" />
              Dispute
            </Button>
          )}
          {transaction.status === "disputed" && (
            <Button variant="success" onClick={handleApprove}>
              <CheckCircle className="h-4 w-4 mr-1.5" />
              Approve
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;