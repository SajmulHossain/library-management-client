import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { useGetStateQuery } from "@/redux/api/bookApi/bookApi";
import { setIndex, setState } from "@/redux/features/book/bookSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import type { RootState } from "@/redux/store";
import { useEffect } from "react";
import PaginationLoader from "./PaginationLoader";

const BookPagination = () => {
  const { count, currentIndex } = useAppSelector(
    (state: RootState) => state.books
  );
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetStateQuery(currentIndex);

  useEffect(() => {
    dispatch(setState(data?.data));
  }, [dispatch, data?.data]);

  let totalPage = 0;
  if (!isLoading && !isNaN(count)) {
    totalPage = Math.ceil(count / 10);
  }
  const pageArr = Array(totalPage || 1).fill(undefined);

  return isLoading ? (
    <PaginationLoader />
  ) : (
    <Pagination className="mt-4">
      <PaginationContent>
        <PaginationItem className="mr-7">
          <PaginationLink>
            <Button
              disabled={currentIndex === 1}
              onClick={() => dispatch(setIndex(currentIndex - 1))}
              variant={"outline"}
            >
              Previous
            </Button>
          </PaginationLink>
        </PaginationItem>
        {pageArr.map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink>
              <Button
                variant={index + 1 === currentIndex ? "default" : "outline"}
                onClick={() => dispatch(setIndex(index + 1))}
              >
                {index + 1}
              </Button>
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem className="ml-4">
          <PaginationLink>
            <Button
              disabled={currentIndex >= totalPage}
              onClick={() => dispatch(setIndex(currentIndex + 1))}
              variant={"outline"}
            >
              Next
            </Button>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default BookPagination;
