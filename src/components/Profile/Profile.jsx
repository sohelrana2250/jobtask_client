import React, { useEffect, useState } from "react";
import DeviceDetector from "device-detector-js";
import { GrDevice, GrDocumentUpdate } from "react-icons/gr";
import {
  MdOutlineSettingsSystemDaydream,
  MdOutlineSignalWifiStatusbar4Bar,
  MdOutlineSignalWifiStatusbarNull,
  MdSignalWifiStatusbarConnectedNoInternet,
} from "react-icons/md";
import { BsBrowserChrome } from "react-icons/bs";
import { PiTrainRegionalThin } from "react-icons/pi";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../LoadingSpinner";

import GenerateImage from "../../FatchAction/GenerateImage";
import toast from "react-hot-toast";
import { TypeOfImage } from "../../utilites/ExtentionType";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [deviceInfo, setDeviceInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const { user, updateUserProfile } = useAuth();

  useEffect(() => {
    const deviceDetector = new DeviceDetector();
    const userAgent = navigator.userAgent;

    const info = deviceDetector.parse(userAgent);
    setDeviceInfo(info);
    setIsLoading(false);
  }, []);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const districtName = userTimeZone.split("/")[1];

  const handleSubmitProfile = async (event) => {
    event.preventDefault();
    const element = event.target;
    let image = element.photo.files[0];
    let name = element.name.value;

    if (TypeOfImage.includes(image?.name?.split(".")?.pop()?.toLowerCase())) {
      try {
        const photo = await GenerateImage(image);
        const photoURL = {
          displayName: name || "",
          photoURL: photo,
        };
        await updateUserProfile(photoURL);
        element.reset();
        toast.success("Profile updated successfully!");
        navigate("/");
      } catch (error) {
        toast.error(error?.message);
      }
    } else {
      toast.error(
        "Only png, jpg, jpeg are accepted. Other types are not accepted."
      );
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-full">
      <div className="border-b-2 block md:flex">
        <form
          onSubmit={handleSubmitProfile}
          className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 shadow-md"
        >
          <h1 className="text-center font-serif text-2xl m-3">User Profile</h1>
          <div className="avatar flex justify-center">
            <div className="w-52 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzF32lbq4BoRPJ3bZ4FrQiFe9uhw5tRZBqxzt7G00uhbmqTW3f-PeYpIMOUzFCsYpuOMI&usqp=CAU"
                }
                alt=""
              />
            </div>
          </div>

          <div className="flex justify-center">
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                name="photo"
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
                required
              />
            </label>
          </div>
          <div className="flex justify-center mt-6">
            <label className="block">
              <span className="sr-only">My Name</span>
              <input
                type="text"
                name="name"
                defaultValue={"Ali Mohammad"}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                required
              />
            </label>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800"
            >
              <div className="flex justify-center">
                Edit <GrDocumentUpdate className="text-xl ml-2" />
              </div>
            </button>
          </div>
        </form>
        {deviceInfo && (
          <div className="w-full max-w-md p-4 bg-white border border-gray-200 shadow sm:p-8 dark:bg-blue-900 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                User Information
              </h5>
              <a
                href="#"
                className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                View all
              </a>
            </div>
            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <GrDevice className="text-xl bg-green-400 rounded" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        <strong>Device Name:</strong>
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold dark:text-white">
                      {deviceInfo.device.brand || "common"}
                      {deviceInfo.device.model || 5100}
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <MdOutlineSettingsSystemDaydream className="text-xl bg-green-500" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        <strong>OS:</strong>
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold dark:text-white">
                      {deviceInfo.os.name} {deviceInfo.os.version}
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BsBrowserChrome className="text-xl bg-orange-600 rounded" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        <strong>Browser:</strong>
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold dark:text-white">
                      {deviceInfo.client.name} {deviceInfo.client.version}
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <MdOutlineSignalWifiStatusbar4Bar className="text-xl bg-white rounded" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        <strong>Active</strong>
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold dark:text-white">
                      {navigator.onLine ? (
                        <p className="btn btn-success btn-sm">
                          <MdOutlineSignalWifiStatusbarNull className="text-xl bg-white rounded" />{" "}
                          Active
                        </p>
                      ) : (
                        <p className="btn btn-error btn-sm">
                          <MdSignalWifiStatusbarConnectedNoInternet className="text-xl bg-red-900 rounded" />
                          In-Active
                        </p>
                      )}
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <PiTrainRegionalThin className="text-xl rounded bg-white" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        <strong>Continent:</strong>
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold dark:text-white">
                      {userTimeZone}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <PiTrainRegionalThin className="text-xl rounded bg-white" />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        <strong>District Name:</strong>
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold dark:text-white">
                      {districtName}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
