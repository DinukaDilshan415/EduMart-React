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
import GuestRoute from "../SessionCheck/GuestRoute";
import ProtectedRoute from "../SessionCheck/ProtectedRoute";
import AdminLoginPage from "../Admin/AdminLoginPage";
import AdminVerificationPage from "../Admin/AdminVerificationPage";
import AdminProtectedRoute from "../SessionCheck/AdminProtectedRoute";
import AdminGuestRoute from "../SessionCheck/AdminGuestRoute";


const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
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
    element: (
      <ProtectedRoute>
        <MyAccount />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      //<AdminProtectedRoute>
        <AdminDashboard />
      //</AdminProtectedRoute>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <AdminGuestRoute>
      <AdminLoginPage />
      </AdminGuestRoute>
    ),
  }, {
    path: "/admin/verification",
    element: (
      <AdminVerificationPage />
    ),
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
    element: (
      <ProtectedRoute>
        <CheckOut />
      </ProtectedRoute>
    ),
  }

]);

const AppRouter = () => {
  return (<><RouterProvider router={router} /></>)
}

export default AppRouter