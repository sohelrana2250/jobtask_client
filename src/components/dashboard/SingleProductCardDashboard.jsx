/* eslint-disable react/prop-types */
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
// eslint-disable-next-line react/prop-types
const SingleProductCardDashboard = ({ shoe, onDelete }) => {
  const token = localStorage.getItem("token");
  const { _id, title, brand, price, description, image_url } = shoe;

  const handleDelete = async () => {
    Swal.fire({
      title: "Do you want to Deleted?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await fetch(`${import.meta.env.VITE_Server_Url}/shoes/${_id}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then(() => {
            toast.success("Product Deleted");
            onDelete(_id);
          });
        Swal.fire("Delete!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not Delete", "", "info");
      }
    });
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="avatar">
        <img src={image_url} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <h3 className="text-xl font-serif">#Brand {brand}</h3>
        <h3 className="text-xl font-serif">#Price{price}</h3>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn bg-indigo-500 text-white">
            <Link to={`/products/${_id}`}>See details</Link>
          </button>
          <button className="btn bg-green-600 text-white">
            <Link to={`edit/${_id}`}>Edit</Link>
          </button>
          <button onClick={handleDelete} className="btn bg-red-500 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCardDashboard;
