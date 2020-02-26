import React from "react";

function ListItem(props) {
  return (
    <li onClick={() => props.handleClick(props.option[1])}>
      {props.option[0]}
    </li>
  );
}

export default ListItem;
