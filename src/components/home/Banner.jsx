import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="h-1/2">
        <div className="hero min-h-screen bg-[url('https://www.radiustheme.com/wp-content/uploads/2023/11/Best-Event-Website-Template.png')]">
          <button
            onClick={() => navigate("/allEvent")}
            className=" mt-80  btn btn-outline  btn-md rounded-full bg-black  text-white"
          >
            Show Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
