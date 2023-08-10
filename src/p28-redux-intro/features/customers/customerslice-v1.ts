import { CustomerActions, CustomerState } from "../../type";

const initialUserState: CustomerState = {
  createdAt: "",
  fullName: "",
  nationalId: "",
};

export default function customerReducer(
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

export function createCustomer(
  fullName: string,
  nationalId: string
): CustomerActions {
  return {
    type: "costumer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName: string): CustomerActions {
  return { type: "costumer/updateName", payload: fullName };
}
