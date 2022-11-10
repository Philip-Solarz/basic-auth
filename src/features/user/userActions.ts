import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";

// export interface User {
//   email: string;
//   // first_name: string;
//   // last_name: string;
// }

export interface LoginResponse {
  access_token: string;
  token_type: string;
  remember_me: boolean;
}
export interface SignupResponse {
  access_token: string;
  token_type: string;
}
export interface RefreshResponse {
  access_token: string;
  token_type: string;
}

export interface IdentifyResponse {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  isVerified: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: JSON.stringify(
          `grant_type=&username=${credentials.email}&password=${credentials.password}&scope=${credentials.rememberMe}&client_id=&client_secret=`
        ),
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }),
    }),
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: "/signup",
        method: "POST",
        body: {
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          email: credentials.email,
          password: credentials.password,
          confirm_password: credentials.confirmPassword,
        },
      }),
    }),
    identify: builder.mutation<IdentifyResponse, void>({
      query: () => ({
        url: "/identify",
        method: "GET",
      }),
    }),
    refresh: builder.mutation<RefreshResponse, void>({
      query: () => ({
        url: "/refresh",
        method: "GET",
      }),
    }),
    getVerificationCode: builder.mutation<void, void>({
      query: () => ({
        url: "/verify",
        method: "GET",
      }),
    }),
    postVerificationCode: builder.mutation<void, string>({
      query: (verificationCode) => ({
        url: "/verify",
        method: "POST",
        body: {
          verification_code: verificationCode,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useIdentifyMutation,
  useRefreshMutation,
  useGetVerificationCodeMutation,
  usePostVerificationCodeMutation,
} = api;
