import { createSlice } from "@reduxjs/toolkit";

interface RequestsType {
  isNewRequests: number;
}
const initialState: RequestsType = {
  isNewRequests: 0,
};

const requestsSlice = createSlice({
  name: "request-slice",
  initialState,
  reducers: {
    add: (state) => {
      state.isNewRequests += 1;
    },
    addByNumber: (state, action) => {
      state.isNewRequests += action.payload;
    },
    remove: (state) => {
      state.isNewRequests -= 1;
    },
    set: (state, action) => {
      state.isNewRequests = action.payload;
    },
  },
});

export const { add, remove, addByNumber, set } = requestsSlice.actions;

export default requestsSlice.reducer;
