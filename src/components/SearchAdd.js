import {
  Box,
  Chip,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";

const useStyles = makeStyles({
  displayTitle: {
    paddingBottom: "0",
    "& *": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
  },
  displayContent: {
    "& .MuiFormControl-root": {
      marginTop: "15px",
    },
    display: "flex",
    flexDirection: "column",
  },
  listText: {
    "& *": {
      fontWeight: "400",
    },
  },
  boxSelected: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  textWarning: {
    color: "#f44336",
  },
});

const SearchAdd = (props) => {
  const classes = useStyles();
  const {
    onSelect,
    selected,
    onClose,
    open,
    title,
    searchIn,
    itemKey,
    textKey,
    onlyOne,
  } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    // remove duplicated elements
    const tmpItems = [
      ...new Map(
        [...selected, ...searchIn].map((item) => [item[itemKey], item])
      ).values(),
    ];

    // set value from props
    setItems(tmpItems);
  }, [searchIn]);

  const onSelectItem = (item) => {
    if (onlyOne && selected.length === 1) {
      return;
    }
    // remove from list item
    setItems(items.filter((e) => e[itemKey] !== item[itemKey]));
    // add to selected list
    onSelect([...selected, item]);
  };

  const onDeleteItem = (item) => {
    // add to the list item
    setItems((prev) => [item, ...prev]);
    // remove from selected list
    onSelect(selected.filter((e) => e[itemKey] !== item[itemKey]));
  };

  return (
    <Drawer onClose={(v) => onClose(v)} anchor="bottom" open={open}>
      <DialogTitle className={classes.displayTitle}>
        <Typography>Seleccionar {title}</Typography>
        <IconButton onClick={() => onClose(!open)}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.displayContent}>
        <Box className={classes.boxSelected}>
          {selected.map((el) => (
            <Chip
              label={el[textKey]}
              variant="outlined"
              onDelete={() => onDeleteItem(el)}
              key={el[itemKey]}
            />
          ))}
        </Box>
        {onlyOne && selected.length === 1 && (
          <Typography className={classes.textWarning} variant="caption">
            Solo se puede seleccionar un objeto
          </Typography>
        )}
        <TextField fullWidth label="Buscar" />
      </DialogContent>
      <DialogContent>
        <List>
          <ListItem button>
            <ListItemText
              className={classes.listText}
              primary={`Agregar ${title}`}
            />
          </ListItem>
          {items.map((el) => (
            <ListItem button onClick={() => onSelectItem(el)} key={el[itemKey]}>
              <ListItemText
                className={classes.listText}
                primary={el[textKey]}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Drawer>
  );
};

export default SearchAdd;
