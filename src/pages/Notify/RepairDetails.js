import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@material-ui/core";
import ChipSelector from "../../components/ChipSelector";
import useUiTitle from "../../hooks/useUiTitle";
import GridView from "../../components/GridView";
import { useFormik } from "formik";
import * as yup from "yup";
import TextInput from "../../components/TextInput";
import { priorityList } from "../../utils/constats";
import { useMutation, useQueryClient } from "react-query";
import { postRepair } from "../../api/requestAPI";
import { useNavigate } from "@reach/router";

const useStyles = makeStyles({
  maxWidth: {
    width: "100%",
  },
  flexDisplay: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    color: "rgba(0, 0, 0, 0.54)",
  },
});
const validationSchema = yup.object({
  details: yup
    .string("Ingresa los detalles")
    .min(5, "no pueden ser menor a 5 caracteres"),
});

const RepairDetails = (props) => {
  const classes = useStyles();
  const [priority, setPriority] = useState("LOW");
  const [isFixed, setIsFixed] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [arrivalTime, setArrivalTime] = useState(new Date());

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const onSuccess = () => {
    queryClient.invalidateQueries("requests");
    navigate(-1);
  };
  const makeRepair = useMutation(
    ["repair", props.id],
    (data) => postRepair(data),
    { onSuccess }
  );

  useUiTitle("Detalles de la reparacion");

  const formik = useFormik({
    initialValues: {
      details: "",
    },
    validationSchema: validationSchema,
    onSubmit: (data) => {
      const sendData = {
        ...data,
        isFixed,
        severity: priority,
        requestId: props.id,
        arrivalTime,
      };
      makeRepair.mutate(sendData);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <GridView>
        <Typography sm={12} variant="subtitle1" className={classes.label}>
          Severidad del problema
        </Typography>
        <ChipSelector
          sm={12}
          items={priorityList}
          selected={priority}
          onSelect={setPriority}
        />
        <Typography sm={12} variant="subtitle1" className={classes.label}>
          Detalles
        </Typography>
        <TextInput
          sm={12}
          name="details"
          multiline
          rows={4}
          label="Detalles adicionales"
          formik={formik}
        />
        <FormGroup row sm={12}>
          <FormControlLabel
            control={
              <Switch
                checked={isFixed}
                onChange={() => setIsFixed(!isFixed)}
                name="isFixed"
              />
            }
            label="Se pudo reparar"
          />
        </FormGroup>
        <Button sm={12} color="primary" type="submit">
          Enviar
        </Button>
      </GridView>
    </form>
  );
};

export default RepairDetails;
