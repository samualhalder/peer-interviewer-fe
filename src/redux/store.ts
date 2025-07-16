import { configureStore } from "@reduxjs/toolkit";
import RequestReducer from "./requestsSlice";
import UserReducer from "./userSlice";
import NotificationReducer from './notificationSlice'

const store = configureStore({
  reducer: {
    requests: RequestReducer,
    user: UserReducer,
    notifications: NotificationReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
