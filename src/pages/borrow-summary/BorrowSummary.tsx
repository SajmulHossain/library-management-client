import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookDataLoader from "../all-books/BookDataLoader";
import type { ISummary } from "@/types/summary.type";
import NetError from "../net error page/NetError";
import { useGetBorrowStatesQuery } from "@/redux/api/bookApi/bookApi";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowStatesQuery(undefined);
  const summaries = data?.data || [...Array(6)];

if(isError) {
  return <NetError />
}

  return (
    <section className="section">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">ISBN</TableHead>
            <TableHead className="text-center">Total Quantity</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summaries.map((summary: ISummary, index: number) =>
            isLoading ? (
              <BookDataLoader key={index} />
            ) : (
              <TableRow key={index}>
                <TableCell className="text-center">
                  {summary?.book?.title}
                </TableCell>
                <TableCell className="text-center">
                  {summary?.book?.isbn}
                </TableCell>
                <TableCell className="text-center">
                  {summary.totalQuantity}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </section>
  );
};

export default BorrowSummary;
