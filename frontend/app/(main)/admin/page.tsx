'use client'

import AdminCard from "@/components/AdminCard";
import WebsocketLogs from "@/components/WebsocketLogs";
import { StatusContext } from "@/configs/StatusProvider";
import { encodeImages, stopTakingAttendance, takeAttendance } from "@/providers/face_ml";
import { deleteAttendanceForTheDay } from "@/providers/student";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

export default function AdminPage() {
  const { status } = useContext(StatusContext);
  const [shouldRetakeAttendance, setShouldRetakeAttendance] = useState<boolean>(false);

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


  const {
    mutate: _deleteAttendance,
  
  } = useMutation({
    mutationKey: 'deleteAttendance',
    mutationFn: deleteAttendanceForTheDay,
    onSuccess: (data) => {
      setShouldRetakeAttendance(false)
      toast.success(data.message)
    },
    onError: (data) => {
      setShouldRetakeAttendance(false)
       toast.error('');
    }
  })



  useEffect(() => {
    if (shouldRetakeAttendance) {
      _deleteAttendance({ year: new Date().getFullYear(), month: new Date().getMonth(), day: new Date().getDay() });
      setShouldRetakeAttendance(false)
    }
  }, [shouldRetakeAttendance]);

console.log(new Date().getFullYear(),new Date().getMonth(), new Date().getDay())



  const { mutate: _takeAttendance,data:attendanceresp, isLoading: isTakingAttendance } = useMutation({
    mutationKey: "takeAttendance",
    mutationFn: takeAttendance,
    onSuccess: (data) => {
      if(!data?.message.includes("Attendance for today is already taken")){

      toast.success("Attendance Taken Successfully")
      }
      else{
        const userInput = window.confirm("Attendance for today is already taken. Do you want to retake attendance?");
        setShouldRetakeAttendance(userInput)
      }
    },
    onError: () => {
      // toast.error("Something went wrong")
    }
  })

  const { mutate: _stopTakingAttendance, isLoading: isStopTakingAttendance } = useMutation({
    mutationKey: "stopTakingAttendance",
    mutationFn: stopTakingAttendance,
    onSuccess: () => {
        toast.success("Attendance Stopped Successfully")
       
      },
    onError: () => {
      // toast.error("Something went wrong")
    }
  })

console.log('data=',attendanceresp,new Date().getDate())

  return (
    <>
      <section className="gap-5 grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        <Link href="/admin/students">
          <AdminCard title="Students Data" />
        </Link>
        <Link href="/admin/reports">
          <AdminCard title="View Reports" />
        </Link>
     
        <button onClick={() => _encode()} disabled={isEncoding || status == "encoding_images" || isTakingAttendance || status == "taking_attendance"}>
          <AdminCard title="Train The Model" disabled={isEncoding || status == "encoding_images" || isTakingAttendance || status == "taking_attendance"}>
            {
              (isEncoding || status == "encoding_images") && (
                <div className="flex gap-5 items-center justify-center h-full">
                  <h2 className="text-3xl font-extrabold text-white animate-bounce">TRAINING</h2>
                </div>
              )
            }
          </AdminCard>
        </button>
        <button onClick={() => {
             


          if (isTakingAttendance || status == "taking_attendance") {
            _stopTakingAttendance()
          } else {
            _takeAttendance({ display_video: true })
          }
        }}
          disabled={isEncoding || status == "encoding_images"}
        >
          <AdminCard title={(isTakingAttendance || status == "taking_attendance") ? "Stop Taking Attendance" : "Start Taking Attendance"}
            disabled={isEncoding || status == "encoding_images"}
          >
            {
              (isTakingAttendance || status == "taking_attendance") && (
                <div className="flex gap-5 items-center justify-center h-full">
                  <div className="w-10 h-10 rounded-full bg-red-600 animate-blink"></div>
                  <h2 className="text-3xl font-extrabold text-white">REC</h2>
                </div>
              )
            }
          </AdminCard>
        </button>
      </section>
      <div >
        <WebsocketLogs />
      </div>
    </>
  );
}
