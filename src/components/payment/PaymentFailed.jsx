import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const PaymentFailed = () => {
  const { tranId } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-red-900">
              Payment Failed
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Thank you for your purchase!
            </p>
          </div>
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 text-red-500 mx-auto"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 11a1 1 0 011-1h1.802l1.598-2.85a1 1 0 01.938-.55h.832a1 1 0 01.938.55L12.198 10H14a1 1 0 110 2h-1.802l-1.598 2.85a1 1 0 01-.938.55h-.832a1 1 0 01-.938-.55L7.802 13H6a1 1 0 01-1-1zm2.5-8a1 1 0 011 1v1h5V4a1 1 0 112 0v1h1a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1h1V3a1 1 0 011-1zm1 2v10h6V5h-6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mt-6">
              <p className="text-center text-sm text-gray-600">
                Your payment has been Failed processed.
              </p>
              <p className="mt-2 text-center text-sm text-gray-600">
                A confirmation email has been sent to your registered email
                address.
              </p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500 text-xl font-serif">
                {new Date().toString()}
              </span>
            </div>
            <div className="text-gray-600">
              <p className="mb-2 font-serif text-xl">
                Transaction ID: {tranId}
              </p>
              <h1 className="text-xl font-serif">Payment Failed </h1>
            </div>
            <div className="mt-6">
              <button
                onClick={() => navigate("/")}
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Continue Event Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentFailed;
