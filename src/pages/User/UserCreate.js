import React from "react";
import { useNavigate } from "@reach/router";
import { useMutation, useQueryClient } from "react-query";

import useUiTitle from "../../hooks/useUiTitle";
import UserForm from "./UserForm";
import { postUser } from "../../api/usersAPI";

const UserCreate = (props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSuccess = () => queryClient.invalidateQueries("user");
  const createUser = useMutation((user) => postUser(user), { onSuccess });

  useUiTitle("Agregar usuario");

  const handleSubmit = (data) => {
    createUser.mutate(data);
    navigate(-1);
  };

  return <UserForm defaultValues={{}} onFormSubmit={handleSubmit} />;
};
export default UserCreate;
