import { TrendingUp } from "lucide-react";
import { Outlet } from "react-router-dom";

const Header = () => {
  
  return (
    <>
      <header className="bg-gradient-to-r from-indigo-500 to-purple-600 border-b border-gray-200">
        <div className="container mx-auto px-6 py-6 flex items-center gap-4">
          <div className="p-2 bg-gray-100 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Northern Tools Forecasting Demo
            </h1>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
};

export default Header;
