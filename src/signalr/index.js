import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { signalMiddleware, withCallbacks } from "redux-signalr";

const connection = new HubConnectionBuilder()
  .configureLogging(LogLevel.Information)
  .withUrl("https://localhost:5001/NotificationHub")
  .build();

const callbacks = withCallbacks()
  .add("ReceiveMessage", (msg) => (dispatch) => {})
  .add("ReciveNotif", (msg) => (dispatch) => {});

export const signal = signalMiddleware({
  callbacks,
  connection,
  shouldConnectionStartImmediately: false,
});
