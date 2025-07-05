import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  tagTypes : ["books"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-omega-green.vercel.app/api/books",
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "",
      providesTags: ["books"]
    }),
  }),
});

export const { useGetAllBooksQuery } = bookApi;
