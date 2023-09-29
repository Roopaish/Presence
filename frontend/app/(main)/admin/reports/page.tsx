'use client'

import { AttendanceContext } from "@/configs/AttendanceProvider";
import { StatusContext } from "@/configs/StatusProvider";
import { getAllStudentAttendance } from "@/providers/student";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

import StudentChart from "@/components/StudentChart";
import { getStudentAttendanceByMonth } from "@/providers/student";


export default function Reports() {
  const { status } = useContext(StatusContext);
  const { attendance: realTimeAttendance } = useContext(AttendanceContext);
  const [date, setDate] = useState<any>('2023-1')

  // const {
  //   data,
  //   isLoading,
  //   refetch
  // } = useQuery({
  //   queryKey: ['getReports', date.getDay(), date.getMonth(), date.getFullYear()],
  //   queryFn: () => {
  //     return getAllStudentAttendance({
  //       day: date.getDay(),
  //       month: date.getMonth(),
  //       year: date.getFullYear()
  //     })
  //   },
  // })


  const {
    data,
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['getReports',date],
    queryFn: () => {
      return getStudentAttendanceByMonth({
       date
      })
    },
  })

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    setDate(`${year}-${month}`);
  }, []);



const currentMonth= new Date().getMonth()

console.log(currentMonth)

  return (
    <section>
      <div className="flex justify-center items-center gap-5">
        <input type="month"
        value={date}
        onChange={(e) => {
        
          setDate(e.target?.value)
          refetch()
        }}
        />
      </div>
      {/* <div className="grid grid-cols-2 gap-4">
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
      </div> */}
  <StudentChart date={date} data={data}/>

    </section>
  )
}