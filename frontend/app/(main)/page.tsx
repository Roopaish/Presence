'use client'

import Calendar from "@/components/Calendar";
import Icon from "@/components/Icon";
import Stats from "@/components/Stats";
import { me } from "@/providers/auth";
import { getStudentAttendance } from "@/providers/student";
import { getGreeting } from "@/utils/getGreeting";
import Link from "next/link";
import { useState } from "react";
import { useQuery } from "react-query";

export default function StudentPage() {
  const [currentMonth, setCurrentMonth] = useState(0)

  const { data: user } = useQuery({
    queryKey: "user",
    queryFn: me,
  })

  const { data: attendance } = useQuery({
    queryKey: 'user-attendance',
    queryFn: () => getStudentAttendance({
      month: currentMonth,
      year: 2023
    })
  })


  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const number = parseInt(event.target.value)
    setCurrentMonth(number)
  }

  const [greeting, iconType] = getGreeting();

  return (
    <main className="font-extrabold text-xl">
      <h1 className="text-2xl font-semibold flex items-center gap-3">
        {greeting} <Icon type={iconType} className="w-7 h-7 text-primary" />
      </h1>
      <h1 className="text-2xl font-medium">
        {user?.data.first_name} {user?.data.last_name}
      </h1>

      <div className="mt-6 mb-10 flex flex-col sm:flex-row gap-5">
        <Stats data={`${attendance?.data.streak} days`} title="Current Streak" iconType="fire" />
        <Link href="/submit-images"> <Stats data={user?.data.has_submitted_images ? "Re-submit" : "Submit"} title="Your images" iconType="selfie" />
        </Link>
      </div>

      <Calendar month={currentMonth} year={2023} handleChange={handleChange} />
    </main>
  );
}
