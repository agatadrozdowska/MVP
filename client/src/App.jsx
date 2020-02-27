import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import SearchBar from "./components/SearchBar.jsx";
import Bar from "./components/Scores.jsx";
import Dropdown from "./components/Dropdown.jsx";
import BarChart from "./components/Scores.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCity: "",
      data: [],
      labels: [],
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
      .get("/searchCity", { params: { href: this.state.href } })
      .then(data => {
        const dataArray = [];
        const labelsArray = [];
        data.data.forEach(obj => {
          dataArray.push(obj["score_out_of_10"]);
          labelsArray.push(obj.name);
        });
        this.setState({ data: dataArray, labels: labelsArray, options: [] });
      });
  }

  handleListItemClick(option) {
    this.setState({ href: option[1], currentCity: option[0] }, () => {
      this.handleSubmit(event);
    });
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
              currentCity={this.state.currentCity}
            />
            <Dropdown
              options={this.state.options}
              handleClick={this.handleListItemClick}
            />
            <BarChart data={this.state.data} labels={this.state.labels} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
