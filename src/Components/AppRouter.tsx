import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../Login/Login";
import Home from "../Home/Home";
import VerifyAccount from "../EmailVerification/VerifyAccount";
import MyAccount from "../MyAccount/MyAccount";
import AdminDashboard from "../Admin/AdminDashboard";
import SingleProductView from "../Product/SingleProductView";
import Cart from "../Cart/Cart";
import Search from "../ProductSearch/Search";
import CheckOut from "../Checkout/CheckOut";


const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login
  },
  {
    path: "/",
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
    Component: SingleProductView
  },
  {
    path: "/product/cart",
    Component: Cart
  },
  {
    path: "/product/search",
    Component: Search
  }
  ,
  {
    path: "/product/cart/checkout",
    Component: CheckOut
  }

]);

const AppRouter = () => {
  return (<><RouterProvider router={router} /></>)
}

export default AppRouter