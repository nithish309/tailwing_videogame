import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Details from "./Details"; // Import the Details component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/details", // Route for game details with dynamic ID
        element: <Details />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;
export default Router;
