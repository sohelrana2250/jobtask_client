import React from "react";
import { Link } from "react-router-dom";

const SingleProduct = ({ event }) => {
  const {
    name,
    startingDate,
    endingDate,
    photo,
    availableTickets,
    price,
    eventdescription,
    eventAddress,
    _id,
  } = event || {};

  return (
    <div className="card w-full lg:w-full bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div className="avatar">
        <div className="w-full">
          <img
            className="object-cover w-full h-64 rounded-t-lg"
            src={photo}
            alt={name}
          />
        </div>
      </div>
      <div className="card-body p-6">
        <h2 className="card-title text-2xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600">{eventdescription}</p>
        <div className="my-4 text-gray-700">
          <p className="mb-2">
            <strong>Address:</strong> {eventAddress}
          </p>
          <p className="mb-2">
            <strong>Start Date:</strong>{" "}
            {new Date(startingDate).toLocaleString()}
          </p>
          <p className="mb-2">
            <strong>End Date:</strong> {new Date(endingDate).toLocaleString()}
          </p>
          <p className="mb-2">
            <strong>Available Tickets:</strong> {availableTickets}
          </p>
          <p className="mb-2">
            <strong>Price:</strong> ${price}
          </p>
        </div>
        <div className="card-actions justify-end">
          <Link
            to={`/event_details/${_id}`}
            className="btn btn-primary btn-sm hover:bg-blue-700 transition-colors duration-300 ease-in-out"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
