import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../models/models";
import { CartState } from "../../models/rtk-types";

const initialState: CartState = {
  cart: [
    { pizzaId: 123, name: "testy", quantity: 2, unitPrice: 21, totalPrice: 42 },
  ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.cart.push(action.payload);
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
    decreaseItemQuantity(state, action: PayloadAction<number>) {
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
  decreaseItemQuantity: deccreaceItemQuantity,
  deleteItem,
  increaceItemQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

//   const existedInx = state.cart.findIndex(
//     (itm) => itm.pizzaId === action.payload.pizzaId,
//   );
//   if (existedInx === -1) {
//   } else {
//     state.cart[existedInx].quantity += 1;
//   }
