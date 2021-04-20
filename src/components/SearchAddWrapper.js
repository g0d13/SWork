import React from "react";
import { Add } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import SearchAdd from "./SearchAdd";

const SearchAddWrapper = (props) => {
  const [show, setShow] = props.show;
  const selectedItems = props.selectedItems;

  return (
    <React.Fragment>
      <IconButton
        color="primary"
        component="span"
        onClick={() => setShow(!show)}
      >
        <Add />
      </IconButton>
      <SearchAdd
        visible={props.show}
        selectedItems={selectedItems}
        config={props.config}
      />
    </React.Fragment>
  );
};
export default SearchAddWrapper;
