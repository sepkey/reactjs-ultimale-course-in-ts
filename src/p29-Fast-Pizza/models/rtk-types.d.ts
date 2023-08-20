import { Item } from "./models";

export type UserState = {
  username: string;
};
export type CartState = {
  cart: Item[];
};
// export type AccountActions =
//   | { type: "account/deposit"; payload: number }
//   | { type: "account/withdraw"; payload: number }
//   | {
//       type: "account/requestLoan";
//       payload: { purpose: string; amount: number };
//     }
//   | { type: "account/payLoan" }
//   | { type: "account/convertingCurrency" };

export type RootState = {
  user: UserState;
  cart: CartState;
};
