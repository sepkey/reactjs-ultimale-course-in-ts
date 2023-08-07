type AccountState = {
  balance: number;
  loan: number;
  loanPurposes: string;
};
type AccountActions =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { purpose: string; amount: number };
    }
  | { type: "account/payLoan" };

const initialAccountState = {
  balance: 0,
  loan: 0,
  loanPurposes: "",
};

export default function accountReducer(
  state = initialAccountState,
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

export function deposit(amount: number): AccountActions {
  return { type: "account/deposit", payload: amount };
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
