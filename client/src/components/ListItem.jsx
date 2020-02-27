import React from "react";

function ListItem(props) {
  return (
    <li onClick={() => props.handleClick(props.option)} className="listItem">
      {props.option[0]}
    </li>
  );
}

export default ListItem;
