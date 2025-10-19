import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import registerReducer from "./Redux/registration/registerReducer";
import loginReducer from "./Redux/login/loginReducer";
import forgetPasswordReducer from "./Redux/forgetpassword/forgetpasswordReducer";
import resetPasswordReducer from "./Redux/resetpassword/resetpasswordReducer";
import employeReducer from "./Redux/employee/EmployeReducer";
import cartReducer from "./Redux/cart/CartReducer";
import paymentReducer from "./Redux/payment/paymentReducer";
export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    forgetPassword: forgetPasswordReducer,
    resetPassword: resetPasswordReducer,
    employe: employeReducer,
    cart: cartReducer,
    payment: paymentReducer,
  },
});

export default store;
