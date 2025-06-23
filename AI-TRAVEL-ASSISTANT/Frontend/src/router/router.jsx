import { createBrowserRouter } from "react-router-dom";
import App from '../App';
import CreatetrIP from './../components/create-trip/CreatetrIP';
import RootLayout from "../components/layout/RootLayout"; // Import the new layout component
import ViewTrip from "../components/view-trip/[tripId]/ViewTrip";
import MyTrips from "../components/my-trips/MyTrips";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Use the layout component for the root path
    children: [ // Define child routes that will render inside the layout's Outlet
      {
        index: true, // This makes App the default child route for "/"
        element: <App />,
      },
      {
        path: "create-trip", // Note: child paths are relative
        element: <CreatetrIP />,
      },
      {
        path: "/view-trip/:tripId", // Note: child paths are relative
        element: <ViewTrip/>,
      },
       {
        path: "/MyTrips", // Note: child paths are relative
        element: <MyTrips/>,
      },
      

      // Add more routes here as children
    ],
  },
]);

export default router;