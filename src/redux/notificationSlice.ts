import { NotificationsTypes } from "@/types/notification.types";
import { createSlice } from "@reduxjs/toolkit";

interface NotificationSliceType {
   count: number,
   notifications: NotificationsTypes[]
}
const initialState: NotificationSliceType = {
  count: 0,
  notifications:[]
};

const notificationSlice = createSlice({
  name: "notification-slice",
  initialState,
  reducers: {
    add: (state,action) => {
      let preNoticications=state.notifications
      const newNoticication=action.payload
      preNoticications=[newNoticication,...preNoticications]
      state.notifications=preNoticications
      state.count += 1;
    },
    addByNumber: (state, action) => {
      state.count = action.payload;
    },
    remove: (state,action) => {
        state.notifications.forEach((noti)=>{
            if(noti.id===action.payload && noti.seen==false){
                noti.seen=true
                state.count -= 1;
            }
      })
    },
    set: (state, action) => {
      state.count = action.payload.count;
      state.notifications=action.payload.notifications
    },
  },
});

export const { add, remove, addByNumber, set } = notificationSlice.actions;

export default notificationSlice.reducer;
