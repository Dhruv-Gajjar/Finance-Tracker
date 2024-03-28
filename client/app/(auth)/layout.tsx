import Image from "next/image";
import Link from "next/link";

import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Icons } from "@/components/icons"

export default function AuthLayout({ children }: React.PropsWithChildren) {
  return <div className="flex mx-auto">{children}</div>;
}
