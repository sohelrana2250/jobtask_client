import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import SingleProduct from "../components/SingleProduct";
import LoadingSpinner from "../components/LoadingSpinner";

const AllEvent = () => {
  const {
    data: allevent = [],
    isLoading,
    error,
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
    refetchInterval: 30,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorPage />;
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-2">
        {!isLoading &&
          allevent?.data?.map((event, index) => (
            <SingleProduct key={index} event={event} />
          ))}
      </div>
    </>
  );
};

export default AllEvent;
