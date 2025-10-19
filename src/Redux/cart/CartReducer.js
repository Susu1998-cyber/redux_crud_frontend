import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../config";

// Add product to cart
export const createCart = createAsyncThunk(
  "cart/createCart",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${config.hostname}/cart/add`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Product added to cart!");
      return response.data; // backend returns full cart
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Get all cart products
export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${config.hostname}/cart/getcart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data; // backend returns full cart
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to fetch cart");
      return rejectWithValue(err.response?.data);
    }
  }
);

// Remove product from cart
export const deleteCartProducts = createAsyncThunk(
  "cart/deleteCartProducts",
  async (productId, { rejectWithValue }) => {
    console.log("Removing product with ID (thunk):", productId);
    
    try {
      const response = await axios.delete(
        `${config.hostname}/cart/remove/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Delete response:", response.data);
      toast.success("Product removed from cart!");
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to remove product");
      return rejectWithValue(err.response?.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    cartProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearState: (state) => {
      state.cart = null;
      state.cartProducts = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add to cart
      .addCase(createCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload.cart?.items || [];
      })
      .addCase(createCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get cart
      .addCase(getCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload.items || [];
      })
      .addCase(getCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete from cart
      .addCase(deleteCartProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.cartProducts = action.payload.items || [];
      })
      .addCase(deleteCartProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearState } = cartSlice.actions;

export default cartSlice.reducer;
