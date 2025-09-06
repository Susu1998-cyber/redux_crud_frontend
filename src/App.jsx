import "./App.css";
import Home from "./Components/Home/Home";
import Register from "./Components/Register/register";
import Login from "./Components/Login/login";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import Cart from "./Components/ShoppingCart/Cart";
import Google from "./Components/Googlelogin/google";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/resetpassword/:token/:id" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/google" element={<Google />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
