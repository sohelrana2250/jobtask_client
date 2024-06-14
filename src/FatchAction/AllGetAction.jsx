import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
const AllGetAction = (url) => {
  const token = localStorage.getItem("token");
  const {
    data = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
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
  return {
    isLoading,
    error,
    data,
    refetch,
  };
};

export default AllGetAction;
