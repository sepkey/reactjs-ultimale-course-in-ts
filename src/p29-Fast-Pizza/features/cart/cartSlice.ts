import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../models/models";
import { CartState } from "../../models/rtk-types";

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      //   const existedInx = state.cart.findIndex(
      //     (itm) => itm.pizzaId === action.payload.pizzaId,
      //   );
      //   if (existedInx === -1) {
      state.cart.push(action.payload);
      //   } else {
      //     state.cart[existedInx].quantity += 1;
      //   }
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cart.filter((itm) => itm.pizzaId !== action.payload);
    },
    increaceItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find(
        (itm) => itm.pizzaId === action.payload,
      ) as Item;
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    deccreaceItemQuantity(state, action: PayloadAction<number>) {
      const item = state.cart.find(
        (itm) => itm.pizzaId === action.payload,
      ) as Item;
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state, action: PayloadAction) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  clearCart,
  deccreaceItemQuantity,
  deleteItem,
  increaceItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
