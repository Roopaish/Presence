'use client'

import { createContext, useEffect, useState } from 'react';

type Status = "taking_attendance" | "encoding_images" | "none"

const StatusContext = createContext<{
  status: Status,
  setStatus: (status: Status) => void
}>({
  status: "none",
  setStatus: () => { },
});

const StatusProvider = ({ children }: {
  children: React.ReactNode
}) => {
  const [status, setStatus] = useState<Status>("none");

  useEffect(() => {
    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET_URL}/ws/status`);

    ws.onopen = () => {
      console.log('Status WebSocket connection established');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data.message)
      console.log('Received Status WebSocket message:', data);
    };

    ws.onclose = () => {
      console.log('Status WebSocket connection closed');
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      ws.close();
    };
  }, []);

  return (
    <StatusContext.Provider value={{ status, setStatus }}>
      {children}
    </StatusContext.Provider>
  );
};

export { StatusContext, StatusProvider };

