const crudPermissions = ["create", "read", "update", "delete"];

// const permissions = [
//   { log: [...crudPermissions, "request", "repair"] },
//   { user: [...crudPermissions] },
//   { machine: crudPermissions },
//   { category: crudPermissions },
// ];

const rolesPermissions = {
  admin: {
    log: [crudPermissions.join(":"), "request"].join(":"),
    user: crudPermissions.join(":"),
    machine: crudPermissions.join(":"),
    category: crudPermissions.join(":"),
    notify: "",
    home: "read",
    history: "read",
  },
  supervisor: {
    log: "read:request",
    user: "read",
    machine: "create:read:update",
    category: "read",
    notify: "read:update",
    history: "",
    home: "",
  },
  mechanic: {
    log: "repair",
    user: "",
    machine: "read",
    category: "",
    notify: "read",
    history: "",
    home: "",
  },
};

// Check role
export const useCr = (role, can) => {
  if (!role) return -1;
  const [object, permission] = can.split(":");
  const allPermissions = rolesPermissions[role.toLocaleLowerCase()][object];
  return allPermissions.split(":").findIndex((i) => i === permission);
};
export default useCr;
