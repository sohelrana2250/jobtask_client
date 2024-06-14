import toast from "react-hot-toast";

const PutAction = (url, selectedSpecialties, refetch) => {
  fetch(url, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(selectedSpecialties),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("API ERROR");
      }
      return res.json();
    })
    .then((data) => {
      if (!!data) {
        toast.success("Update Successfully");
        refetch();
      }
    })
    .catch((error) => {
      toast.error(error?.message);
    });
};

export default PutAction;
