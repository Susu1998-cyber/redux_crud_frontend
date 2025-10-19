import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../config"; // adjust if needed

// 1️⃣ Create Razorpay order
 export const orderPayment = createAsyncThunk(
  "order/orderPayment",
  async ({ amount }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.hostname}/payment/order`,
        { amount },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.msg || "Payment order creation failed");
      throw error;
    }
  }
);


// 2️⃣ Verify payment after Razorpay response
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.hostname}/payment/verify`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.msg || "Payment verification failed");
      return rejectWithValue(error.response?.data?.msg || "Error verifying payment");
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    order: null,
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.order = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ORDER PAYMENT
      .addCase(orderPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(orderPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(orderPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // VERIFY PAYMENT
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        toast.success("Payment verified successfully!");
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;
