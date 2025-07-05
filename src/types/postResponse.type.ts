import type { IBook } from "./book.type";

export interface IPostResponse {
  data: { success: boolean; message: string; data?: IBook };
}