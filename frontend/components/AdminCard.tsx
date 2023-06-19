export default function AdminCard({ title, children }: {
  title: string,
  children?: React.ReactNode
}) {
  return (
    <div className="h-48 bg-primary rounded-md flex flex-col justify-between">
      <div className="flex-1">{children}</div>
      <p className="px-2 pb-4 text-2xl text-white font-extrabold text-left">{title} </p>
    </div>
  );
}