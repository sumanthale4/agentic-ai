import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, CreditCard } from "lucide-react";
import Button from "./ui/Button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <CreditCard className="h-7 w-7 text-blue-600" />
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              CardGuard AI
            </span>
          </div>

          {/* Nav Buttons */}
          <nav className="flex items-center space-x-3">
            {location.pathname !== "/" && (
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back to Dashboard
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
