import { HomeWork, Group, History } from "@material-ui/icons";

export const links = [];

export const getLinks = (role) => {
  const baseRoute = {
    title: "Inicio",
    icon: <HomeWork />,
    route: "/home",
    key: "1",
    permission: "home:read",
  };
  if (role?.toLowerCase() === "admin") {
    return [
      baseRoute,
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
  } else {
    return [baseRoute];
  }
};
