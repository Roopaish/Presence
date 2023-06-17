'use client'

import Calendar from "@/components/Calendar";
import { me } from "@/providers/auth";
import { useQuery } from "react-query";

export default function StudentPage() {
  const { data: user } = useQuery({
    queryKey: "user",
    queryFn: me,
  })

  return (
    <main className="px-16 font-extrabold text-xl">
      <h1>Hello {user?.data.first_name} {user?.data.last_name}</h1>
      <h1 className="font-medium text-2xl">Your Current Streak: 7 🔥</h1>
      <Calendar month={6} year={2023} />
    </main>
  );
}
