import React, { useEffect, useState } from "react";
import Navbar from "../Header/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { createCart, getCartProducts } from "../../Redux/cart/CartReducer"; // adjust path
import { toast } from "react-toastify";

const ProductList = () => {
  const dispatch = useDispatch();
  const { cartProducts, loading } = useSelector((state) => state.cart);
  console.log("Cart Products:", cartProducts);
  
  const [products, setProducts] = useState([]);

  // Fetch products from dummyjson
  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=10")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  // Fetch cart on component mount
  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  const handleAddCart = async (product) => {
    try {
      await dispatch(
        createCart({  product, quantity: 1 })
      ).unwrap();
    } catch (err) {
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Products</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl shadow-md p-4 flex flex-col"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
              <p className="text-gray-600 text-sm flex-grow">
                {product.description.slice(0, 60)}...
              </p>
              <p className="font-bold text-indigo-600 mt-2">${product.price}</p>
              <button
                onClick={() => handleAddCart(product)}
                className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-300 transition cursor-pointer"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductList;
