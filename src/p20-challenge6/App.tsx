import { useReducer } from "react";

type State = {
  balance: number;
  loan: number;
  isActive: boolean;
};

type OpenAccount = {
  type: "open-account";
};
type Deposit = {
  type: "deposit";
  payload: number;
};
type Withdraw = {
  type: "withdraw";
  payload: number;
};
type RequestLoan = {
  type: "request-loan";
  payload: number;
};
type PayLoan = {
  type: "pay-back-loan";
};
type CloseAccount = {
  type: "close-account";
};
type Action =
  | OpenAccount
  | Deposit
  | Withdraw
  | RequestLoan
  | PayLoan
  | CloseAccount;

const initialState: State = {
  balance: 0,
  loan: 0,
  isActive: false,
};

function reducer(state: State, action: Action): State {
  if (!state.isActive && action.type !== "open-account") {
    return state;
  }
  switch (action.type) {
    case "open-account":
      return { ...state, isActive: true, balance: 500 };
    case "deposit":
      return { ...state, balance: state.balance + action.payload };
    case "withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "request-loan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload,
        balance: state.balance + action.payload,
      };
    case "pay-back-loan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
      };
    case "close-account":
      if (state.balance !== 0 || state.loan > 0) {
        return state;
      }
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isActive, balance, loan } = state;
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "open-account" })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "request-loan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "pay-back-loan" })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "close-account" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
