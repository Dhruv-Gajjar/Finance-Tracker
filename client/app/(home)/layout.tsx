import Image from "next/image";
import Link from "next/link";

import Sidebar from "@/components/Sidebar/Sidebar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Icons } from "@/components/icons"

export default function DashboardLayout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Sidebar children={children} />
    </div>
  );
}
