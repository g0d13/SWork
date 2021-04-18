import { useEffect } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useCr from "../utils/rolesValues";

const Permission = ({ children, permission, accept, reject }) => {
  const role = useSelector((state) => state.auth.user.role);
  const status = useCr(role, permission, accept, reject);

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
