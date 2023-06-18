'use client'

import { useEffect, useRef, useState } from 'react';

export default function Logs() {
  const [logs, setLogs] = useState<string[]>([]);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:8000/ws/logs');

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message);
      setLogs((prevLogs) => [...prevLogs, message]);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <h2>Logs</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </div>
  );
}