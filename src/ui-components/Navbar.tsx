import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Moon, Menu, X, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoginDropDown from "./Login_DropDown";

const navItems = [
  {
    id: 1,
    name: "Explore",
    link: "/explore",
  },
  {
    id: 2,
    name: "Favorites",
    link: "/favorites",
  },
  {
    id: 3,
    name: "Compare",
    link: "/compare",
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  return (
    <nav className="mb-5">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex gap-10">
          <Link
            to="/"
            className="text-3xl font-bold text-[#2563EB] transition-opacity hover:opacity-80"
          >
            Voyage
          </Link>
          <ul className=" items-center gap-6 hidden md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `relative pb-1 text-sm font-medium transition-colors duration-300
                    ${
                      isActive
                        ? "text-[#2563EB]"
                        : "text-gray-600 hover:text-[#2563EB]"
                    }
                    after:absolute after:left-0 after:bottom-0
                    after:h-0.5 after:bg-[#2563EB]
                    after:transition-all after:duration-300
                    ${
                      isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <div className="flex justify-center items-center gap-1 border-gray-400/50 border-2 rounded-4xl  pl-2 bg-blue-200/30">
            <Search size={15} className="  text-gray-400" />

            <Input
              placeholder="Search destinations..."
              className="w-72 rounded-full border-0 shadow-none focus:border-0 focus:ring-0 focus-visible:ring-0 focus-visible:outline-none"
            />
          </div>

          <button
            type="button"
            className="rounded-full p-2 transition-colors cursor-pointer hover:bg-blue-200"
          >
            <Moon size={20} />
          </button>

          <div>
            {user ? (
              <LoginDropDown />
            ) : (
              <Link to="/login">
                <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] cursor-pointer">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            className="rounded-full p-2 transition-colors cursor-pointer hover:bg-blue-200"
          >
            <Moon size={20} />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 transition-colors cursor-pointer hover:bg-blue-200"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 pb-4" : "max-h-0"
        }`}
      >
        <div className="px-6">
          <Input
            placeholder="Search destinations..."
            className="mb-4 rounded-full border-gray-300"
          />

          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block font-medium transition-colors ${
                      isActive
                        ? "text-[#2563EB]"
                        : "text-gray-600 hover:text-[#2563EB]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <Link to="/login" onClick={() => setIsOpen(false)}>
            <Button className="mt-4 w-full bg-[#2563EB] hover:bg-[#1D4ED8]">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
