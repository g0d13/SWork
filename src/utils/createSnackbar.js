// import {Button} from "@material-ui/core";
//
// {
//   message: "Failed fetching data.",
//     key: new Date().getTime() + Math.random(),
//   options: {
//   variant: "warning",
//     action: (key) => (
//     <Button onClick={() => closeSnackbar(key)}>dismiss me</Button>
//   ),
// },
// }

function createNotification(message, options) {
  const notiToSend = {
    message,
    key: new Date().getTime() + Math.random(),
    options,
  };
  console.log(notiToSend);
  return notiToSend;
}
export default createNotification;
