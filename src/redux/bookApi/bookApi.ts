import type { BookType } from "@/pages/add-book/AddBook";
import type { IPostResponse } from "@/types/postResponse.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  tagTypes : ["books"],
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://library-management-omega-green.vercel.app/api/books",
    baseUrl: "http://localhost:3000/api/books"
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "",
      providesTags: ["books"]
    }),
    postBook: builder.mutation<BookType, Partial<BookType>, IPostResponse>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body: body
      }),
      invalidatesTags: ["books"],
    })
  }),
});

export const { useGetAllBooksQuery, usePostBookMutation } = bookApi;
