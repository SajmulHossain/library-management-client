import type { BookType } from "@/pages/add-book/AddBook";
import type { IBorrowData } from "@/pages/borrow-request/BorrowRequest";
import type { IPostResponse } from "@/types/postResponse.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  tagTypes: ["books", "states", "borrows-summary"],
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://library-management-omega-green.vercel.app/api/books",
    baseUrl: import.meta.env.PROD
      ? import.meta.env.VITE_PROD_API
      : import.meta.env.VITE_DEVELOPMENT_API,
  }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: (index) => `/books?skip=${index - 1}`,
      providesTags: ["books"],
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["books"],
    }),
    postBook: builder.mutation<IPostResponse, Partial<BookType>, IPostResponse>(
      {
        query: (body) => ({
          url: "/books",
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["books", "states"],
      }
    ),
    getState: builder.query({
      query: () => "/books/states",
      providesTags: ["states"],
    }),
    updateBook: builder.mutation<
      IPostResponse,
      Partial<{ body: BookType; id: string }>
    >({
      query: ({ body, id }) => ({
        url: `/books/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["books", "states"],
    }),
    deleteBook: builder.mutation<IPostResponse, Partial<string>>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books", "states"],
    }),
    getBorrowStates: builder.query({
      query: () => "/borrow",
      providesTags: ["borrows-summary"],
    }),
    postBorrow: builder.mutation<IPostResponse, IBorrowData>({
      query: (body) => ({
        url: "/borrow",
        method: "POST",
        body,
      }),
      invalidatesTags: ['books', 'borrows-summary'],
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  usePostBookMutation,
  useGetStateQuery,
  useGetSingleBookQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  usePostBorrowMutation,
  useGetBorrowStatesQuery
} = bookApi;
