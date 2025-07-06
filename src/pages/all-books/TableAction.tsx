import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteBookMutation } from "@/redux/api/bookApi/bookApi";
import {
  Book,
  Edit,
  FileWarningIcon,
  LoaderIcon,
  MenuIcon,
  Trash2Icon,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

type IProps = {
  id: string;
};

const TableAction = ({ id }: IProps) => {
  const navigate = useNavigate();

  const [deleteBook, { isLoading }] = useDeleteBookMutation();

  const handleDelete = async () => {
    const data = await deleteBook(id);

    if (data?.data?.success) {
      toast("Book Deleted Successfully", { icon: "✅" });
    } else {
      toast("Could not delete", { icon: "❌" });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" side="left" className="w-full">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuCheckboxItem>
            <Button
              onClick={() => navigate(`/book/edit/${id}`)}
              className="w-full bg-green-700 hover:bg-green-800 text-white"
            >
              Edit Book <Edit />
            </Button>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem>
            <Button className="w-full">
              Borrow Book <Book />
            </Button>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem onSelect={(e) => e.preventDefault()}>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    Delete Book <Trash2Icon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                      <FileWarningIcon /> Delete Book?
                    </DialogTitle>
                    <DialogDescription>
                      Deleted book cannot be undone!
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      disabled={isLoading}
                      onClick={handleDelete}
                      variant="destructive"
                      type="submit"
                    >
                      Delete{" "}
                      {isLoading && <LoaderIcon className="animate-spin" />}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default TableAction;
