export default function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("")

  return (
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary-100">
      <span className="text-primary-500 font-semibold text-xl uppercase">{initials}</span>
    </div>
  )
}