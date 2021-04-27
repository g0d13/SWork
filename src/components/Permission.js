import { useEffect } from "react";
import PropTypes from "prop-types";
import useCr from "../utils/rolesValues";
import { useAuth } from "../hooks/useAuth";

const Permission = ({ children, permission, accept, reject }) => {
  const user = useAuth("user");
  const status = useCr(JSON.parse(user).role, permission, accept, reject);

  useEffect(() => {
    if (status >= 0) {
      accept && accept();
    } else {
      reject && reject();
    }
  }, [accept, reject, status]);

  return status >= 0 ? children : null;
};

Permission.propTypes = {
  children: PropTypes.node,
  permission: PropTypes.string.isRequired,
  accept: PropTypes.func,
  reject: PropTypes.func,
};

export default Permission;
