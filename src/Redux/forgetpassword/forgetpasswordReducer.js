import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../config";

// Async thunk for forgot password
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.hostname}/auth/forgot-password`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  }
);

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        toast.success("Password reset email sent!");
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { clearState } = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;
