import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  createdAt: "",
  fullName: "",
  nationalId: "",
};

const customerSlice = createSlice({
  initialState,
  name: "customer",
  reducers: {
    createCustomer: {
      prepare(fullName: string, nationalId: string) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(
        state,
        action: PayloadAction<{
          fullName: string;
          nationalId: string;
          createdAt: string;
        }>
      ) {
        state.createdAt = action.payload.createdAt;
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
      },
    },
    updateName(state, action: PayloadAction<string>) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;
