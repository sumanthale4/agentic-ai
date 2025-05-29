// import React from "react";
// import {
//   AlertTriangle,
//   CheckCircle,
//   AlertCircle,
//   DollarSign,
//   Calendar,
//   Store,
//   FileText,
//   Shield,
//   TrendingUp,
//   X,
// } from "lucide-react";
// import { Transaction } from "../../types";
// import Modal from "../ui/Modal";
// import Button from "../ui/Button";
// import { useApp } from "../../context/AppContext";

// interface TransactionModalProps {
//   transaction: Transaction;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const TransactionModal: React.FC<TransactionModalProps> = ({
//   transaction,
//   isOpen,
//   onClose,
// }) => {
//   const { updateTransactionStatus, setToastMessage } = useApp();

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-US", {
//       dateStyle: "full",
//     }).format(date);
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(amount);
//   };

//   const handleApprove = () => {
//     updateTransactionStatus(transaction.id, "approved");
//     setToastMessage({
//       message: "Transaction approved successfully",
//       type: "success",
//     });
//     onClose();
//   };

//   const handleDispute = () => {
//     updateTransactionStatus(transaction.id, "disputed");
//     setToastMessage({
//       message: "Transaction disputed successfully",
//       type: "info",
//     });
//     onClose();
//   };

//   const getStatusColor = () => {
//     switch (transaction.status) {
//       case "approved":
//         return "bg-emerald-100 text-emerald-700";
//       case "disputed":
//         return "bg-red-100 text-red-700";
//       default:
//         return "bg-amber-100 text-amber-700";
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Transaction Details"
//       size="lg"
//     >
//       <div className="space-y-8">
//         {/* Transaction Status Banner */}

//         {/* Transaction Details Grid */}
//         <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//           {/* Amount */}
//           <div>
//             <div className="flex items-center text-gray-500 mb-1">
//               <DollarSign className="h-4 w-4 mr-1" />
//               <span>Amount</span>
//             </div>
//             <div className="text-base font-semibold text-gray-900">
//               {formatCurrency(transaction.amount)}
//             </div>
//           </div>

//           {/* Date */}
//           <div>
//             <div className="flex items-center text-gray-500 mb-1">
//               <Calendar className="h-4 w-4 mr-1" />
//               <span>Date</span>
//             </div>
//             <div className="text-base text-gray-900">
//               {formatDate(transaction.date)}
//             </div>
//           </div>

//           {/* Merchant */}
//           <div>
//             <div className="flex items-center text-gray-500 mb-1">
//               <Store className="h-4 w-4 mr-1" />
//               <span>Merchant</span>
//             </div>
//             <div className="text-base text-gray-900">
//               {transaction.merchant}
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <div className="flex items-center text-gray-500 mb-1">
//               <FileText className="h-4 w-4 mr-1" />
//               <span>Description</span>
//             </div>
//             <div className="text-base text-gray-900">
//               {transaction.description}
//             </div>
//           </div>
//         </div>

//         {/* AI Analysis Section */}
//         {transaction.flagged && (
//           <div className="border-t border-gray-100 pt-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               AI Analysis
//             </h3>

//             {/* Confidence Score */}
//             <div className="bg-gray-50 rounded-xl p-4 mb-4">
//               <div className="flex items-center justify-between mb-2">
//                 <div className="flex items-center text-gray-700">
//                   <TrendingUp className="h-4 w-4 mr-1.5" />
//                   <span className="font-medium">AI Confidence Score</span>
//                 </div>
//                 <span className="text-sm font-bold text-gray-900">
//                   {Math.round((transaction.confidenceScore || 0.5) * 100)}%
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <div
//                   className="bg-red-500 h-2 rounded-full transition-all duration-300"
//                   style={{
//                     width: `${(transaction.confidenceScore || 0.5) * 100}%`,
//                   }}
//                 />
//               </div>
//             </div>

//             {/* AI Reasoning */}
//             <div className="bg-red-50 rounded-xl p-4 mb-4">
//               <div className="flex items-start">
//                 <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
//                 <div className="ml-3">
//                   <h4 className="text-sm font-medium text-red-800">
//                     Reason for Flagging
//                   </h4>
//                   <p className="mt-1 text-sm text-red-700">
//                     {transaction.aiReason ||
//                       "Unusual transaction pattern detected"}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* AI Explanation */}
//             <div className="bg-blue-50 rounded-xl p-4">
//               <div className="flex items-start">
//                 <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
//                 <div className="ml-3">
//                   <h4 className="text-sm font-medium text-blue-800">
//                     AI Analysis Details
//                   </h4>
//                   <p className="mt-1 text-sm text-blue-700">
//                     This transaction appears unusual compared to your typical
//                     spending patterns. Our AI system detected an anomaly based
//                     on the merchant, amount, and timing of this transaction.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Current Status */}
//         <div className="border-t border-gray-100 pt-6">
//           <div className="flex items-center justify-between">
//             <h3 className="text-lg font-semibold text-gray-900">
//               Current Status
//             </h3>
//             <div className={`px-4 py-1.5 rounded-full ${getStatusColor()}`}>
//               <div className="flex items-center">
//                 {transaction.status === "approved" ? (
//                   <>
//                     <CheckCircle className="h-4 w-4 mr-1.5" />
//                     <span className="font-medium">Approved</span>
//                   </>
//                 ) : transaction.status === "disputed" ? (
//                   <>
//                     <AlertTriangle className="h-4 w-4 mr-1.5" />
//                     <span className="font-medium">Disputed</span>
//                   </>
//                 ) : (
//                   <>
//                     <AlertCircle className="h-4 w-4 mr-1.5" />
//                     <span className="font-medium">Pending Review</span>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-3 border-t border-gray-100 pt-6">
//           <Button variant="outline" onClick={onClose}>
//             <X className="h-4 w-4 mr-1.5" />
//             Close
//           </Button>
//           {transaction.status === "pending" && (
//             <>
//               <Button variant="success" onClick={handleApprove}>
//                 <CheckCircle className="h-4 w-4 mr-1.5" />
//                 Approve
//               </Button>
//               <Button variant="danger" onClick={handleDispute}>
//                 <AlertTriangle className="h-4 w-4 mr-1.5" />
//                 Dispute
//               </Button>
//             </>
//           )}
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default TransactionModal;
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
} from "lucide-react";
import { Transaction } from "../../types";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import Badge from "../ui/Badge";
import { useApp } from "../../context/AppContext";

interface TransactionModalProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onDispute?: (id: string) => void;
  onEscalate?: (id: string) => void;
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = () => {
    switch (transaction.status) {
      case "approved":
        return "bg-emerald-100 text-emerald-700";
      case "disputed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  const getStatusIcon = () => {
    switch (transaction.status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 mr-1.5" />;
      case "disputed":
        return <AlertTriangle className="h-4 w-4 mr-1.5" />;
      case "pending":
        return <Flag className="h-4 w-4 mr-1.5" />;
      default:
        return <AlertCircle className="h-4 w-4 mr-1.5" />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Details"
      size="lg"
    >
      <div className="flex flex-col h-full">
        {activeTab === "details" && (
          <div
            className={`px-4 py-2 mb-4 rounded-lg flex items-center justify-between ${getStatusColor()}`}
          >
            <div className="flex items-center">
              {getStatusIcon()}
              <span className="font-medium capitalize">
                {transaction.status}
              </span>
            </div>
            {transaction.flagged && (
              <Badge variant="danger" className="bg-red-100 text-red-700">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Flagged
              </Badge>
            )}
          </div>
        )}

        <div className="flex border-b border-gray-200 mb-4">
          <button
            className={`px-4 py-2 font-medium text-sm transition-colors duration-150 border-b-2 ${
              activeTab === "details"
                ? "border-[#FFCB05] text-[#333333]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("details")}
          >
            <Info className="w-4 h-4 inline mr-2" />
            Transaction Details
          </button>
          {transaction.flagged && (
            <button
              className={`px-4 py-2 font-medium text-sm transition-colors duration-150 border-b-2 ${
                activeTab === "analysis"
                  ? "border-[#FFCB05] text-[#333333]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("analysis")}
            >
              <Shield className="w-4 h-4 inline mr-2" />
              Risk Analysis
            </button>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-grow overflow-y-auto">
          {activeTab === "details" ? (
            <div className="space-y-6">
              {/* Transaction Details Grid */}
              <div className="bg-gray-50 rounded-xl p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {/* Amount */}
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>Amount</span>
                  </div>
                  <div className="text-base font-semibold text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>Date</span>
                  </div>
                  <div className="text-base text-gray-900">
                    {formatDate(transaction.date)}
                  </div>
                </div>

                {/* Merchant */}
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <Store className="h-4 w-4 mr-1" />
                    <span>Merchant</span>
                  </div>
                  <div className="text-base text-gray-900">
                    {transaction.merchant}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center text-gray-500 mb-1">
                    <FileText className="h-4 w-4 mr-1" />
                    <span>Description</span>
                  </div>
                  <div className="text-base text-gray-900">
                    {transaction.description}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* AI Analysis Section */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-[#333333]">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    <span className="font-medium">Risk Score</span>
                  </div>
                  <div className="text-lg font-bold text-[#333333]">
                    {Math.round((transaction.confidenceScore || 0.5) * 100)}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-[#FFCB05] h-2.5 rounded-full transition-all duration-300"
                    style={{
                      width: `${(transaction.confidenceScore || 0.5) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="bg-red-50 rounded-xl p-4">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-red-800">
                      Reason for Flagging
                    </h4>
                    <p className="mt-1 text-sm text-red-700 break-words">
                      {transaction.aiReason ||
                        "Unusual transaction pattern detected"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-blue-800">
                      AI Analysis Details
                    </h4>
                    <p className="mt-1 text-sm text-blue-700">
                      Our AI system has detected anomalies in this transaction
                      based on:
                      <ul className="list-disc ml-4 mt-2">
                        <li>Transaction amount pattern</li>
                        <li>Merchant category analysis</li>
                        <li>Historical spending behavior</li>
                        <li>Location-based risk assessment</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end space-x-3 border-t border-gray-100 pt-6">
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
            <>
              <Button variant="danger" onClick={handleDispute}>
                <AlertTriangle className="h-4 w-4 mr-1.5" />
                Dispute
              </Button>
            </>
          )}
            {transaction.status === "disputed" && (
            <>
               <Button variant="success" onClick={handleApprove}>
                <CheckCircle className="h-4 w-4 mr-1.5" />
                Approve
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TransactionModal;
