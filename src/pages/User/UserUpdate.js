import React from "react";
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

  const getUser = useQuery(["getUser", props.id], () =>
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

  if (getUser.isLoading) return <Loading />;

  const handleSubmit = (data) => {
    console.log("handle submit", data);
    updateUser.mutate(data);
    navigate(-1);
  };

  return <UserForm defaultValues={getUser.data} onFormSubmit={handleSubmit} />;
};
export default UserModify;
