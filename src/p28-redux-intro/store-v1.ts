import { combineReducers, createStore } from "redux";
type AccountState = {
  balance: number;
  loan: number;
  loanPurposes: string;
};
type CustomerState = {
  fullName: string;
  nationalId: string;
  createdAt: string;
};
type AccountActions =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { purpose: string; amount: number };
    }
  | { type: "account/payLoan" };

type CustomerActions =
  | {
      type: "costumer/createCustomer";
      payload: { fullName: string; nationalId: string; createdAt: string };
    }
  | { type: "costumer/updateName"; payload: string };

const initialBankState = {
  balance: 0,
  loan: 0,
  loanPurposes: "",
};
const initialUserState: CustomerState = {
  createdAt: "",
  fullName: "",
  nationalId: "",
};

export function accountReducer(
  state = initialBankState,
  action: AccountActions
): AccountState {
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

function customerReducer(
  state = initialUserState,
  action: CustomerActions
): CustomerState {
  switch (action.type) {
    case "costumer/createCustomer":
      const { createdAt, fullName, nationalId } = action.payload;
      return { ...state, createdAt, fullName, nationalId };

    case "costumer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/withdraw", payload: 300 });

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 100000, purpose: "buy a car" },
// });
// store.dispatch({ type: "account/payLoan" });
// console.log(store.getState());

function deposit(amount: number): AccountActions {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount: number): AccountActions {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount: number, purpose: string): AccountActions {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan(): AccountActions {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
store.dispatch(requestLoan(10000, "Buying house"));
store.dispatch(payLoan());

function createCustomer(fullName: string, nationalId: string): CustomerActions {
  return {
    type: "costumer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName: string): CustomerActions {
  return { type: "costumer/updateName", payload: fullName };
}

store.dispatch(createCustomer("Sepide Kia", "8978g"));
console.log(store.getState());
