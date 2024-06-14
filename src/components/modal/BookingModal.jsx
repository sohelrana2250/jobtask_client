import React from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import PostAction from "../../FatchAction/PostAction";

const BookingModal = ({ eventId }) => {
  const { user } = useAuth();
  const handelBookingSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const bookingData = {
      name,
      eventId,
    };
    // booking
    try {
      PostAction(`${import.meta.env.VITE_JOBTASK_URL}/booking`, bookingData);
    } catch (error) {
      toast.error(error?.message);
    }
  };
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="booking_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Booking Events</h3>
          <form onSubmit={handelBookingSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              User Name
              <input
                type="text"
                name="name"
                className="grow"
                placeholder="Name"
                required
              />
            </label>
            <br />
            <label className="input input-bordered flex items-center gap-2">
              Email
              <input
                type="text"
                name="email"
                aria-readonly
                defaultValue={user?.email}
                className="grow"
                placeholder="Email"
              />
            </label>
            <br />
            <label className="input input-bordered flex items-center gap-2">
              Booking Date
              <input
                type="text"
                defaultValue={new Date().toString()}
                className="grow"
                placeholder="Date"
              />
            </label>
            <br />
            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-outline btn-sm btn-primary"
              >
                Booking
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default BookingModal;
