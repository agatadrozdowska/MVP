import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SearchBar from "./components/SearchBar.jsx";
import Scores from "./components/Scores.jsx";
import Dropdown from "./components/Dropdown.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCity: "",
      data: [],
      options: [],
      href: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleListItemClick = this.handleListItemClick.bind(this);
  }

  handleInputChange(event) {
    this.setState({ currentCity: event.target.value }, () => {
      axios
        .get(
          `https://api.teleport.org/api/cities/?search=${this.state.currentCity}`
        )
        .then(data => {
          const searchResults = data.data._embedded["city:search-results"];
          const arrayOfResults = [];
          searchResults.forEach(item => {
            arrayOfResults.push([
              item["matching_full_name"],
              item._links["city:item"].href
            ]);
          });
          this.setState({ options: arrayOfResults });
        });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios
      .get("/searchCity", { params: { city: this.state.currentCity } })
      .then(data => {
        this.setState({ data: data.data });
      });
  }

  handleListItemClick(option) {
    this.setState({ href: option });
    //console.log("hello");
  }

  render() {
    return (
      <div>
        <h2>My App</h2>
        <div className="main-container">
          <div>
            <SearchBar
              handleInputChange={this.handleInputChange}
              handleSubmit={this.handleSubmit}
            />
            <Dropdown
              options={this.state.options}
              handleClick={this.handleListItemClick}
            />
            <Scores data={this.state.data} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
