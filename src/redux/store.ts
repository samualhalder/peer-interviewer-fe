import { configureStore } from "@reduxjs/toolkit";
import RequestReducer from "./requestsSlice";

const store = configureStore({
  reducer: {
    requests: RequestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
