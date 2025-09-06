import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import registerReducer from "./Redux/registration/registerReducer";
import loginReducer from "./Redux/login/loginReducer";
import forgetPasswordReducer from "./Redux/forgetpassword/forgetpasswordReducer";
import resetPasswordReducer from "./Redux/resetpassword/resetpasswordReducer";
import employeReducer from "./Redux/employee/EmployeReducer";
export const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
    forgetPassword: forgetPasswordReducer,
    resetPassword: resetPasswordReducer,
    employe: employeReducer,
  },
});

export default store;
