import React, { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import { Delete } from "@material-ui/icons";

import { useQuery, useMutation, useQueryClient } from "react-query";

import useUiTitle from "../../hooks/useUiTitle";
import UserForm from "./UserForm";
import { fetchUserById, putUser, deleteUser } from "../../api/usersAPI";
import Loading from "../../components/Loading";

const UserModify = (props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery(["getUser", props.id], () =>
    fetchUserById(props.id)
  );

  const onSuccess = () => queryClient.invalidateQueries("user");
  const updateUser = useMutation((user) => putUser(user), { onSuccess });
  const removeUser = useMutation((userId) => deleteUser(userId), { onSuccess });

  useUiTitle("Editar usuario", [
    {
      onClick: () => {
        removeUser.mutate(props.id);
        navigate(-1);
      },
      icon: <Delete />,
    },
  ]);

  if (isLoading) return <Loading />;

  const handleSubmit = (data) => {
    updateUser.mutate(data);
    navigate(-1);
  };

  return <UserForm defaultValues={data} onFormSubmit={handleSubmit} />;
};
export default UserModify;
