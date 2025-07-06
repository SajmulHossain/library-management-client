import App from "@/App";
import AddBook from "@/pages/add-book/AddBook";
import Books from "@/pages/all-books/Books";
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
        path: "/add-book",
        Component: AddBook,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
      {
        path: "/book/edit/:id",
        Component: AddBook,
      },
    ],
  },
]);

export default router;
