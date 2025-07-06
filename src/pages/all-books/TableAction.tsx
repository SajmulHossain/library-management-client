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
import { Book, Edit, MenuIcon, Trash2Icon } from "lucide-react";
import { useNavigate } from "react-router";

type IProps = {
  id: string;
};

const TableAction = ({ id }: IProps) => {
  const navigate = useNavigate();
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
          <DropdownMenuCheckboxItem>
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button variant="destructive">
                    Delete Book <Trash2Icon />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when
                      you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
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
