import React from "react";

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-600 text-base m-0">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
