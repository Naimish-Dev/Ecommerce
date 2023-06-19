import React from "react";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import Error from "./Pages/Error";
import Success from "./Pages/Success"
import AllProducts from "./Pages/AllProducts";
import Checkout from "./Pages/Checkout"
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const App = () => {

  const { userdata } = useSelector((store) => store.user);
 var userdata2=false
 if (userdata) {
   userdata2=true;
 }
  return (
    <>
      <Routes>
        <Route
          path="/log-in"
          element={userdata2 ? <Navigate replace to={"/"} /> : <Login />}
        ></Route>

        <Route
          path="/sign-Up"
          element={userdata2 ? <Navigate replace to={"/"} /> : <Register />}
        ></Route>

        <Route path="/" element={<Home />}></Route>
        <Route path="/products/:category" element={<ProductList />}></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/products" element={<AllProducts />}></Route>
        <Route
          path="/cart"
          element={userdata2 ? <Cart /> : <Navigate replace to={"/log-in"} />}
        ></Route>
        <Route
          path="/checkout"
          element={
            userdata2 ? <Checkout /> : <Navigate replace to={"/log-in"} />
          }
        ></Route>
        <Route path="/success" element={<Success />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </>
  );
};

export default App;
