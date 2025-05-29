import React from "react";
import { useApp } from "../context/AppContext";
import StatsSummary from "../components/dashboard/StatsSummary";
import FileUpload from "../components/dashboard/FileUpload";
import UploadedStatementsList from "../components/dashboard/UploadedStatementsList";

const DashboardPage: React.FC = () => {
  const { dashboardStats, uploadedStatements } = useApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-6"> 
          <div className="flex items-center gap-3 mb-3">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard Overview
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Monitor your credit card statements and detect potential fraud
          </p>
        </div>

        {/* Stats Summary with enhanced visual design */}
        <div className="mb-12">
          <StatsSummary stats={dashboardStats} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <FileUpload />
          </div>

          {/* Statements List Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
              Recent Statements
            </h2>
            <UploadedStatementsList statements={uploadedStatements} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
