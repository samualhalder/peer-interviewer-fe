import { cva } from "class-variance-authority";
import React from "react";
import { cn } from "../../utils/cn";

const buttonVariant = cva(
  "px-4 py-2 rounded-md hover:opacity-50 font-semibold self-center",
  {
    variants: {
      variant: {
        primary: "bg-myprimary text-white",
        secondary: "bg-mysecondary text-white",
        outline: " border-2 border-myprimary bg-white text-myprimary",
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
  hover?: string;
};

export default function Button({
  variant,
  size,
  hover,
  className,
  ...props
}: ButtonProps) {
  return (
    <div className="w-full flex justify-center items-center relative group">
      <button
        {...props}
        className={cn(buttonVariant({ variant, size }), className)}
      />
      {hover && (
        <span className=" absolute bottom-10 right-auto whitespace-nowrap bg-gray-400 text-white py-2 px-4 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          {hover}
        </span>
      )}
    </div>
  );
}
