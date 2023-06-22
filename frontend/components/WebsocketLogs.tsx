'use client'

import { useEffect, useRef, useState } from 'react';

export default function WebsocketLogs() {
  const [logs, setLogs] = useState<{ type: string, message: string }[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const logsContainerRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket(`${process.env.NEXT_PUBLIC_SOCKET_URL}/ws/logs`);

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setLogs((prev) => [...prev, message]);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="mt-10 border-2 rounded-xl p-4 ">
      <h2 className='text-xl font-bold'>Realtime Logs</h2>
      <ul className='h-64  overflow-y-scroll font-mono' ref={logsContainerRef}>
        {logs.map((log, index) => (
          <li key={index} style={{
            color: log.message.toLowerCase().includes('connected') ? "green" : "",
            fontWeight: log.message.toLowerCase().includes('connected') ? "bold" : "normal",
            fontSize: log.message.toLowerCase().includes('connected') ? "20px" : "",
          }}>{log.message}</li>
        ))}
      </ul>
    </div>
  );
}