import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { signalMiddleware, withCallbacks } from "redux-signalr";
import { createNotify } from "../../utils/requestNotification";

export const connection = new HubConnectionBuilder()
  .configureLogging(LogLevel.Information)
  .withUrl(
    process.env.NODE_ENV === "development"
      ? "https://localhost:5001/NotificationHub"
      : "https://sworkapif.herokuapp.com/NotificationHub",
    {
      logMessageContent: true,
    }
  )
  .build();

const callbacks = withCallbacks()
  .add("ReceiveMessage", (msg) => (dispatch) => {
    console.log(msg);
  })
  .add("ReceiveNotification", (msg) => (dispatch) => {
    createNotify({
      title: `Has recivido una notificacion ${msg}`,
      options: {},
    });
  })
  .add("OnConnectionReady", (msg, email) => (dispatch) => {
    console.log(msg, email);
  });

export const signal = signalMiddleware({
  callbacks,
  connection,
  shouldConnectionStartImmediately: false,
});

connection
  .start()
  .then(function () {
    console.log("connected to NotifyHub");
  })
  .catch(function (err) {
    alert(err);
    return console.error(err.toString());
  });
