import App from "@/App";
import AddBook from "@/pages/add-book/AddBook";
import Books from "@/pages/all-books/Books";
import BorrowRequest from "@/pages/borrow-request/BorrowRequest";
import BorrowSummary from "@/pages/borrow-summary/BorrowSummary";
import RouteError from "@/pages/routeError/RouteError";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    ErrorBoundary: RouteError,
    children: [
      {
        path: "/books",
        Component: Books,
      },
      {
        path: "/create-book",
        Component: AddBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "/edit-book/:id",
        Component: AddBook,
      },
      {
        path: "/borrow/:bookId",
        Component: BorrowRequest,
      },
    ],
  },
]);

export default router;
