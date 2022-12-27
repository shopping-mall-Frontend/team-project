import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import {
  MainPage,
  LoginPage,
  SignUpPage,
  CategoryPage,
  ProductPage,
  ProductdetailsPage,
  CartPage,
  UserPage,
  Payment,
} from './pages/index';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <Routes>
      <Route
        path="/"
        element={<MainPage products={products} setProducts={setProducts} />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route
        path="/product"
        element={<ProductPage products={products} setProducts={setProducts} />}
      />
      <Route
        path="/product/:id"
        element={<ProductdetailsPage cart={cart} setCart={setCart} />}
      />
      <Route
        path="/cart"
        element={<CartPage cart={cart} setCart={setCart} />}
      />
      <Route path="/user" element={<UserPage />} />
      <Route path="/payment/:id" element={<Payment />} />
    </Routes>
  );
};

export default App;
