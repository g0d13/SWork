import { HomeWork, Group, History } from "@material-ui/icons";

export const links = [
  {
    title: "Inicio",
    icon: <HomeWork />,
    route: "/home",
    key: "1",
    permission: "home:read",
  },
  {
    title: "Usuarios",
    icon: <Group />,
    route: "/users",
    key: "3",
    permission: "user:read",
  },
  {
    title: "Historial",
    icon: <History />,
    route: "/history",
    key: "4",
    permission: "history:read",
  },
];
