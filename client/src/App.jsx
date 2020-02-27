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
      firstCurrentCity: "",
      firstCityData: [],
      firstCityOptions: [],
      href: ""
    };
    this.handleInputChangeFirstCity = this.handleInputChangeFirstCity.bind(
      this
    );
    this.handleSubmitFirstCity = this.handleSubmitFirstCity.bind(this);
    this.handleListItemClickFirstCity = this.handleListItemClickFirstCity.bind(
      this
    );
  }

  handleInputChangeFirstCity(event) {
    this.setState({ firstCurrentCity: event.target.value }, () => {
      axios
        .get(
          `https://api.teleport.org/api/cities/?search=${this.state.firstCurrentCity}`
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
          this.setState({ firstCityOptions: arrayOfResults });
        });
    });
  }

  handleSubmitFirstCity(event) {
    event.preventDefault();
    this.setState({ firstCityOptions: [] }, () => {
      axios
        .get("/searchCity", { params: { href: this.state.href } })
        .then(data => {
          this.setState({ firstCityData: data.data });
        });
    });
  }

  handleListItemClickFirstCity(option) {
    this.setState({ href: option[1], firstCurrentCity: option[0] }, () => {
      this.handleSubmitFirstCity(event);
    });
  }

  render() {
    return (
      <div>
        <h2>My App</h2>
        <div className="main-container">
          <div>
            <SearchBar
              handleInputChange={this.handleInputChangeFirstCity}
              handleSubmit={this.handleSubmitFirstCity}
              currentCity={this.state.firstCurrentCity}
            />
            <Dropdown
              options={this.state.firstCityOptions}
              handleClick={this.handleListItemClickFirstCity}
            />
            <Scores data={this.state.firstCityData} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
