import { DarkModeToggler } from "@/components/DarkModeToggler";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 w-full bg-gray-200 dark:bg-zinc-900">
      <DarkModeToggler />
      <Button>Button</Button>
    </main>
  );
}
