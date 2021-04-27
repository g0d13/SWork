import {
  Box,
  Chip,
  DialogContent,
  DialogTitle,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
  Typography,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { Close, Edit } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "@reach/router";
import uniqueValues from "../utils/uniqueValues";

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
  const { visible, config } = props;
  const [open, onClose] = visible;
  const { searchIn, textKey, onlyOne, title, apiName, selectedItems } = config;
  const [selected, onSelect] = selectedItems;
  const itemKey = "id";

  // local state to perform filtering
  const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState("");

  const classes = useStyles();
  const navigate = useNavigate();

  // remove duplicate items
  useEffect(() => {
    let values = uniqueValues([...selected, ...searchIn], itemKey);
    setItems([...values]);
  }, [selected, searchIn]);

  // remove from list item and add to selected list
  const onSelectItem = (item) => {
    // avoid pushing more elements if onlyOne prop is selected
    if (onlyOne && selected.length === 1) {
      return;
    }
    setItems(items.filter((e) => e[itemKey] !== item[itemKey]));
    onSelect([...selected, item]);
  };

  // add to list item and remove from selected list
  const onDeleteItem = (item) => {
    setItems((prev) => [item, ...prev]);
    onSelect(selected.filter((e) => e[itemKey] !== item[itemKey]));
  };
  // TODO: finish search element
  const handleOnSearch = (element) => {};
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
            Solo se puede seleccionar un {title}
          </Typography>
        )}
        <TextField
          fullWidth
          value={searchText}
          onChange={handleOnSearch}
          label="Buscar"
        />
      </DialogContent>
      <DialogContent>
        <List>
          <ListItem button>
            <ListItemText
              onClick={() => navigate(`/log/${apiName}/add`)}
              className={classes.listText}
              primary={`Agregar ${title}`}
            />
          </ListItem>
          {items.slice(0, 5).map((el) => (
            <ListItem button onClick={() => onSelectItem(el)} key={el[itemKey]}>
              <ListItemText
                className={classes.listText}
                primary={el[textKey]}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => navigate(`/log/${apiName}/${el[itemKey]}`)}
                >
                  <Edit />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Drawer>
  );
};

SearchAdd.propTypes = {
  visible: PropTypes.array.isRequired,
  config: PropTypes.shape({
    selectedItems: PropTypes.any.isRequired,
    title: PropTypes.string.isRequired,
    searchIn: PropTypes.array,
    itemKey: PropTypes.string,
    textKey: PropTypes.string,
    onlyOne: PropTypes.bool,
    apiLink: PropTypes.string,
  }).isRequired,
};
export default SearchAdd;
