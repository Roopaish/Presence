'use client'

import Calendar from "@/components/Calendar";
import { me } from "@/providers/auth";
import { useQuery } from "react-query";
import { useState } from "react";

export default function StudentPage() {
 const [currentMonth,setCurrentMonth]=useState(1)

  const { data: user } = useQuery({
    queryKey: "user",
    queryFn: me,
  })


  const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
    const number=parseInt(event.target.value)
    setCurrentMonth(number)

  }

  return (
    <main className="px-16 font-extrabold text-xl">
      <h1>Hello {user?.data.first_name} {user?.data.last_name}</h1>
      <h1 className="font-medium text-2xl">Your Current Streak: 7 🔥</h1>
      <Calendar month={currentMonth} year={2023} handleChange={handleChange} />
    </main>
  );
}
