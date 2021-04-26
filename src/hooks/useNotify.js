import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_NOTIFICATION_EVENT = "events";
const SOCKET_SERVER_URL = "http://localhost:3030";

const useNotify = () => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {});

    socketRef.current.on(NEW_NOTIFICATION_EVENT, (data) => {
      console.log(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
};

export default useNotify;
