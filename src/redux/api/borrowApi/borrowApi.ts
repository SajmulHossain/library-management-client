import type { IBorrowData } from "@/pages/borrow-request/BorrowRequest";
import type { IPostResponse } from "@/types/postResponse.type";
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
    postBorrow: builder.mutation<IPostResponse, IBorrowData>({
      query: (body) => ({
        url: '/borrow',
        method: 'POST',
        body
      })
    })
  }),
});

export const { useGetStatesQuery, usePostBorrowMutation } = borrowApi;
