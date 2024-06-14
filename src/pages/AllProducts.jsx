import { useEffect, useState } from "react";
import SingleProductCardDashboard from "../components/dashboard/SingleProductCardDashboard";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    price: "",
  });
  useEffect(() => {
    fetch(`${import.meta.env.VITE_Server_Url}/shoes`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDeleteProduct = (id) => {
    setProducts(products.filter((product) => product._id !== id));
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div>
      <div className="container mx-auto p-6 font-mono">
        <div className="flex items-center justify-center">
          <select
            name="brand"
            onChange={handleFilterChange}
            className="rounded-l-xl bg-pink-500 h-14"
          >
            <option disabled={true} value="">
              Brand Name
            </option>
            <option value="">All</option>
            {products?.map((v, index) => (
              <option key={index} value={v?.brand}>
                {v?.brand}
              </option>
            ))}
          </select>
          <select
            name="price"
            onChange={handleFilterChange}
            className="rounded-r-sm bg-pink-500 h-14"
          >
            <option disabled={true} value="">
              Price Range
            </option>
            <option value="">All</option>
            {products?.map((v, index) => (
              <option key={index} value={v?.price}>
                {v?.price}
              </option>
            ))}
          </select>
          <input
            type="search"
            id="default-search"
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-r-lg focus:ring-blue-500 focus:border-blue-500 bg-blue-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Find User Product / Product Name"
            required
          />
        </div>
      </div>
      <div className="my-16 flex flex-wrap gap-4">
        {products
          .filter((shoe) => {
            const matchedSearch =
              search === "" ||
              shoe?.title?.toLowerCase()?.includes(search?.toLowerCase());
            const matchedBrand =
              filters.brand === "" ||
              shoe?.brand?.toLowerCase() === filters?.brand?.toLowerCase();
            const matchedPrice =
              filters.price === "" || shoe?.price === Number(filters?.price);
            return matchedSearch && matchedBrand && matchedPrice;
          })
          .map((shoe) => (
            <SingleProductCardDashboard
              key={shoe.id}
              shoe={shoe}
              onDelete={handleDeleteProduct}
            />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
