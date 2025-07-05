import { NavLink } from "react-router";
import { type DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { MenuIcon } from "lucide-react";

type LinkType = {
  to: string;
  name: string;
};

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Header = () => {
  const [showStatusBar, setShowStatusBar] = useState<Checked>(true);
  const [showActivityBar, setShowActivityBar] = useState<Checked>(false);
  const [showPanel, setShowPanel] = useState<Checked>(false);

  const links: LinkType[] = [
    {
      to: "/",
      name: "Home",
    },
    {
      to: "/books",
      name: "Books",
    },
    {
      to: "/add-book",
      name: "Add Book",
    },
  ];

  return (
    <header className="bg-black text-white">
      <section className="section flex justify-between items-center my-0 py-4">
        <h2>Library Management</h2>
        <nav>
          <ul className="hidden items-center sm:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-green-500 w-full h-full px-4 py-1 rounded-xs"
                      : "px-4 py-2 rounded-xs"
                  }
                  to={link.to}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <MenuIcon stroke="black" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="left" className="w-56 overflow-hidden p-2">
                <DropdownMenuLabel>Navbar</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ul className="flex flex-col">
                  {links.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? "bg-green-500 w-full h-full px-4 py-1 rounded-xs inline-block"
                            : "px-4 py-1 rounded-xs inline-block w-full"
                        }
                        to={link.to}
                      >
                        {link.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </section>
    </header>
  );
};

export default Header;
