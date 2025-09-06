import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import config from "../../../config";

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${config.hostname}/employe/create`,
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
      toast.error(error.response.data.msg);
      throw error;
    }
  }
);

export const getAllEmployees = createAsyncThunk(
  "employee/getAllEmployees",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${config.hostname}/employe/getemploye`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.msg);
      throw error;
    }
  }
);

export const editEmployee = createAsyncThunk(
  "employee/editEmployee",
  async ({ id, ...values }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${config.hostname}/employe/editEmployee/${id}`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      toast.error(error.response.data.msg);
      throw error;
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/deleteUser",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${config.hostname}/employe/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.msg);
      throw error;
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: null,
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
        state.employees.push(action.payload);
      })
      .addCase(createEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees;
      })
      .addCase(getAllEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employee = action.payload;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { clearState } = employeeSlice.actions;
export default employeeSlice.reducer;
