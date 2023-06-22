import clsx from "clsx";

export default function AdminCard({ title, children, disabled = false }: {
  title: string,
  children?: React.ReactNode
  disabled?: boolean
}) {
  return (
    <div className={clsx("h-48 rounded-md flex flex-col justify-between",
      disabled ? "bg-gray-500 cursor-not-allowed" : "bg-primary hover:bg-primary-500 cursor-pointer"
    )}
    >
      <div className="flex-1">{children}</div>
      <p className="px-2 pb-4 text-2xl text-white font-extrabold text-left">{title} </p>
    </div>
  );
}