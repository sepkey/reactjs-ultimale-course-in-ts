import { Dispatch } from "redux";
import { AccountActions, AccountState, RootState } from "../../type";

const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurposes: "",
  isLoading: false,
};

export default function accountReducer(
  state = initialAccountState,
  action: AccountActions
): AccountState {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurposes: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurposes: "",
        balance: state.balance - state.loan,
      };
    case "account/convertingCurrency":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

type Currency = {
  amount: number;
  base: string;
  date: String;
  rates: { USD: number };
};

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

export function withdraw(amount: number): AccountActions {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount: number, purpose: string): AccountActions {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function payLoan(): AccountActions {
  return { type: "account/payLoan" };
}
