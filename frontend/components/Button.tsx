import clsx from "clsx";
import React from "react";

export default function Button({
  children,
  className,
  type,
  disabled,
  variant = "solid",
  isLoading = false,
  ...rest
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline";
  isLoading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      disabled={disabled}
      type={type ?? "button"}
      {...rest}
      className={clsx(
        "w-full h-12 px-4 py-2 mb-3 rounded-md",
        "text-center text-xl font-semibold flex justify-center items-center transition-colors",
        variant == "solid" &&
        "bg-primary text-white hover:bg-primary-500 border-none ",
        variant == "outline" &&
        "bg-transparent border border-black hover:bg-primary-50",
        disabled && "bg-gray-300 text-gray-500 cursor-not-allowed",
      )}
    >
      {isLoading ? <div className="h-7 w-7 rounded-full border-2 border-l-transparent animate-spin"></div> : children}
    </button>
  );
}
