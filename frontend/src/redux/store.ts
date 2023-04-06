import { configureStore } from "@reduxjs/toolkit";
import authRedux from "./authRedux";
import cartRedux from "./cartRedux";

const store = configureStore({
  reducer: { cart: cartRedux, auth: authRedux },
});

export default store;
