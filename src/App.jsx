import "./App.css";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/register";
import Login from "./Components/Login/login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Cart from "./Components/ShoppingCart/Cart";
import ProductList from "./Components/Products/ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartList from "./Components/Products/CartList";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                {" "}
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token/:id" element={<ResetPassword />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                {" "}
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cartlist"
            element={
              <ProtectedRoute>
                <CartList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRoute>
                <ProductList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
