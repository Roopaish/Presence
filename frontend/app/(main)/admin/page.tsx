'use client'

import AdminCard from "@/components/AdminCard";
import Link from "next/link";
import { useState } from "react";

export default function AdminPage() {
  const [takingAttendance, setTakingAttendance] = useState(false);

  return (
    <section className="gap-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
      <Link href="/admin/students">
        <AdminCard title="Students Data" />
      </Link>
      <Link href="/admin/reports">
        <AdminCard title="View Reports" />
      </Link>
      <button onClick={() => setTakingAttendance(!takingAttendance)}>
        <AdminCard title={takingAttendance ? "Stop Taking Attendance" : "Start Taking Attendance"}>
          {
            takingAttendance && (
              <div className="flex gap-5 items-center justify-center h-full">
                <div className="w-10 h-10 rounded-full bg-red-600 animate-blink"></div>
                <h2 className="text-3xl font-extrabold text-white">REC</h2>
              </div>
            )
          }
        </AdminCard>
      </button>
    </section>
  );
}
