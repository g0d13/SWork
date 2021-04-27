import { useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";

const NEW_NOTIFICATION_EVENT = "notify";
const SOCKET_SERVER_URL = "https://nodeswork.herokuapp.com";

const userData = JSON.parse(window.localStorage.getItem("user"));

function notifyMe(text) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    new Notification(text);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {});
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them any more.
}

const useNotify = () => {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: `id=${userData.id}`,
    });

    socketRef.current.on(NEW_NOTIFICATION_EVENT, (data) => {
      notifyMe(data);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);
};

export default useNotify;
