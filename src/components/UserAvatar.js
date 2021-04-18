import { Avatar } from "@material-ui/core";

const UserAvatar = ({ name }) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((e) => e[0])
    .join("");
  return <Avatar>{initials}</Avatar>;
};

export default UserAvatar;
