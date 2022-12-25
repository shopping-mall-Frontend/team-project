import { Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { MainPage, LoginPage, SignUpPage, CategoryPage, ProductPage, ProductdetailsPage, CartPage, OrderPage, UserPage } from './pages/index';

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/product" element={<ProductPage products={products} setProducts={setProducts} />} />
      <Route path="/product/:id" element={<ProductdetailsPage cart={cart} setCart={setCart} />} />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      <Route path="/order" element={<OrderPage />} />
      <Route path="/user" element={<UserPage />} />
    </Routes>
  );
};

export default App;
