import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import auth from "./slice/authSlice";
import onBoarding from "./slice/onBoardingSlice";


const rootReducer = combineReducers({
  auth,
  onBoarding,

});
const store = configureStore({
  reducer: rootReducer,
});
export default store;