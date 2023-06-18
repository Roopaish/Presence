import Icon, { IconType } from "./Icon";

export default function Stats({ data, title, iconType }: {
  data: string,
  title: string,
  iconType: IconType,
}) {
  return (<div className="min-w-[250px] min-h-[90px] border rounded-lg p-3 flex items-center gap-4 border-black transition-all hover:bg-primary-50">
    <Icon type={iconType} className="text-4xl" />
    <div>
      <h1 className="text-2xl font-bold">{data}</h1>
      <p className="text-lg font-normal">{title}</p>
    </div>
  </div>)
}