import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetStatesQuery } from "@/redux/api/borrowApi/borrowApi";
import BookDataLoader from "../all-books/BookDataLoader";
import type { ISummary } from "@/types/summary.type";

const BorrowSummary = () => {
  const { data, isLoading } = useGetStatesQuery(undefined);
  const summaries = data?.data || [...Array(6)];

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
