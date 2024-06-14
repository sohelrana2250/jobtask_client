import React, { useState } from "react";
import { TypeOfImage } from "../utilites/ExtentionType";
import GenerateImage from "../FatchAction/GenerateImage";
import toast from "react-hot-toast";
import PostAction from "../FatchAction/PostAction";

const AddToEvent = () => {
  const [eventformData, setFormData] = useState({
    event: "Beya Concert",
    name: "Hamlet by Shakespeare",
    startingDate: "2024-11-20T19:30:00",
    endingDate: "2024-11-20T21:30:00",
    photo: "",
    availableTickets: 100,
    eventdescription:
      "Experience the timeless classic 'Hamlet' by Shakespeare, live on stage.",
    eventAddress: "654 Drama Lane, Theater City, Playland",
    payableTicket: 60,
    freeTicket: 40,
    price: 500,
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...eventformData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFile) {
      if (
        TypeOfImage.includes(imageFile?.name?.split(".")?.pop()?.toLowerCase())
      ) {
        eventformData.photo = await GenerateImage(imageFile);
        const updatedFormData = {
          ...eventformData,
        };
        updatedFormData.freeTicket = Number(updatedFormData.freeTicket);
        updatedFormData.price = Number(updatedFormData.price);
        updatedFormData.payableTicket = Number(updatedFormData.payableTicket);
        updatedFormData.availableTickets = Number(
          updatedFormData.availableTickets
        );

        // uploade into database
        try {
          PostAction(
            `${import.meta.env.VITE_JOBTASK_URL}/available_event`,
            updatedFormData
          );
        } catch (error) {
          toast.error(error?.message);
        }
      }
    } else {
      console.error("No image file selected");
    }
  };
  /*try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=YOUR_IMGBB_API_KEY`, formData);
        const imageUrl = response.data.data.url;

        // Update formData with the image URL
        const updatedFormData = {
          ...formData,
          photo: imageUrl,
        };

        // Handle form submission logic here
        console.log(updatedFormData);
      } catch (error) {
        console.error("Image upload failed:", error);
      } */

  return (
    <>
      <div className="max-w-full mx-auto mt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl mb-4">Event Form</h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="event"
            >
              Event
            </label>
            <input
              id="event"
              name="event"
              type="text"
              defaultValue={eventformData.event}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              defaultValue={eventformData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="startingDate"
            >
              Starting Date
            </label>
            <input
              id="startingDate"
              name="startingDate"
              type="datetime-local"
              defaultValue={eventformData.startingDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="endingDate"
            >
              Ending Date
            </label>
            <input
              id="endingDate"
              name="endingDate"
              type="datetime-local"
              defaultValue={eventformData.endingDate}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photo"
            >
              Photo Images
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="photo"
                    className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                  >
                    <span>Upload a Photo</span>
                    <input
                      id="photo"
                      name="photo"
                      onChange={handleFileChange}
                      required
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs">PNG, JPG, GIF up to 800kb</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="availableTickets"
            >
              Available Tickets
            </label>
            <input
              id="availableTickets"
              name="availableTickets"
              type="number"
              defaultValue={eventformData.availableTickets}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="eventdescription"
            >
              Event Description
            </label>
            <textarea
              id="eventdescription"
              name="eventdescription"
              defaultValue={eventformData.eventdescription}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="eventAddress"
            >
              Event Address
            </label>
            <input
              id="eventAddress"
              name="eventAddress"
              type="text"
              defaultValue={eventformData.eventAddress}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="payableTicket"
            >
              Payable Tickets
            </label>
            <input
              id="payableTicket"
              name="payableTicket"
              type="number"
              defaultValue={eventformData.payableTicket}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="freeTicket"
            >
              Free Tickets
            </label>
            <input
              id="freeTicket"
              name="freeTicket"
              type="number"
              defaultValue={eventformData.freeTicket}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              id="price"
              name="price"
              type="number"
              defaultValue={eventformData.price}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary btn-outline w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddToEvent;
