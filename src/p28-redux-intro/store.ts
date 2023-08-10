import accountReducer from "./features/accounts/accountsSlice";
import customerReducer from "./features/customers/customerslice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: { account: accountReducer, customer: customerReducer },
});
export default store;
