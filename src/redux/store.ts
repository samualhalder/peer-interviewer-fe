import { configureStore } from "@reduxjs/toolkit";
import RequestReducer from "./requestsSlice";
import UserReducer from "./userSlice";

const store = configureStore({
  reducer: {
    requests: RequestReducer,
    user: UserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
