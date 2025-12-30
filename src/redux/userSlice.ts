import { UserType } from "@/types/entity.types";
import { createSlice } from "@reduxjs/toolkit";

interface UserStateType {
  user: UserType | null;
}

const initialState: UserStateType = {
  user: null,
};

const userSlice = createSlice({
  name: "user-slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setUserField: (state, action) => {
      state.user = { ...(state?.user ?? {}), ...action.payload };
    },
  },
});

export const { setUser, removeUser, setUserField } = userSlice.actions;

export default userSlice.reducer;
