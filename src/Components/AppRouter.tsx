import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import VerifyAccount from "../EmailVerification/VerifyAccount";


const router = createBrowserRouter([
    {
      path: "/",
      Component: Login
    },
    {
      path: "/home",
      Component: Home
    },
    {
      path: "/Auth/VrifyAccount",
      Component: VerifyAccount
    }
  ]);

const AppRouter = () => {
    return (<><RouterProvider router={router} /></>)
}

export default AppRouter