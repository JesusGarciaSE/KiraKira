import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage.tsx";
import LoginPage from "./Pages/LoginPage/LoginPage.tsx";
import SignupPage from "./Pages/SignupPage/SignupPage.tsx";
import CollectionsPage from "./Pages/CollectionsPage/CollectionsPage.tsx";
import CartPage from "./Pages/CartPage/CartPage.tsx";
import CheckoutResultPage from "./Pages/CheckoutPage/CheckoutResultPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage className="flex-1 w-screen" />,
      },
      {
        path: "/signup",
        element: <SignupPage className="flex-1 w-screen" />,
      },
      {
        path: "/product/:category",
        element: <CollectionsPage route="product" />,
      },
      {
        path: "/sale",
        element: <CollectionsPage route="sale" />,
      },
      {
        path: "/new",
        element: <CollectionsPage route="new" />,
      },
      {
        path: "/cart",
        element: <CartPage className="flex-1 w-screen" />,
      },
      {
        path: "/checkout/:status",
        element: <CheckoutResultPage className="flex-1 w-screen" />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
