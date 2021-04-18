export const requestPermission = async () => {
  const request = await Notification.requestPermission();
  return request;
};

export const createNotify = async ({ title, options }) => {
  let status = "";
  let notify = "";

  if (!("Notification" in window)) {
    status = "not_supported";
  }

  if (
    Notification.permission === "denied" ||
    Notification.permission === "default"
  ) {
    status = requestPermission();
  }

  if (title) {
    new Notification(title, options);
  }

  return [status, notify];
};
