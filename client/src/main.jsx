import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import App from "./App.jsx";
import Signup from "./pages/SignupForm";
import Login from "./pages/LoginForm";
import Home from "./pages/Home";
import Booking from "./pages/AddClient";
import ProfileConfig from "./pages/ProfileConfig";
import BookingInfo from "./pages/BookingInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      { path: "/booking", element: <Booking /> },
      {
        path: "/config",
        element: <ProfileConfig />,
      },
      {
        path: "/bookinginfo/:id",
        element: <BookingInfo />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
