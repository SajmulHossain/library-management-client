import App from "@/App";
import AddBook from "@/pages/add-book/AddBook";
import Books from "@/pages/all-books/Books";
import BorrowSummary from "@/pages/borrow-summary/BorrowSummary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: '/',
        Component: App,
        children: [
            {
                path: '/books',
                Component: Books
            },
            {
                path: '/add-book',
                Component: AddBook
            },
            {
                path: '/borrow-summary',
                Component: BorrowSummary
            }
        ]
    }
])

export default router;