'use client'

import { AllAttendance } from '@/providers/student';
import { createContext, useEffect, useState } from 'react';

const AttendanceContext = createContext<{
  attendance: AllAttendance,
  setAttendance: (attendance: AllAttendance) => void
}>({
  attendance: {
    'present_users': [],
    'absent_users': [],
  },
  setAttendance: () => { },
});

const AttendanceProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [attendance, setAttendance] = useState<AllAttendance>({
    'present_users': [],
    'absent_users': [],
  });

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET_URL}/ws/attendance`);

    ws.onopen = () => {
      console.log('Attendance WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setAttendance(data.message)
      console.log('Received Attendance WebSocket message:', data);
    };

    ws.onclose = () => {
      console.log('Attendance WebSocket connection closed');
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <AttendanceContext.Provider value={{ attendance, setAttendance }}>
      {children}
    </AttendanceContext.Provider>
  );
};

export { AttendanceContext, AttendanceProvider };

