import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserToState: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUserToState } = userSlice.actions;
export default userSlice.reducer;
