import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../config";

// --- Email/Password login ---
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${config.hostname}/auth/login`, data, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // { token, user }
    } catch (error) {
      const msg =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        "Login failed";
      return rejectWithValue(msg);
    }
  }
);

// --- Google login ---
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async ({ idToken }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${config.hostname}/auth/google`, {
        idToken,
      });
      return data; // { token, user }
    } catch (error) {
      const msg =
        error.response?.data?.message || "Google login failed";
      return rejectWithValue(msg);
    }
  }
);

const initialToken = localStorage.getItem("token");

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    token: initialToken || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // email/password
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        axios.defaults.headers.common["Authorization"] = action.payload.token;

        toast.success("Login successful!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      // google
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("token", action.payload.token);
        axios.defaults.headers.common["Authorization"] = action.payload.token;

        toast.success("Login successful!");
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { logout } = loginSlice.actions;
export default loginSlice.reducer;
