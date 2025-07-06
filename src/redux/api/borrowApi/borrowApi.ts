import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  tagTypes: ["borrows-summary"],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.PROD
      ? import.meta.env.VITE_PROD_API
      : import.meta.env.VITE_DEVELOPMENT_API,
  }),
  endpoints: (builder) => ({
    getStates: builder.query({
      query: () => "/borrow",
      providesTags: ["borrows-summary"],
    }),
  }),
});

export const { useGetStatesQuery } = borrowApi;
