import { Route, Routes } from "react-router-dom";

import { MainPage, LoginPage, SignUpPage, CategoryPage, ProductPage, ProductdetailsPage, CartPage, UserPage, TestPage } from "./pages/index";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/product" element={<ProductPage />} />
      <Route path="/productdetails" element={<ProductdetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/user" element={<UserPage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
};

export default App;
