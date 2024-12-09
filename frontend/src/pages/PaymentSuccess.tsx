import { CircleCheckIcon } from 'lucide-react'
import { Link } from 'react-router'

const PaymentSuccess = () => {
  const currentDate = new Date()

  const dateTimeString = currentDate.toLocaleString();



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="max-w-md w-full space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-800">
      <div className="flex flex-col items-center">
        <CircleCheckIcon className="text-green-500 h-16 w-16" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-50 mt-4">Payment Successful</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Thank you for your payment. Your order is being processed.
        </p>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Payment Method:</span>
          <span className="font-medium text-gray-900 dark:text-gray-50">Visa ending in 1234</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 dark:text-gray-400">Date &amp; Time:</span>
          <span className="font-medium text-gray-900 dark:text-gray-50">{dateTimeString}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          to={"/my-bookings"}
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
        >
          View Bookings
        </Link>
      </div>
    </div>
  </div>

  )
}

export default PaymentSuccess
