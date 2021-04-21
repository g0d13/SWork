import { Box, Chip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles({
  box: {
    display: "flex",
    gap: "10px",
  },
});

const ChipSelector = (props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(props.selected);

  const handleSetSelected = (e) => {
    setSelected(e);
    props.onSelect(e);
  };

  const { items } = props;
  return (
    <Box className={classes.box}>
      {items.map((i) => (
        <Chip
          label={i.label}
          clickable
          color={selected === i.value ? "primary" : "default"}
          onClick={() => handleSetSelected(i.value)}
          variant="outlined"
          key={i.value}
        />
      ))}
    </Box>
  );
};

export default ChipSelector;
