import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";

const AllPayment = () => {
  const {
    data: allPayments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allPayments"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_JOBTASK_URL}/allpayment`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res?.json();
        return data;
      } catch (error) {
        toast.error(`Failed to fetch reviews: ${error?.message}`);
      }
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Payment Status</th>
              <th>Without Payment Status</th>
              <th>Price</th>
              <th>Booking Created Time</th>
              <th>EventId</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              allPayments?.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td className="px-4 py-3 text-xs border">
                    {booking.paidStatus ? (
                      <span className="px-2 py-1 font-semibold leading-tight text-blue-500-700 bg-green-100 rounded-sm">
                        Paid
                      </span>
                    ) : (
                      <span className="px-2 py-1 font-semibold leading-tight text-red-500 bg-red-100 rounded-sm">
                        UnPaid
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    {booking.withoutpayment ? (
                      <span className="px-2 py-1 font-semibold leading-tight text-blue-500-700 bg-green-100 rounded-sm">
                        Booking Success
                      </span>
                    ) : (
                      <span className="px-2 py-1 font-semibold leading-tight text-red-500 bg-red-100 rounded-sm">
                        Booking Pending
                      </span>
                    )}
                  </td>
                  <td>
                    {booking.currency} {booking.payableAmount}
                  </td>
                  <td>
                    <span className="px-2 py-1 font-semibold leading-tight text-blue-500-700 bg-green-100 rounded-sm">
                      {new Date(booking.createdAt).toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <span className="px-2 py-1 font-semibold leading-tight text-blue-500-700 bg-green-100 rounded-sm">
                      {booking.eventId}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AllPayment;
