import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { api } from "./userActions";
import jwt_decode from "jwt-decode";
type UserState = {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  token: string | null;
};

const initialUserState: UserState = {
  firstName: null,
  lastName: null,
  email: null,
  isAuthenticated: false,
  isVerified: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logout: (state) => {
      state = initialUserState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        const user: UserState = jwt_decode(payload.token);
        state.firstName = user.firstName;
        state.lastName = user.lastName;
        state.email = user.email;
        state.isAuthenticated = true;
        state.isVerified = user.isVerified;
        state.token = user.token;
      }
    );
    builder.addMatcher(
      api.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        const user: UserState = jwt_decode(payload.token);
        state.firstName = user.firstName;
        state.lastName = user.lastName;
        state.email = user.email;
        state.isAuthenticated = true;
        state.isVerified = user.isVerified;
        state.token = user.token;
      }
    );
  },
});

export const { logout } = userSlice.actions;

export default userSlice;

export const selectCurrentUser = (state: RootState) => state.user;
