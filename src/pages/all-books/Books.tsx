import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllBooksQuery } from "@/redux/api/bookApi/bookApi";
import type { IBook } from "@/types/book.type";
import { BookData } from "./BookData";
import BookDataLoader from "./BookDataLoader";
import BookPagination from "./BookPagination";
import { useAppSelector } from "@/redux/hook";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/Heading";
import NetError from "../net error page/NetError";

const Books = () => {
  const { currentIndex } = useAppSelector((state) => state.books);
  const { data, isLoading, isError } = useGetAllBooksQuery(currentIndex);

  const { data: books = [...Array(10)] } = data || {};

  if (isError) {
    return <NetError />;
  }

  return (
    <section className="section">
      <Heading heading="All Books" paragraph="See All Books" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] text-center">Title</TableHead>
            <TableHead className="text-center">Author</TableHead>
            <TableHead className="text-center">Genre</TableHead>
            <TableHead className="text-center">ISBN</TableHead>
            <TableHead className="text-center">Copies</TableHead>
            <TableHead className="text-center">Availability</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book: IBook, index: number) =>
            isLoading ? (
              <BookDataLoader key={index} />
            ) : (
              <BookData key={book?._id} book={book} />
            )
          )}
        </TableBody>
      </Table>
      <Separator />
      <BookPagination />
    </section>
  );
};

export default Books;
