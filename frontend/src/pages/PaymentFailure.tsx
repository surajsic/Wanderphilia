import { Link } from "react-router";

const PaymentFailure = () => {


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 2a8 8 0 10 8 8 8 8 0 00-8-8zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-6a1 1 0 112 0 1 1 0 01-2 0zm0 4a1 1 0 112 0 1 1 0 01-2 0z"
              clipRule="evenodd"
            />
          </svg>
          <h1 className="text-2xl font-semibold text-gray-800 mt-4">Payment Failed</h1>
          <p className="text-gray-600 mt-2">
            Oops! Something went wrong with your payment. Please try again or contact support if the issue persists.
          </p>
          <div className="mt-6 space-x-4">
            <Link to={'/'} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
              
              Try Again
            </Link>
            <button className="text-red-600 py-2 px-4 rounded border border-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
