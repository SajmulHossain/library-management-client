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
import { usePostBookMutation } from "@/redux/api/bookApi/bookApi";
import type { IBook } from "@/types/book.type";
import { LoaderPinwheel } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { toast } from "sonner";

export type BookType = Omit<IBook, "_id" | "available">;

const AddBook = () => {
  const [postBook, { isLoading, isSuccess }] = usePostBookMutation();
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<BookType>();
  const onSubmit = async (body: BookType) => {
    if (isSuccess) {
      toast("Book posted successfully", { icon: "🤝" });
    } else {
      toast("Something went wrong", { icon: "❌" });
    }
    await postBook(body);
  };

  return (
    <section className="section max-w-xl">
      <Heading
        heading={pathname.includes("add-book") ? "Add Book" : "Edit Book"}
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
            type="text"
            placeholder="Author"
            {...register("author", { required: true, minLength: 3 })}
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
                <Select onValueChange={field.onChange} value={field.value}>
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
                    <SelectItem value="FICTION">FICTION</SelectItem>
                    <SelectItem value="NON_FICTION">NON_FICTION</SelectItem>
                    <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                    <SelectItem value="HISTORY">HISTORY</SelectItem>
                    <SelectItem value="BIOGRAPHY">BIOGRAPHY</SelectItem>
                    <SelectItem value="FANTASY">FANTASY</SelectItem>
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
            type="text"
            placeholder="ISBN"
            {...register("isbn", { required: true, min: 8 })}
          />
          {errors.isbn && (
            <span className="text-red-700">ISBN is required</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label>Description</Label>
          <Textarea placeholder="Description" {...register("description")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Copies</Label>
          <Input
            className={
              errors.copies ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            type="number"
            placeholder="Copies"
            {...register("copies", {
              required: true,
              min: 1,
              valueAsNumber: true,
            })}
          />
          {errors.copies && (
            <span className="text-red-700">{"Copies is required"}</span>
          )}
        </div>

        <Button disabled={isLoading} type="submit">
          {pathname.includes("add-book") ? "Add Book" : "Edit Book"}
          {isLoading && <LoaderPinwheel className="animate-spin" />}
        </Button>
      </form>
    </section>
  );
};

export default AddBook;
