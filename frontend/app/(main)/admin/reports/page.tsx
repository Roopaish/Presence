'use client'

import { AttendanceContext } from "@/configs/AttendanceProvider";
import { StatusContext } from "@/configs/StatusProvider";
import { getAllStudentAttendance } from "@/providers/student";
import { useContext, useState } from "react";
import { useQuery } from "react-query";

export default function Reports() {
  const { status } = useContext(StatusContext);
  const { attendance: realTimeAttendance } = useContext(AttendanceContext);
  const [date, setDate] = useState(new Date())

  const {
    data,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['getReports', date.getDay(), date.getMonth(), date.getFullYear()],
    queryFn: () => {
      return getAllStudentAttendance({
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear()
      })
    },
  })

  return (
    <section>
      <div className="flex justify-center items-center gap-5">
        <input type="date" value={date.toISOString().split('T')[0]} onChange={(e) => {
          setDate(new Date(e.target.value))
          refetch()
        }} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Present Students</h1>
          {
            ((status == "taking_attendance" && date == new Date()) ? realTimeAttendance : data?.data)?.present_users?.map((user) => (
              <div className="flex gap-5 items-center justify-between" key={user.name}>
                <p>{user.name}</p>
              </div>
            ))
          }
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Absent Students</h1>
          {
            ((status == "taking_attendance" && date == new Date()) ? realTimeAttendance : data?.data)?.absent_users?.map((user) => (
              <div className="flex gap-5 items-center justify-between" key={user.name}>
                <p>{user.name}</p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}