import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../../models/models";
import { CartState, RootState } from "../../models/rtk-types";

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<number>) {
      state.cart = state.cart.filter((itm) => itm.pizzaId !== action.payload);
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

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
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

export const getUsername = (state: RootState) => state.user.username;

export const getCart = (state: RootState) => state.cart.cart;

export const getTotalCartQuantity = (state: RootState) =>
  state.cart.cart.reduce((sum, cur) => cur.quantity + sum, 0);

export const getCurrentQuantityById = (id: number) => (state: RootState) =>
  state.cart.cart.find((itm) => itm.pizzaId === id)?.quantity ?? 0;

export const getTotalCartPrice = (state: RootState) =>
  state.cart.cart.reduce((sum, cur) => cur.totalPrice + sum, 0);

//   const existedInx = state.cart.findIndex(
//     (itm) => itm.pizzaId === action.payload.pizzaId,
//   );
//   if (existedInx === -1) {
//   } else {
//     state.cart[existedInx].quantity += 1;
//   }
