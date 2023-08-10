import { createSlice } from "@reduxjs/toolkit";
import type { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { AccountActions, Currency, Loan } from "../../type";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurposes: "",
  isLoading: false,
};
const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action: PayloadAction<number>) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action: PayloadAction<number>) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount: number, purpose: string) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action: PayloadAction<Loan>) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurposes = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurposes = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { payLoan, requestLoan, withdraw } = accountSlice.actions;

export function deposit(
  amount: number,
  currency: string
): AccountActions | ((dispatch: Dispatch) => void) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch: Dispatch) {
    dispatch({ type: "account/convertingCurrency" });
    const host = "api.frankfurter.app";
    const res = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = (await res.json()) as Currency;
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export default accountSlice.reducer;
