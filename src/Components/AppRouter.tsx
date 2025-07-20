import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import VerifyAccount from "../EmailVerification/VerifyAccount";
import MyAccount from "../MyAccount/MyAccount";


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
    },
    {
      path: "/home/myaccount",
      Component: MyAccount
    }
  ]);

const AppRouter = () => {
    return (<><RouterProvider router={router} /></>)
}

export default AppRouter