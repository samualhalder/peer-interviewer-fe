import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import React from "react";

const flexVariant = cva("w-[100%] flex shrink-0", {
  variants: {
    variant: {
      col: "flex-col",
      row: "flex-row",
    },
    items: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
    },
    justify: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      between: "justify-between",
      around: "justify-around",
    },
    gap: {
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
      "2xl": "gap-12",
      "3xl": "gap-16",
    },
  },
  defaultVariants: {
    variant: "col",
    items: "center",
    justify: "center",
    gap: "sm",
  },
});

type propType = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  variant?: "row" | "col";
  items?: "start" | "end" | "center";
  justify?: "start" | "end" | "center" | "between" | "around";
  gap?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
};
export default function Flex({
  children,
  className,
  variant,
  items,
  justify,
  gap,
  ...props
}: propType) {
  return (
    <div
      {...props}
      className={cn(flexVariant({ variant, items, justify, gap }), className)}
    >
      {children}
    </div>
  );
}
