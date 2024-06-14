import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Login from "../pages/Login";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import Registration from "../pages/Registration";
import PrivateRoute from "./private/PrivateRoute";
import AllProducts from "../pages/AllProducts";
import EditProducts from "../pages/EditProducts";
import EditProfile from "../pages/EditProfile";

import Profile from "../components/Profile/Profile";
import AllUser from "../pages/AllUser";
import ChnagePassword from "../pages/ChnagePassword";
import AllEvent from "../pages/AllEvent";
import EventDetails from "../pages/EventDetails";
import MyBooking from "../pages/MyBooking";
import PaymentFailed from "../components/payment/PaymentFailed";
import PaymentSuccess from "../components/payment/PaymentSuccess";
import AddToEvent from "../pages/AddToEvent";
import AllEventDashboard from "../pages/AllEventDashboard";
import UpdateEventData from "../pages/UpdateEventData";
import AllBookingEvents from "../pages/AllBookingEvents";
import AllPayment from "../pages/AllPayment";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allEvent",
        element: <AllEvent />,
      },
      {
        path: "/event_details/:id",
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/mybooking",
        element: (
          <PrivateRoute>
            <MyBooking />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/fail/:tranId",
        element: (
          <PrivateRoute>
            <PaymentFailed />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment/success/:tranId",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },

      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/profile/edit/:id",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_Server_Url}/user/get/${params.id}`),
      },
      {
        path: "/dashboard/all-products",
        element: (
          <PrivateRoute>
            <AllProducts />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/add-event",
        element: (
          <PrivateRoute>
            <AddToEvent />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allevent_dashboard",
        element: (
          <PrivateRoute>
            <AllEventDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/all-products/edit/:id",
        element: (
          <PrivateRoute>
            <EditProducts />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`${import.meta.env.VITE_Server_Url}/shoes/${params.id}`),
      },
      {
        path: "/dashboard/all_user",
        element: (
          <PrivateRoute>
            <AllUser />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/update_password",
        element: (
          <PrivateRoute>
            <ChnagePassword />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/updateEvent/:id",
        element: (
          <PrivateRoute>
            <UpdateEventData />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/alluser",
        element: (
          <PrivateRoute>
            <AllUser />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allbooking_event",
        element: (
          <PrivateRoute>
            <AllBookingEvents />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/allpayment",
        element: (
          <PrivateRoute>
            <AllPayment />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
