import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";
import type { IBook } from "@/types/book.type";
import TableAction from "./TableAction";

interface IProps {
  book: IBook;
}

export function BookData({ book }: IProps) {
  const { title, author, available, copies, genre, isbn, _id } = book || {};

  return (
    <>
      <TableRow className="text-center">
        <TableCell className="font-medium">{title}</TableCell>
        <TableCell className="font-medium">{author}</TableCell>
        <TableCell className="text-center">{genre}</TableCell>
        <TableCell className="text-center">{isbn}</TableCell>
        <TableCell>{copies}</TableCell>
        <TableCell>
          <Badge
            variant={!available ? "destructive" : "default"}
            className={`${available ? "bg-green-700" : "bg-destructive"} `}
          >
            {available ? "Available" : "Not Available"}
          </Badge>
        </TableCell>
        <TableCell className="text-center">
          <TableAction id={_id} />
        </TableCell>
      </TableRow>
    </>
  );
}
