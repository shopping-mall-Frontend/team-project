import { Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import { MainPage, LoginPage, SignUpPage, CategoryPage, ProductPage, ProductdetailsPage, CartPage, UserPage, TestPage } from "./pages/index";

const App = () => {
  const [products, setProducts] = useState([]);
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/product" element={<ProductPage products={products} setProducts={setProducts} />} />
      <Route path="/product/:id" element={<ProductdetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default App;
