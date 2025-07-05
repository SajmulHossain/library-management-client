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
import { useForm } from "react-hook-form";
import * as z from "zod/v4";
const AddBook = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const bookTypes = z.object({
      title: z.string(),
      author: z.string(),
      isbn: z.string(),
      genre: z.enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "FANTASY",
      ]),
      description: z.string().optional(),
      copies: z.number().min(1),
    });
    const copies = parseInt(data.copies);

    const book = bookTypes.parse({...data, copies});
    console.log(book);
  };
  return (
    <section className="section max-w-xl">
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
            {...register("author", { required: true, min: 3 })}
          />
          {errors.author && (
            <span className="text-red-700">Author is required</span>
          )}
        </div>
        <div>
          <FormField
            control={control}
            rules={{ required: true }}
            name="genre"
            render={({ field }) => (
              <>
                <Label>Genre</Label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent
                    className={
                      errors.title
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
          <Textarea placeholder="Description" {...register} />
        </div>
        <div className="flex flex-col gap-2">
          <Label>Copies</Label>
          <Input
            className={
              errors.copies ? "border-red-500 focus-visible:ring-red-500" : ""
            }
            type="number"
            placeholder="Copies"
            {...register("copies", { required: true, min: 1 })}
          />
          {errors.copies && (
            <span className="text-red-700">Copies is required</span>
          )}
        </div>

        <Button type="submit">Add Book</Button>
      </form>
    </section>
  );
};

export default AddBook;
