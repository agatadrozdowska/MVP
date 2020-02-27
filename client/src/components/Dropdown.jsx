import React from "react";
import ReactDOM from "react-dom";
import ListItem from "./ListItem.jsx";

function Dropdown(props) {
  return (
    <ul className="dropdown">
      {props.options.map((option, index) => {
        return (
          <ListItem
            key={index}
            option={option}
            handleClick={props.handleClick}
          />
        );
      })}
    </ul>
  );
}

export default Dropdown;
