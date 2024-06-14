import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const { error, status } = useRouteError();
  //const loading = window.location.reload();

  return (
    <div className="container flex flex-col justify-center items-center h-screen text-center py-32">
      <h1 className=" text-7xl font-extrabold mb-8">Error {status || 404}</h1>
      <p className="lg:text-3xl">{error?.message}</p>
      <div className="flex justify-center">
        <button className="btn bg-red-500 text-white mt-8">
          <Link to="/">HomePage</Link>
        </button>
        <button className="btn bg-red-500 text-white mt-8">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
