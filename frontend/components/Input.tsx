import React from "react";

export default function Input({
  label,
  className,
  required,
  id,
  ...rest
}: {
  label: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) {
  return (
    <div>
      <label htmlFor={label} className="mb-2 block">
        {label}
      </label>
      <input
        {...rest}
        required={required}
        id={label}
        className="w-full h-12 px-4 py-2 rounded bg-white border"
      />
    </div>
  );
}
