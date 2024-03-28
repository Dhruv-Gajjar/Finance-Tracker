"use client";
import Link from "next/link";

import { CreditCard, DollarSign, Home, Users } from "lucide-react";
import { DarkModeToggler } from "../DarkModeToggler";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Sidebar = () => {
  return (
    <div className="max-w-[260px] w-full min-h-screen h-full bg-white shadow-md dark:bg-zinc-950">
      <div className="flex items-center justify-between px-4 py-6 pb-24">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <DarkModeToggler />
      </div>
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <DollarSign className="h-4 w-4" />
          Expenses / Incomes
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
        >
          <CreditCard className="h-4 w-4" />
          Transactions{" "}
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
        >
          <Users className="h-4 w-4" />
          Profile
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
