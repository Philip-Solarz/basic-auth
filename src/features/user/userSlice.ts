import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
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
  rememberMe: boolean;
};

type TokenState = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  is_verified: boolean;
};

const initialUserState: UserState = {
  firstName: null,
  lastName: null,
  email: null,
  isAuthenticated: false,
  isVerified: false,
  token: null,
  rememberMe: false,
};

let initialUserLocalState = initialUserState;
const localToken = localStorage.getItem("token");
if (localToken) {
  const user: TokenState = jwt_decode(localToken);
  initialUserLocalState = {
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    isAuthenticated: true,
    isVerified: user.is_verified,
    token: localToken,
    rememberMe: true,
  };
}

let initialUserSessionState = initialUserState;
const sessionToken = sessionStorage.getItem("token");
if (sessionToken) {
  const user: TokenState = jwt_decode(sessionToken);
  initialUserSessionState = {
    firstName: user.first_name,
    lastName: user.last_name,
    email: user.email,
    isAuthenticated: true,
    isVerified: user.is_verified,
    token: sessionToken,
    rememberMe: false,
  };
}

export const logout = createAction("user/logout");

const userSlice = createSlice({
  name: "user",
  initialState: localToken
    ? initialUserLocalState
    : sessionToken
    ? initialUserSessionState
    : initialUserState,
  reducers: {
    // logout
    // logout: () => {}, //remove token from sessionStorage as well or it won't work
  },
  extraReducers: (builder) => {
    builder.addCase(logout, (state) => {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      return initialUserState;
    });
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        const user: TokenState = jwt_decode(payload.access_token);
        state.firstName = user.first_name;
        state.lastName = user.last_name;
        state.email = user.email;
        state.isAuthenticated = true;
        state.isVerified = user.is_verified;
        state.token = payload.access_token;
        if (payload.remember_me) {
          localStorage.setItem("token", payload.access_token);
          state.rememberMe = payload.remember_me;
        }
        sessionStorage.setItem("token", payload.access_token);
      }
    );
    builder.addMatcher(
      api.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        const user: TokenState = jwt_decode(payload.access_token);
        state.firstName = user.first_name;
        state.lastName = user.last_name;
        state.email = user.email;
        state.isAuthenticated = true;
        state.isVerified = user.is_verified;
        state.token = payload.access_token;
        sessionStorage.setItem("token", payload.access_token);
      }
    );
    builder.addMatcher(
      api.endpoints.refresh.matchFulfilled,
      (state, { payload }) => {
        const user: TokenState = jwt_decode(payload.access_token);
        state.firstName = user.first_name;
        state.lastName = user.last_name;
        state.email = user.email;
        state.isAuthenticated = true;
        state.isVerified = user.is_verified;
        state.token = payload.access_token;
        if (state.rememberMe) {
          localStorage.setItem("token", payload.access_token);
        }
        sessionStorage.setItem("token", payload.access_token);
      }
    );
    builder.addMatcher(api.endpoints.refresh.matchRejected, () => {
      sessionStorage.removeItem("token");
      localStorage.removeItem("token");
      return initialUserState;
    });
    builder.addMatcher(
      api.endpoints.postVerificationCode.matchFulfilled,
      (state) => {
        state.isVerified = true;
      }
    );
  },
});

// export const { logout } = userSlice.actions;

export default userSlice;

export const selectCurrentUser = (state: RootState) => state.user;
