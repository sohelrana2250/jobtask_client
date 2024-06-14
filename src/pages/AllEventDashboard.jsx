import React from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AllEventDashboard = () => {
  const {
    data: allevent = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allevent"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_JOBTASK_URL}/all_event`,
          {
            method: "GET",
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

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Do you want to Delete the Booking?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_JOBTASK_URL}/delete_event/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
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
  return (
    <>
      <div className="container mx-auto mt-10">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">Event</th>
                <th className="py-2 px-4 border-b border-gray-200">Name</th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Starting Date
                </th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Ending Date
                </th>
                <th className="py-2 px-4 border-b border-gray-200">Photo</th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Available Tickets
                </th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Event Description
                </th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Event Address
                </th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Payable Tickets
                </th>
                <th className="py-2 px-4 border-b border-gray-200">
                  Free Tickets
                </th>
                <th className="py-2 px-4 border-b border-gray-200">Price</th>
                <th className="py-2 px-4 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                allevent?.data?.map((event) => (
                  <tr key={event._id}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {event.event}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {event.name}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {new Date(event.startingDate).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {new Date(event.endingDate).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border-b  border-gray-200">
                      <img
                        src={event.photo}
                        alt={event.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {event.availableTickets}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {event.eventdescription}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {event.eventAddress}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {event.payableTicket}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {event.freeTicket}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {event.price}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <Link
                        to={`/dashboard/updateEvent/${event?._id}`}
                        className="text-blue-500 btn btn-outline btn-sm hover:text-blue-700 m-2"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="text-red-500 btn  btn-outline btn-sm hover:text-red-700 m-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllEventDashboard;
