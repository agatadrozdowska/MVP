import React from "react";
import ReactDOM from "react-dom";

function SearchBar(props) {
  return (
    <form action="" onSubmit={props.handleSubmit}>
      <input type="text" onChange={props.handleInputChange} />
    </form>
  );
}

export default SearchBar;
