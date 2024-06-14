import { useLoaderData } from "react-router-dom";
import Accordian from "../components/home/Accordian";
import Banner from "../components/home/Banner";
import Products from "../components/home/Products";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorPage from "./ErrorPage";

const Home = () => {
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
    <div>
      <Banner />
      <Products data={allevent?.data} />
      <Accordian />
    </div>
  );
};

export default Home;
