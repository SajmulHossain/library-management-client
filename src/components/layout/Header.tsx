import { NavLink } from "react-router";

type LinkType = {
  to: string;
  name: string;
};

const Header = () => {
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
          <ul className="flex items-center">
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
        </nav>
      </section>
    </header>
  );
};

export default Header;
