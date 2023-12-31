export type AccountState = {
  balance: number;
  loan: number;
  loanPurposes: string;
  isLoading: boolean;
};
export type AccountActions =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { purpose: string; amount: number };
    }
  | { type: "account/payLoan" }
  | { type: "account/convertingCurrency" };

export type CustomerState = {
  fullName: string;
  nationalId: string;
  createdAt: string;
};

export type CustomerActions =
  | {
      type: "costumer/createCustomer";
      payload: { fullName: string; nationalId: string; createdAt: string };
    }
  | { type: "costumer/updateName"; payload: string };

export type RootState = {
  account: AccountState;
  customer: CustomerState;
};

export type Loan = {
  purpose: string;
  amount: number;
};

export type Currency = {
  amount: number;
  base: string;
  date: String;
  rates: { USD: number };
};
