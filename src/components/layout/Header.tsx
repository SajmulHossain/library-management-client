import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router";

import logo from "@/assets/logo.png";

type LinkType = {
  to: string;
  name: string;
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

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
      to: "/create-book",
      name: "Add Book",
    },
    {
      to: "/borrow-summary",
      name: "Borrow Summary",
    },
  ];

  return (
    <header
      className={`bg-black text-white top-0 z-50 ${
        pathname === "/" ? "fixed w-full" : "sticky"
      }`}
    >
      <section className="section flex justify-between items-center my-0 py-4">
        <div className="flex items-center gap-2 font-semibold italic">
          <img className="logo" src={logo} alt="logo" />
          <span>LitBase</span>
        </div>
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
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <MenuIcon stroke="black" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                side="left"
                className="w-56 overflow-hidden p-2"
              >
                <DropdownMenuLabel>Navbar</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <ul className="flex flex-col">
                  {links.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        onClick={() => setOpen(false)}
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
