import clsx from "clsx";
import React from "react";

export default function Button({
  children,
  className,
  type,
  variant = "solid",
  ...rest
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline";
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) {
  return (
    <button
      type={type ?? "button"}
      {...rest}
      className={clsx(
        "w-full h-12 px-4 py-2 mb-3 border-2 rounded-md",
        "text-center text-xl font-semibold flex justify-center items-center transition-colors",
        variant == "solid" &&
          "bg-primary text-white hover:bg-primary-500 border-none ",
        variant == "outline" &&
          "bg-transparent border border-black hover:bg-primary-50"
      )}
    >
      {children}
    </button>
  );
}
