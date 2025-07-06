import type { IBook } from "./book.type";

export interface IPostResponse {
  success: boolean;
  message: string;
  data?: IBook;
}
