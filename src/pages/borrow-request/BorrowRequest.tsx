import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetSingleBookQuery } from "@/redux/api/bookApi/bookApi";
import { usePostBorrowMutation } from "@/redux/api/borrowApi/borrowApi";
import { ChevronDownIcon, Loader, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

export interface IBorrowData {
  quantity: number;
  dueDate: Date;
  book: string;
}

const BorrowRequest = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dateError, setDateError] = useState("");
  const navigate = useNavigate();

  const { bookId } = useParams();

  const { data, isLoading } = useGetSingleBookQuery(bookId);
  const [postBorrow, { isLoading: isRequesting }] = usePostBorrowMutation();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBorrowData>();

  const onSubmit = async (body: IBorrowData) => {
    if (date! < new Date()) {
      return setDateError("Date should be greater than now");
    } else {
      setDateError("");
    }

    const { data } = await postBorrow({ ...body, book: bookId!, dueDate: date! });
    if(data?.success) {
      toast("Request sent successfully", {icon: '✅'});
      reset();
      navigate('/borrow-summary');
    } else {
      toast("Something went wrong!", {icon: '❌'});
    }
  };

  if (isLoading) {
    return (
      <section className="section flex items-center h-screen justify-center">
        <Loader2 className="animate-spin" size={44} />
      </section>
    );
  }

  return (
    <section className="section max-w-xl">
      <Heading heading="Borrow Book" paragraph={data?.data?.title} />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Quantity</span> <span>Available: {data?.data?.copies}</span>
          </div>
          <Input
            className={
              errors.quantity ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            type="number"
            placeholder="Quantity"
            {...register("quantity", {
              required: true,
              min: {
                value: 1,
                message: "Quantity should atleast 1",
              },
              max: {
                value: data?.data?.copies,
                message: `Quantity must less than or equal to available copies ${data?.data?.copies}`,
              },
              valueAsNumber: true,
            })}
          />
          {errors.quantity && (
            <span className="text-red-700">
              {errors.quantity.message || "Quantity is required"}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <Label htmlFor="date" className="px-1">
            Due Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date"
                className="justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                captionLayout="dropdown"
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
          {dateError && <span className="text-red-700">{dateError}</span>}
        </div>

        <Button disabled={isRequesting} type="submit">Submit Request {isRequesting && <Loader className="animate-spin" />}</Button>
      </form>
    </section>
  );
};

export default BorrowRequest;
