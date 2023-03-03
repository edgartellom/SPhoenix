import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    username: null,
    email: null,
    admin: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.admin = action.payload.admin;
    },
    clearUser: (state) => {
      state.id = null;
      state.username = null;
      state.email = null;
      state.admin = null;
    },
    postUser: async (state, action) => {
      await axios.post("/users", action.payload);
    },
  },
});

export const { setUser, clearUser, postUser } = userSlice.actions;
export default userSlice.reducer;
