import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout()
      .then(() => {
        localStorage.setItem("token", "");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>

            {!user && (
              <>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/register"}>Register</Link>
                </li>
              </>
            )}
            {user && (
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            )}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="btn bg-red-500 text-white"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
        {/* https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIqCWcdviBkgGkQEJquVvb0hVLm0IBFA91PKC6GTBzyzRWKr1G62Y9YeZKWyl_zqNFSAE&usqp=CAU */}
        <div className="avatar">
          <div className="w-10 rounded">
            <img src="https://cdn.dribbble.com/users/2398989/screenshots/6597610/presentation_dark2.jpg" />
          </div>
        </div>
        <a className="btn btn-ghost text-xl font-serif">Air Index</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
          <li>
            <Link to={"/allEvent"}>All Event</Link>
          </li>

          {!user && (
            <>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to={"/mybooking"}>My Booking</Link>
              </li>
              <li>
                <Link to={"/dashboard"}>Dashboard</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end space-x-2">
        {/* <div className="avatar">
          <div className="w-12 rounded-full border-2 border-black">
            <img src={user?.photoURL || "/public/placeholder.jpg"} />
          </div>
        </div> */}
        <label
          htmlFor="my-drawer-2"
          tabIndex={2}
          className="btn btn-ghost lg:hidden"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                alt=""
                src={
                  user?.photoURL ||
                  "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
                }
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link className="justify-between" to="/profile">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a href="...">setting</a>
            </li>
            <li>
              {user && (
                <button
                  onClick={handleLogout}
                  className="btn btn-sm bg-red-500 text-white hidden lg:block"
                >
                  Logout
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
