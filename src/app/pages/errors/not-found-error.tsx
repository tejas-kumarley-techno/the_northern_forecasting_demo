import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-6">
      <div className="bg-white shadow-md rounded-2xl p-10 max-w-md text-center border border-gray-200">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mt-2">
          Sorry, we couldn't find the page you’re looking for.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition"
        >
          Go to Home
        </Link>
        <p className="text-sm text-gray-400 mt-4">Northern Tools Forecasting</p>
      </div>
    </div>
  );
};

export default NotFound;
