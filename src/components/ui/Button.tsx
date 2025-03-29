import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../../lib/utils";

const buttonVariant = cva(
  "px-4 py-2 rounded-md hover:opacity-50 font-semibold self-center",
  {
    variants: {
      variant: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        outline: " border-2 border-primary bg-white text-primary",
      },
      size: {
        sm: "w-15",
        md: "w-20",
        lg: "w-25",
        xl: "w-30",
        xl2: "w-35",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "lg" | "md" | "xl" | "xl2";
};

export default function Button({
  variant,
  size,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(buttonVariant({ variant, size }), className)}
    />
  );
}
