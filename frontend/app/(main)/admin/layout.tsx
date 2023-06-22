import { AttendanceProvider } from "@/configs/AttendanceProvider";
import { StatusProvider } from "@/configs/StatusProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (<StatusProvider>
    <AttendanceProvider>
      {children}
    </AttendanceProvider>
  </StatusProvider>)
}