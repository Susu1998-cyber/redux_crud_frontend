// import React, { useEffect } from "react";
// import { Trash2 } from "lucide-react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getCartProducts,
//   deleteCartProducts,
//   createCart,
// } from "../../Redux/cart/CartReducer";
// import {
//   orderPayment,
//   verifyPayment,
// } from "../../Redux/payment/paymentReducer"; // add this
// import { useNavigate } from "react-router-dom";

// const CartPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { cartProducts } = useSelector((state) => state.cart);
//   const { order, loading } = useSelector((state) => state.payment);
//   console.log("order", order);

//   useEffect(() => {
//     dispatch(getCartProducts());
//   }, [dispatch]);

//   const increaseQty = (item) => {
//     dispatch(
//       createCart({
//         product: {
//           id: item.productId,
//           title: item.title,
//           price: item.priceAtPurchase,
//           thumbnail: item.thumbnail,
//         },
//         quantity: 1,
//       })
//     );
//   };

//   const decreaseQty = (item) => {
//     if (item.quantity > 1) {
//       dispatch(
//         createCart({
//           product: {
//             id: item.productId,
//             title: item.title,
//             price: item.priceAtPurchase,
//             thumbnail: item.thumbnail,
//           },
//           quantity: -1,
//         })
//       );
//     }
//   };

//   const removeItem = async (productId) => {
//     try {
//       await dispatch(deleteCartProducts(productId)).unwrap();
//     } catch (err) {
//       console.error("Failed to remove product:", err);
//     }
//   };

//   const subTotal = cartProducts.reduce(
//     (sum, item) => sum + item.priceAtPurchase * item.quantity,
//     0
//   );

//   // 🧠 Razorpay Handler
//   const handlePayment = async () => {
//     if (subTotal <= 0) return;

//     // Step 1: Create order in backend
//     const result = await dispatch(orderPayment(subTotal)).unwrap();

//     if (!result) {
//       console.error("Failed to create Razorpay order");
//       return;
//     }

//     // Step 2: Open Razorpay checkout
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Public Razorpay key
//       amount: result.amount,
//       currency: result.currency,
//       name: "Trendz Shopping",
//       description: "Order Payment",
//       order_id: result.id,
//       handler: async function (response) {
//         // Step 3: Verify payment after success
//         await dispatch(
//           verifyPayment({
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           })
//         );
//       },
//       prefill: {
//         name: "Customer Name",
//         email: "customer@example.com",
//         contact: "9876543210",
//       },
//       theme: {
//         color: "#7e22ce",
//       },
//     };

//     const razorpay = new window.Razorpay(options);
//     razorpay.open();
//   };

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-6">Cart</h1>

//       <div className="grid lg:grid-cols-3 gap-8">
//         {/* Cart Items */}
//         <div className="lg:col-span-2">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="border-b text-left">
//                 <th className="pb-3">Product</th>
//                 <th className="pb-3">Price</th>
//                 <th className="pb-3">Quantity</th>
//                 <th className="pb-3">Subtotal</th>
//                 <th className="pb-3"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {cartProducts.map((item) => (
//                 <tr key={item._id} className="border-b">
//                   <td className="py-3 flex items-center gap-3">
//                     <img
//                       src={item.thumbnail}
//                       alt={item.name}
//                       className="w-12 h-12 rounded"
//                     />
//                     <span className="text-blue-600 font-medium">
//                       {item.name || item.title}
//                     </span>
//                   </td>
//                   <td className="py-3">${item.priceAtPurchase.toFixed(2)}</td>
//                   <td className="py-3">
//                     <div className="flex items-center rounded">
//                       <button
//                         onClick={() => decreaseQty(item)}
//                         className="px-2 py-1 hover:bg-gray-200"
//                       >
//                         -
//                       </button>
//                       <span className="px-3">{item.quantity}</span>
//                       <button
//                         onClick={() => increaseQty(item)}
//                         className="px-2 py-1 hover:bg-gray-200"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td className="py-3 font-semibold">
//                     ${(item.priceAtPurchase * item.quantity).toFixed(2)}
//                   </td>
//                   <td className="py-3 text-red-500 cursor-pointer">
//                     <Trash2
//                       onClick={() => removeItem(item.productId)}
//                       className="w-5 h-5"
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div className="flex justify-between mt-6">
//             <button
//               onClick={() => navigate("/products")}
//               className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 cursor-pointer"
//             >
//               Continue Shopping
//             </button>
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="border p-6 rounded-lg shadow-md h-fit">
//           <h2 className="text-lg font-semibold mb-4">Order Details</h2>
//           <div className="flex justify-between mb-2">
//             <span>Sub Total</span>
//             <span>${subTotal.toFixed(2)}</span>
//           </div>
//           <div className="flex justify-between mb-2">
//             <span>Tax</span>
//             <span>$0</span>
//           </div>
//           <div className="flex justify-between font-bold text-lg mb-4">
//             <span>Total Amount</span>
//             <span>${subTotal.toFixed(2)}</span>
//           </div>

//           <button
//             onClick={handlePayment}
//             disabled={loading}
//             className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
//           >
//             {loading ? "Processing..." : `Pay ₹${subTotal}`}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CartPage;


import React, { useEffect } from "react";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCartProducts,
  deleteCartProducts,
  createCart,
} from "../../Redux/cart/CartReducer";
import {
  orderPayment,
  verifyPayment,
} from "../../Redux/payment/paymentReducer"; // add this
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartProducts } = useSelector((state) => state.cart);
  const { order, loading } = useSelector((state) => state.payment);
  console.log("order", order);

  const userId = localStorage.getItem("userId")
  console.log("userid",userId);
  

  useEffect(() => {
    dispatch(getCartProducts());
  }, [dispatch]);

  const increaseQty = (item) => {
    dispatch(
      createCart({
        product: {
          id: item.productId,
          title: item.title,
          price: item.priceAtPurchase,
          thumbnail: item.thumbnail,
        },
        quantity: 1,
      })
    );
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      dispatch(
        createCart({
          product: {
            id: item.productId,
            title: item.title,
            price: item.priceAtPurchase,
            thumbnail: item.thumbnail,
          },
          quantity: -1,
        })
      );
    }
  };

  const removeItem = async (productId) => {
    try {
      await dispatch(deleteCartProducts(productId)).unwrap();
    } catch (err) {
      console.error("Failed to remove product:", err);
    }
  };

  const subTotal = cartProducts.reduce(
    (sum, item) => sum + item.priceAtPurchase * item.quantity,
    0
  );

  // 🧠 Razorpay Handler
 

  // 🧾 Verify Razorpay Payment after success
const handleVerification = async (response, order, amount) => {
  try {
    const verifyRes = await axios.post(`${config.hostname}/payment/verify`, {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      userId: localStorage.getItem("userId"), // ✅ get from localStorage
      amount,
    });

    if (verifyRes.data.success) {
      toast.success("✅ Payment verified & saved!");
      navigate("/orders"); // redirect to orders page after success
    } else {
      toast.error("❌ Payment verification failed!");
    }
  } catch (err) {
    toast.error("Error verifying payment");
  }
};

// 🧠 Razorpay Handler
const handlePayment = async () => {
  if (subTotal <= 0) return;

  // Step 1: Create order in backend
  const result = await dispatch(orderPayment({ amount: subTotal })).unwrap();

  if (!result) {
    console.error("Failed to create Razorpay order");
    return;
  }

  // Step 2: Open Razorpay checkout
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // your public key
    amount: result.amount,
    currency: result.currency,
    name: "Trendz Shopping",
    description: "Order Payment",
    order_id: result.id,
    handler: async function (response) {
      // Step 3: Verify payment
      await handleVerification(response, result, subTotal);
    },
    prefill: {
      name: "Customer Name",
      email: "customer@example.com",
      contact: "9876543210",
    },
    theme: {
      color: "#7e22ce",
    },
  };

  const razorpay = new window.Razorpay(options);
  razorpay.open();
};



  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="pb-3">Product</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Quantity</th>
                <th className="pb-3">Subtotal</th>
                <th className="pb-3"></th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-3 flex items-center gap-3">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-12 h-12 rounded"
                    />
                    <span className="text-blue-600 font-medium">
                      {item.name || item.title}
                    </span>
                  </td>
                  <td className="py-3">${item.priceAtPurchase.toFixed(2)}</td>
                  <td className="py-3">
                    <div className="flex items-center rounded">
                      <button
                        onClick={() => decreaseQty(item)}
                        className="px-2 py-1 hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="px-3">{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item)}
                        className="px-2 py-1 hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="py-3 font-semibold">
                    ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                  </td>
                  <td className="py-3 text-red-500 cursor-pointer">
                    <Trash2
                      onClick={() => removeItem(item.productId)}
                      className="w-5 h-5"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => navigate("/products")}
              className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="border p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Details</h2>
          <div className="flex justify-between mb-2">
            <span>Sub Total</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Tax</span>
            <span>$0</span>
          </div>
          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Total Amount</span>
            <span>${subTotal.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
          >
            {loading ? "Processing..." : `Pay ₹${subTotal}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

