import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Header from "./components/Header";
import DashboardPage from "./pages/DashboardPage";
import TransactionReviewPage from "./pages/TransactionReviewPage";
import Toast from "./components/ui/Toast";

// Add animations to global CSS
import "./index.css";

// Main App Component
const AppContent: React.FC = () => {
  const { toastMessage, setToastMessage } = useApp();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/transactions" element={<TransactionReviewPage />} />
        </Routes>
      </main>

      {toastMessage && (
        <Toast
          message={toastMessage.message}
          type={toastMessage.type}
          onClose={() => setToastMessage(null)}
        />
      )}
    </div>
  );
};

// App with Context Provider
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
