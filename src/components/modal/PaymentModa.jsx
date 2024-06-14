import React from "react";
import toast from "react-hot-toast";

const PaymentModa = ({ paymentInfo }) => {
  const handelPaymentSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const address = form.address.value;
    const currency = form.currency.value;
    const number = form.number.value;
    const email = paymentInfo.email;
    const payableAmount = Number(paymentInfo.payableAmount);
    const bookingId = paymentInfo.bookingId;
    const eventId = paymentInfo.eventId;

    const paymentDetaild = {
      name,
      address,
      currency,
      number,
      email,
      payableAmount,
      bookingId,
      eventId,
    };
    fetch(`${import.meta.env.VITE_JOBTASK_URL}/order`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(paymentDetaild),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        window.open(data?.url, "_blank");
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  return (
    <>
      <dialog id="payment_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Payment Statment</h3>
          <form onSubmit={handelPaymentSubmit}>
            <label className="input input-bordered flex items-center gap-2">
              User Name
              <input
                type="text"
                name="name"
                className="grow"
                defaultValue={paymentInfo.name}
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
                defaultValue={paymentInfo.email}
                readOnly
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

            <div className="relative w-full ">
              <div className=" absolute left-0 top-0 py-2.5 px-4 text-gray-300"></div>
              <select
                name="currency"
                required
                className="select select-bordered select-sm w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400"
              >
                <option disabled>Choose a Curreny</option>
                <option>BDT</option>
                <option>USD</option>
                <option>RMB</option>
                <option>Euro</option>
              </select>
            </div>
            <br />
            <label className="input input-bordered flex items-center gap-2">
              Address
              <input
                type="text"
                name="address"
                aria-readonly
                className="grow"
                placeholder="address"
              />
            </label>
            <br />
            <label className="input input-bordered flex items-center gap-2">
              Number
              <input
                type="text"
                name="number"
                aria-readonly
                className="grow"
                placeholder="number"
              />
            </label>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn btn-outline btn-sm btn-primary"
              >
                Payment
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default PaymentModa;
