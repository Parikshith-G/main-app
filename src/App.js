import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProductDetails from "./components/product/ProductDetails";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import React, { Fragment, useEffect, useState } from "react";
import { loadUser } from "./actions/userActions";

import store from "./store";
import axios from "axios";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import Dashboard from "./components/admin/Dashboard";
import ProductsList from "./components/admin/ProductsList";
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from "./components/admin/UpdateProduct";
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from "./components/admin/ProcessOrder";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";
import ProductReviews from "./components/admin/ProductReviews";
import { useSelector } from "react-redux";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");

      setStripeApiKey(data.stripeApiKey);
    }
    getStripApiKey();
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Header />

        <div className="container container-fluid">
          <Routes>
            <Route path="/" element={<Home />}></Route>

            <Route path="/search/:keyword" element={<Home />}></Route>
            <Route path="/product/:id" element={<ProductDetails />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/password/forgot" element={<ForgotPassword />}></Route>
            <Route
              path="/password/reset/:token"
              element={<NewPassword />}
            ></Route>

            <Route path="/cart" element={<Cart />}></Route>
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/order/confirm"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/success"
              element={
                <ProtectedRoute>
                  <OrderSuccess />
                </ProtectedRoute>
              }
            ></Route>
            {stripeApiKey && (
              <Route
                path="/payment"
                element={
                  <Elements stripe={loadStripe(stripeApiKey)}>
                    <Payment />
                  </Elements>
                }
              />
            )}
            <Route
              path="/me"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/orders/me"
              element={
                <ProtectedRoute>
                  <ListOrders />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <OrderDetails />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/me/update"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/password/update"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            ></Route>

            <Route
              path="/dashboard"
              isAdmin={true}
              element={
                <ProtectedRoute>
                  {" "}
                  <Dashboard />{" "}
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/products"
              isAdmin={true}
              element={
                <ProtectedRoute>
                  {" "}
                  <ProductsList />{" "}
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/product"
              isAdmin={true}
              element={
                <ProtectedRoute>
                  {" "}
                  <NewProduct />{" "}
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/product/:id"
              isAdmin={true}
              element={
                <ProtectedRoute>
                  {" "}
                  <UpdateProduct />{" "}
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/orders"
              isAdmin={true}
              element={
                <ProtectedRoute>
                  {" "}
                  <OrdersList />{" "}
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/order/:id"
              isAdmin={true}
              element={
                <ProtectedRoute>
                  {" "}
                  <ProcessOrder />{" "}
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/users"
              isAdmin={true}
              element={
                <ProtectedRoute>
                  {" "}
                  <UsersList />{" "}
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/user/:id"
              isAdmin={true}
              element={
                <ProtectedRoute>
                  {" "}
                  <UpdateUser />{" "}
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
            <Route
              path="/admin/reviews"
              isAdmin={true}
              element={
                <ProtectedRoute>
                  {" "}
                  <ProductReviews />{" "}
                </ProtectedRoute>
              }
            >
              {" "}
            </Route>
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
