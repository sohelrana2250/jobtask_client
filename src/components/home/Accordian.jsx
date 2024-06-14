import { useNavigate } from "react-router-dom";

const Accordian = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1">
        <a href="...">
          <img
            className="w-full h-full object-cover"
            src="https://static7.depositphotos.com/1073943/729/i/450/depositphotos_7292670-stock-photo-conference.jpg"
            alt=""
          />
        </a>
        <a href="...">
          <img
            className="w-full h-full object-cover"
            src="https://ahaslides.com/wp-content/uploads/2023/07/SEO3799-thumb.png"
            alt=""
          />
        </a>
        <a href="...">
          <img
            className="w-full h-full object-cover"
            src="https://www.vfairs.com/wp-content/uploads/2023/06/Articles-Guides-9.jpg"
            alt=""
          />
        </a>
      </div>

      <br />
      <div className="hero  ">
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold text-black">
              NEW ARRIVALS Event Management
            </h1>
            <p className="mb-5 text-xl  text-black">
              Futuring the Air Force 1 Pro Tech
            </p>
            <button
              onClick={() => navigate("/allEvent")}
              className="  btn btn-outline  btn-md rounded-xl bg-black  text-white"
            >
              SHOW
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Accordian;
