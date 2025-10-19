import React from "react";
// import { useNavigate } from "react-router-dom";
// import { ShoppingCartIcon } from "@heroicons/react/24/outline";
// import { useSelector, useDispatch } from "react-redux";
// import { getCartProducts } from "../../Redux/cart/CartReducer";
// import { useEffect } from "react";

const Navbar = () => {
  // const dispatch = useDispatch();
  // const { cartProducts, loading } = useSelector((state) => state.cart);

  // const navigate = useNavigate();

  // const totalQuantity = cartProducts.length;

  // useEffect(() => {
  //   dispatch(getCartProducts());
  // }, [dispatch]);

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* <div className="flex gap-4">
        <button
          onClick={() => navigate("/products")}
          className="hover:bg-blue-700 px-3 py-1 rounded"
        >
          ShoppingCart
        </button>
        <button
          onClick={() => navigate("/products")}
          className="hover:bg-blue-700 px-3 py-1 rounded"
        >
          Step2
        </button>
        <button className="hover:bg-blue-700 px-3 py-1 rounded">Step3</button>
      </div>

      <div className="relative cursor-pointer">
        <ShoppingCartIcon
          onClick={() => navigate("/cartlist")}
          className="h-7 w-7 text-white"
        />
        {totalQuantity > 0 && (
          <span className="absolute -top-3 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            {totalQuantity}
          </span>
        )}
      </div> */}
      <h1 className="text-3xl"> User Management</h1>
    </nav>
  );
};

export default Navbar;
