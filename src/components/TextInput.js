import { TextField } from "@material-ui/core";

const TextInput = ({ name, label, formik, ...props }) => {
  return (
    <TextField
      fullWidth
      name={name}
      label={label}
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      variant="outlined"
      {...props}
    />
  );
};

export default TextInput;
