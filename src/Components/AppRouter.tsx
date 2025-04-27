import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";


const router = createBrowserRouter([
    {
      path: "/",
      Component: Login
    },
    {
      path: "/home",
      Component: Home
    }
  ]);

const AppRouter = () => {
    return (<>return <RouterProvider router={router} /></>)
}

export default AppRouter