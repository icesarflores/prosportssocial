import * as React from "react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./dropdown-menu";

interface HoverDropdownProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  className?: string;
}

export function HoverDropdown({
  children,
  trigger,
  className,
}: HoverDropdownProps) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const onMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const onMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 200);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
        <DropdownMenuContent
          className={cn("w-56", className)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </DropdownMenuContent>
      </div>
    </DropdownMenu>
  );
}
