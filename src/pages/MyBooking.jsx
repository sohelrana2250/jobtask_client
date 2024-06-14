import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import PaymentModa from "../components/modal/PaymentModa";

const MyBooking = () => {
  const token = localStorage.getItem("token");
  const [paymentInfo, setPaymentInfo] = useState({});
  const {
    data: mybooking = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["mybooking"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_JOBTASK_URL}/mybooking`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
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
  const handelDeleteBooking = async (id) => {
    Swal.fire({
      title: "Do you want to Delete the Booking?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_JOBTASK_URL}/deletemy_booking/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("API ERROR");
            }
            return res.json();
          })
          .then((data) => {
            if (!!data) {
              Swal.fire("Delete", "", "success");
              refetch();
            }
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not Delete", "", "info");
      }
    });
  };

  const paymentgModel = (paymentData) => {
    document.getElementById("payment_modal").showModal();
    setPaymentInfo(paymentData);
  };

  const handelWithOutPayment = (withOutPayment) => {
    fetch(`${import.meta.env.VITE_JOBTASK_URL}/api/v1/withoutPayment`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(withOutPayment),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        if (!!data) {
          toast.success(" Booking Successful WithOut Payment");
          refetch();
        }
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  const handelWithOutPaymentDelete = (deleteWithOutPayment) => {
    Swal.fire({
      title: "Do you want to Delete the Booking?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(
          `${import.meta.env.VITE_JOBTASK_URL}/api/v1/delete_withoutPayment`,
          {
            method: "DELETE",

            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(deleteWithOutPayment),
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw new Error("API ERROR");
            }
            return res.json();
          })
          .then((data) => {
            if (!!data) {
              Swal.fire("Delete", "", "success");
              refetch();
            }
          })
          .catch((error) => {
            toast.error(error?.message);
          });
      } else if (result.isDenied) {
        Swal.fire("Changes are not Delete", "", "info");
      }
    });
  };

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
              <th>WithOut payment Status</th>
              <th>Price</th>
              <th>Booking Created Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!isLoading &&
              mybooking?.data?.map((booking, index) => (
                <tr key={booking._id}>
                  <td>{index + 1}</td>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td className="px-4 py-3 text-xs border">
                    {booking.paymentstatus ? (
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
                  <td>${booking.price}</td>
                  <td>
                    <span className="px-2 py-1 font-semibold leading-tight text-blue-500-700 bg-green-100 rounded-sm">
                      {booking.createdAt}
                    </span>
                  </td>

                  <td>
                    <div className="flex space-x-2">
                      <button
                        disabled={booking.paymentstatus}
                        onClick={() => handelDeleteBooking(booking?._id)}
                        className="btn btn-sm btn-error btn-outline"
                      >
                        Delete
                      </button>
                      <button
                        disabled={
                          booking.paymentstatus || booking.withoutpayment
                        }
                        onClick={() =>
                          paymentgModel({
                            payableAmount: booking?.price,
                            name: booking?.name,
                            email: booking?.email,
                            bookingId: booking?._id,
                            eventId: booking?.eventId,
                          })
                        }
                        className="btn btn-sm btn-primary"
                      >
                        Payment
                      </button>
                      <PaymentModa paymentInfo={paymentInfo} />
                      <button
                        disabled={
                          booking.paymentstatus || booking.withoutpayment
                        }
                        onClick={() =>
                          handelWithOutPayment({
                            bookingId: booking?._id,
                            eventId: booking?.eventId,
                          })
                        }
                        className="btn btn-sm btn-secondary"
                      >
                        Without Payment
                      </button>

                      <button
                        disabled={booking.paymentstatus}
                        onClick={() =>
                          handelWithOutPaymentDelete({
                            bookingId: booking?._id,
                            eventId: booking?.eventId,
                          })
                        }
                        className="btn btn-sm btn-error btn-outline"
                      >
                        Without Payment Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyBooking;
