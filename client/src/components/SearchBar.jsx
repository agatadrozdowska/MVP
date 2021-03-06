import React from "react";
import ReactDOM from "react-dom";

function SearchBar(props) {
  return (
    <form action="" onSubmit={props.handleSubmit}>
      <input
        type="text"
        placeholder="Enter city..."
        value={props.currentCity}
        onChange={props.handleInputChange}
        className="searchbar"
      />
    </form>
  );
}

export default SearchBar;
