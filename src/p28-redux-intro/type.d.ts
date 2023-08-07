export type AccountState = {
  balance: number;
  loan: number;
  loanPurposes: string;
};
export type AccountActions =
  | { type: "account/deposit"; payload: number }
  | { type: "account/withdraw"; payload: number }
  | {
      type: "account/requestLoan";
      payload: { purpose: string; amount: number };
    }
  | { type: "account/payLoan" };

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
