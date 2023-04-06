import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initValue = {
  cart: [],
  totalAmount: 0,
};

let user = { token: "" };

if (localStorage.getItem("user")) {
  user = JSON.parse(localStorage.getItem("user"));
}

const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${user.token}`,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initValue,
  reducers: {
    addItem: (state, action) => {
      const existItemIndex = state.cart.findIndex(
        (e: any) => e._id === action.payload._id
      );

      if (existItemIndex >= 0) {
        state.cart[existItemIndex].quantity += 1;
        state.totalAmount += state.cart[existItemIndex].price;
      } else {
        state.cart = [{ ...action.payload, quantity: 1 }, ...state.cart];
        state.totalAmount += action.payload.price;
      }

      console.log(JSON.parse(JSON.stringify(state)));

      axios.put(
        "http://localhost:5000/api/cart",
        JSON.parse(JSON.stringify(state)),
        config
      );
    },

    removeItem: (state, action) => {
      const existItemIndex = state.cart.findIndex(
        (e: any) => e._id === action.payload._id
      );

      if (state.cart[existItemIndex].quantity === 1) {
        state.cart = state.cart.filter((e, i) => i !== existItemIndex);
        state.totalAmount -= action.payload.price;
      } else {
        state.cart[existItemIndex].quantity -= 1;
        state.totalAmount -= action.payload.price;
      }
      axios.put(
        "http://localhost:5000/api/cart",
        JSON.parse(JSON.stringify(state)),
        config
      );
    },
  },
});

export const cartAction = cartSlice.actions;

export default cartSlice.reducer;
