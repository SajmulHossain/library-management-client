import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const BookDataLoader = () => {
    return (
        <TableRow>
            <TableCell colSpan={7}>
                <Skeleton className="h-12 w-full bg-gray-400" />
            </TableCell>
        </TableRow>
    );
};

export default BookDataLoader;