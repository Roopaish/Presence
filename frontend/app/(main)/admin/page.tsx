'use client'

import AdminCard from "@/components/AdminCard";
import { encodeImages } from "@/providers/authority";
import Link from "next/link";
import { useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export default function AdminPage() {
  const [takingAttendance, setTakingAttendance] = useState(false);

  const { mutate: _encode, isLoading: isEncoding } = useMutation({
    mutationKey: "encodeImages",
    mutationFn: encodeImages,
    onSuccess: () => {
      toast.success("Model Trained Successfully")
    },
    onError: () => {
      toast.error("Something went wrong")
    }
  })

  return (
    <section className="gap-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
      <Link href="/admin/students">
        <AdminCard title="Students Data" />
      </Link>
      <Link href="/admin/reports">
        <AdminCard title="View Reports" />
      </Link>
      <button onClick={() => _encode()} disabled={isEncoding}>
        <AdminCard title="Train The Model">
          {
            isEncoding && (
              <div className="flex gap-5 items-center justify-center h-full">
                <h2 className="text-3xl font-extrabold text-white animate-bounce">TRAINING</h2>
              </div>
            )
          }
        </AdminCard>
      </button>
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
