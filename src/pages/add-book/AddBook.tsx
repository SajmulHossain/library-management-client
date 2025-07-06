import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  useGetSingleBookQuery,
  usePostBookMutation,
  useUpdateBookMutation,
} from "@/redux/api/bookApi/bookApi";
import type { IBook } from "@/types/book.type";
import { LoaderCircleIcon, LoaderPinwheel } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import NetError from "../net error page/NetError";

export type BookType = Omit<IBook, "_id" | "available">;

const AddBook = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    data,
    isLoading: isFetching,
    isError,
  } = useGetSingleBookQuery(id, {
    skip: !(pathname.includes("edit") && id),
  });
  const [postBook, { isLoading }] = usePostBookMutation();
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookType>();

  useEffect(() => {
    if (data?.data?.genre) {
      reset({
        genre: data.data.genre,
      });
    }
  }, [data?.data?.genre, reset]);

  const onSubmit = async (body: BookType) => {
    if (pathname.includes("create-book")) {
      const data = await postBook(body);
      if (data?.data?.success) {
        toast("Book posted successfully", { icon: "🤝" });
        navigate("/books");
      } else {
        toast("Something Went Wrong", { icon: "❌" });
      }
    } else {
      const { data } = await updateBook({ body, id });
      if (data?.success) {
        toast("Book edited successfully", { icon: "🤝" });
        navigate("/books")
      } else {
        toast(data?.message || "Something Went Wrong", { icon: "❌" });
      }
    }
  };

  if (isError) {
    return <NetError />;
  }

  return isFetching ? (
    <div className="min-h-screen flex justify-center items-center">
      <LoaderCircleIcon className="animate-spin" size={48} />
    </div>
  ) : (
    <section className="section max-w-xl">
      <Heading
        heading={pathname.includes("create-book") ? "Add Book" : "Edit Book"}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Label>Title</Label>
          <Input
            className={
              errors.title ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            type="text"
            placeholder="Title"
            defaultValue={data?.data?.title}
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-red-700">Title is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Author</Label>
          <Input
            className={
              errors.author ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            defaultValue={data?.data?.author}
            type="text"
            placeholder="Author"
            {...register("author", { required: true, minLength: {value: 3, message: 'Author name must atleast 3 characters'} })}
          />
          {errors.author && (
            <span className="text-red-700">
              {errors.author.message || "Author is required"}
            </span>
          )}
        </div>
        <div>
          <FormField
            control={control}
            rules={{ required: true }}
            name="genre"
            render={({ field }) => (
              <>
                <Label className="mb-2">Genre</Label>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  defaultValue={data?.data?.genre || ""}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent
                    className={
                      errors.genre
                        ? "border-red-500 focus-visible:ring-red-500"
                        : ""
                    }
                  >
                    <SelectItem value="FICTION">Fiction</SelectItem>
                    <SelectItem value="NON_FICTION">Non Fiction</SelectItem>
                    <SelectItem value="SCIENCE">Science</SelectItem>
                    <SelectItem value="HISTORY">History</SelectItem>
                    <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                    <SelectItem value="FANTASY">Fantasy</SelectItem>
                  </SelectContent>
                </Select>
              </>
            )}
          />
          {errors.genre && (
            <span className="text-red-700">Genre is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>ISBN</Label>
          <Input
            className={
              errors.isbn ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            defaultValue={data?.data?.isbn}
            type="text"
            placeholder="ISBN"
            {...register("isbn", { required: true })}
          />
          {errors.isbn && (
            <span className="text-red-700">ISBN is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <Textarea
            placeholder="Description"
            defaultValue={data?.data?.description}
            {...register("description")}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Copies</Label>
          <Input
            className={
              errors.copies ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            defaultValue={data?.data?.copies}
            type="number"
            placeholder="Copies"
            {...register("copies", {
              required: true,
              min: {
                value: 1,
                message: 'Copies must be greater than 0'
              },
              valueAsNumber: true,
            })}
          />
          {errors.copies && (
            <span className="text-red-700">{errors.copies.message || "Copies is required"}</span>
          )}
        </div>

        <Button disabled={isLoading || isUpdating} type="submit">
          {pathname.includes("create-book") ? "Add Book" : "Edit Book"}
          {(isLoading || isUpdating) && (
            <LoaderPinwheel className="animate-spin" />
          )}
        </Button>
      </form>
    </section>
  );
};

export default AddBook;
