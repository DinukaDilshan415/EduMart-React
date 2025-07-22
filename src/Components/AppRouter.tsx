import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import VerifyAccount from "../EmailVerification/VerifyAccount";
import MyAccount from "../MyAccount/MyAccount";
import AdminDashboard from "../Admin/AdminDashboard";
import ProductViewPage from "../Product/ProductViewPage";


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
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard
  },
    {
    path: "/singleproduct",
    Component: ProductViewPage
  },
]);

const AppRouter = () => {
  return (<><RouterProvider router={router} /></>)
}

export default AppRouter