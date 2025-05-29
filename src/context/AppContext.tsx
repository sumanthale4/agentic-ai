import React, { createContext, useContext, useState } from "react";
import { Transaction, UploadedStatement, DashboardStats } from "../types";
import {
  dummyTransactions,
  dummyUploadedStatements,
  dummyDashboardStats,
} from "../utils/dummyData";

interface AppContextType {
  transactions: Transaction[];
  uploadedStatements: UploadedStatement[];
  dashboardStats: DashboardStats;
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (transaction: Transaction | null) => void;
  uploadStatement: (file: File) => void;
  updateTransactionStatus: (
    id: string,
    status: "pending" | "approved" | "disputed"
  ) => void;
  toastMessage: { message: string; type: "success" | "error" | "info" } | null;
  setToastMessage: (
    toast: { message: string; type: "success" | "error" | "info" } | null
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(dummyTransactions);
  const [uploadedStatements, setUploadedStatements] = useState<
    UploadedStatement[]
  >(dummyUploadedStatements);
  const [dashboardStats, setDashboardStats] =
    useState<DashboardStats>(dummyDashboardStats);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [toastMessage, setToastMessage] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const uploadStatement = (file: File) => {
    // Simulate file upload and processing
    const newStatement: UploadedStatement = {
      id: String(uploadedStatements.length + 1),
      filename: file.name,
      status: "processing",
      uploadedAt: new Date().toISOString(),
    };

    setUploadedStatements([newStatement, ...uploadedStatements]);

    // Simulate processing completion after 2 seconds
    setTimeout(() => {
      setUploadedStatements((prevStatements) =>
        prevStatements.map((statement) =>
          statement.id === newStatement.id
            ? {
                ...statement,
                status: "completed",
                transactionCount: Math.floor(Math.random() * 20) + 5,
              }
            : statement
        )
      );

      setDashboardStats((prev) => ({
        ...prev,
        totalStatements: prev.totalStatements + 1,
      }));

      setToastMessage({
        message: "Statement processed successfully!",
        type: "success",
      });
    }, 2000);
  };

  const updateTransactionStatus = (
    id: string,
    status: "pending" | "approved" | "disputed"
  ) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id ? { ...transaction, status } : transaction
      )
    );

    if (status === "disputed") {
      setDashboardStats((prev) => ({
        ...prev,
        disputesResolved: prev.disputesResolved + 1,
      }));
    }
  };

  const value = {
    transactions,
    uploadedStatements,
    dashboardStats,
    selectedTransaction,
    setSelectedTransaction,
    uploadStatement,
    updateTransactionStatus,
    toastMessage,
    setToastMessage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
