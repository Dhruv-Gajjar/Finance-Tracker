"use client";
import Link from "next/link";

import useAuth from "@/context/AuthContext";
import {
  Banknote,
  CreditCard,
  DollarSign,
  Home,
  LogOutIcon,
  Menu,
  Package2,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FC, ReactNode, useState } from "react";
import { DarkModeToggler } from "../DarkModeToggler";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const activeClass =
  "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary";
const linkClass =
  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary";

const Sidebar: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathName = usePathname();
  const { logout } = useAuth();

  const openChange = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="sticky grid h-[100vh] w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Medium screen sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full min-h-screen flex-col gap-2 bg-white shadow-md dark:bg-zinc-950">
          <div className="flex justify-between h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">Expense Tracker</span>
            </Link>
            <DarkModeToggler />
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className={pathName === "/dashboard" ? activeClass : linkClass}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/income"
                className={pathName === "/income" ? activeClass : linkClass}
              >
                <Banknote className="h-4 w-4" />
                Incomes
              </Link>
              <Link
                href="/expense"
                className={pathName === "/expense" ? activeClass : linkClass}
              >
                <DollarSign className="h-4 w-4" />
                Expenses
              </Link>
              <Link
                href="/transactions"
                className={
                  pathName === "/transactions" ? activeClass : linkClass
                }
              >
                <CreditCard className="h-4 w-4" />
                Transactions{" "}
              </Link>
            </nav>
          </div>
          <div className="px-2 pb-4">
            <Button variant="ghost" className="self-start" onClick={logout}>
              <LogOutIcon className="h-4 w-4" />
              <span className="ml-2">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 sm:hidden">
          <Sheet open={isOpen} onOpenChange={openChange}>
            <SheetTrigger asChild>
              <Button variant={"ghost"} size={"icon"} className="sm:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col flex-1">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="/dashboard"
                  className={
                    pathName === "/dashboard" ? activeClass : linkClass
                  }
                  onClick={openChange}
                >
                  <Home className="h-4 w-4" />
                  Dashboard
                </Link>
                <Link
                  href="/income"
                  className={pathName === "/income" ? activeClass : linkClass}
                  onClick={openChange}
                >
                  <Banknote className="h-4 w-4" />
                  Incomes
                </Link>
                <Link
                  href="/expense"
                  className={pathName === "/expense" ? activeClass : linkClass}
                  onClick={openChange}
                >
                  <DollarSign className="h-4 w-4" />
                  Expenses
                </Link>
                <Link
                  href="/transactions"
                  className={
                    pathName === "/transactions" ? activeClass : linkClass
                  }
                  onClick={openChange}
                >
                  <CreditCard className="h-4 w-4" />
                  Transactions{" "}
                </Link>
              </nav>
              <div>
                <LogOutIcon />
              </div>
            </SheetContent>
          </Sheet>
        </header>

        {/* Main content */}
        <main className="flex flex-1 flex-col gap-4 w-full lg:gap-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
