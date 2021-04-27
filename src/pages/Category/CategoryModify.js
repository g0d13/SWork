import React from "react";
import { Box, Button } from "@material-ui/core";
import TextInput from "../../components/TextInput";
import { useFormik } from "formik";
import * as yup from "yup";
import useUiTitle from "../../hooks/useUiTitle";
import { useQuery, useQueryClient, useMutation } from "react-query";
import GridView from "../../components/GridView";
import {
  fetchCategoryById,
  postCategory,
  putCategorory,
} from "../../api/categoriesAPI";
import { CircularProgress } from "@material-ui/core";
import { useNavigate } from "@reach/router";
import { Add } from "@material-ui/icons";

const validationSchema = yup.object({
  name: yup
    .string()
    .min(5, "Debe ser mayor a 5 caractereres")
    .required("El nombre es requerido"),
  details: yup
    .string()
    .min(5, "El campo debe ser mayor a 5 caracteres")
    .required("El campo es requerido"),
});

const CategoryForm = ({ defaultValues, onFormSubmit }) => {
  const formik = useFormik({
    initialValues: defaultValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onFormSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <GridView>
        <TextInput name="name" label="Nombre del tipo" formik={formik} />
        <TextInput name="details" label="Detalles" formik={formik} />
        <Box sm={12} display="flex" justifyContent="center">
          <Button color="primary" type="submit" startIcon={<Add />}>
            Agregar
          </Button>
        </Box>
      </GridView>
    </form>
  );
};

const CategoryCreate = () => {
  const navigate = useNavigate();
  useUiTitle("Agregar tipo");
  const queryClient = useQueryClient();
  const onSuccess = () => queryClient.invalidateQueries("categories");

  const createCategory = useMutation(
    "categories",
    (data) => postCategory(data),
    { onSuccess }
  );
  const handleSubmit = (data) => {
    console.log(data);
    createCategory.mutate(data);
    navigate(-1);
  };

  return (
    <CategoryForm
      defaultValues={{ name: "", details: "" }}
      onFormSubmit={handleSubmit}
    />
  );
};

const CategoryUpdate = (props) => {
  useUiTitle("Editar tipo");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const onSuccess = () => queryClient.invalidateQueries("categories");
  const categoryQuery = useQuery(
    ["categories", props.id],
    () => fetchCategoryById(props.id),
    { onSuccess }
  );

  const updateCategory = useMutation(
    "categories",
    (data) => putCategorory(data),
    {
      onSuccess,
    }
  );

  const handleSubmit = (data) => {
    updateCategory.mutate({ id: props.id, ...data });
    navigate(-1);
  };

  if (categoryQuery.isLoading) return <CircularProgress />;

  return (
    <CategoryForm
      defaultValues={categoryQuery.data}
      onFormSubmit={handleSubmit}
    />
  );
};
export { CategoryCreate, CategoryUpdate };
