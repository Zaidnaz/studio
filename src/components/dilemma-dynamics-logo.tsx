import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

export function DilemmaDynamicsLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-6 w-6", props.className)}
      {...props}
    >
      <path d="M12 2a10 10 0 1 0 10 10" />
      <path d="M12 2a10 10 0 1 0-10 10" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
      <path d="M12 12a4.5 4.5 0 0 1-4.5-4.5" />
      <path d="M12 12a4.5 4.5 0 0 0 4.5 4.5" />
    </svg>
  );
}
