import { createStore } from "redux";
type State = {
  balance: number;
  loan: number;
  loanPurposes: string;
};
type Actions =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { purpose: string; amount: number };
    }
  | { type: "account/payLoan" };
const initialState = {
  balance: 0,
  loan: 0,
  loanPurposes: "",
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
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
    default:
      return state;
  }
}

const store = createStore(reducer);
store.dispatch({ type: "account/deposit", payload: 500 });
store.dispatch({ type: "account/withdraw", payload: 300 });

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 100000, purpose: "buy a car" },
});
store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
