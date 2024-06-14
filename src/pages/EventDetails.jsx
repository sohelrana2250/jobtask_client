import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";
import BookingModal from "../components/modal/BookingModal";

const EventDetails = () => {
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const {
    data: specificEvent = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["specificEvent "],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_JOBTASK_URL}/specific_event/${id}`,
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
  const {
    name,
    startingDate,
    endingDate,
    photo,
    event,
    availableTickets,
    price,
    eventdescription,
    eventAddress,
    payableTicket,
    freeTicket,
    _id,
  } = specificEvent?.data || {};

  const bookingModel = () => {
    document.getElementById("booking_modal").showModal();
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <div className="card w-full lg:w-3/4 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out m-4">
          <div className="avatar">
            <div className="w-full">
              <img
                className="object-cover w-full h-56 rounded-t-lg"
                src={photo}
                alt={name}
              />
            </div>
          </div>
          <div className="card-body p-6">
            <h2 className="card-title text-2xl font-bold text-gray-800">
              {name}
            </h2>
            <p className="text-gray-600 mb-4">{eventdescription}</p>
            <div className="my-4 text-gray-700">
              <p className="mb-2">
                <strong>Event:</strong> {event}
              </p>
              <p className="mb-2">
                <strong>Address:</strong> {eventAddress}
              </p>
              <p className="mb-2">
                <strong>Start Date:</strong>{" "}
                {new Date(startingDate).toLocaleString()}
              </p>
              <p className="mb-2">
                <strong>End Date:</strong>{" "}
                {new Date(endingDate).toLocaleString()}
              </p>
              <p className="mb-2">
                <strong>Available Tickets:</strong> {availableTickets}
              </p>
              <p className="mb-2">
                <strong>Payable Tickets:</strong> {payableTicket}
              </p>
              <p className="mb-2">
                <strong>Free Tickets:</strong> {freeTicket}
              </p>
              <p className="mb-2">
                <strong>Price:</strong> ${price}
              </p>
            </div>
            <div className="card-actions justify-end">
              <button className="btn" onClick={() => bookingModel()}>
                Booking
              </button>
              <BookingModal eventId={_id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
