import { dataURItoBlob } from "@/utils/dataURItoBlob";
import api, { SimpleResponse } from "./api";
import { UserData } from "./auth";

export async function saveImages({ images }: { images: { src: string }[] }) {
  const formData = new FormData();
  images.forEach((image, index) => {
    formData.append("image", dataURItoBlob(image.src), `${index}.png`);
  });

  const res = await api.post<SimpleResponse>("/users/save-images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export async function studentList() {
  const res = await api.get<{ success: boolean; data: UserData["data"][] }>(
    "/users/students"
  );

  return res.data;
}

export async function deleteStudent(id: number) {
  const res = await api.delete<SimpleResponse>(`/users/student/${id}`);

  return res.data;
}

export async function addStudent({
  first_name,
  last_name,
  password,
  email,
}: StudentInput) {
  const res = await api.post<SimpleResponse>("/users/signup", {
    email,
    first_name,
    last_name,
    password,
    password_confirm: password,
    username: email,
  });

  return res.data;
}

export async function getStudentAttendance({
  month,
  year,
}: {
  month: number;
  year: number;
}) {
  const res = await api.get<{ success: boolean; data: Attendance }>(
    `/users/attendance/${year}/${month}`
  );

  return res.data;
}

export async function getAllStudentAttendance({
  month,
  year,
  day,
}: {
  month: number;
  year: number;
  day: number;
}) {
  const res = await api.get<{ success: boolean; data: AllAttendance }>(
    `/users/all-attendance/${year}/${month}/${day}`
  );

  return res.data;
}

interface Attendance {
  month: string;
  year: string;
  streak: number;
  attendance: boolean[];
}

export interface AllAttendance {
  present_users: { name: string; email: string }[];
  absent_users: { name: string; email: string }[];
}

interface StudentInput {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
}
