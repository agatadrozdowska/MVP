import React from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar.jsx";
import Scores from "./components/Scores.jsx";
import Dropdown from "./components/Dropdown.jsx";
import CityName from "./components/CityName.jsx";
import Image from "./components/Image.jsx";
import TotalScore from "./components/TotalScore.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCurrentCity: "",
      secondCurrentCity: "",
      firstSelectedCity: "",
      secondSelectedCity: "",
      firstCityData: [],
      secondCityData: [],
      firstCityOptions: [],
      secondCityOptions: [],
      firstCityHref: "",
      secondCityHref: "",
      firstCityImage: "",
      secondCityImage: ""
    };
    this.handleInputChangeFirstCity = this.handleInputChangeFirstCity.bind(
      this
    );
    this.handleInputChangeSecondCity = this.handleInputChangeSecondCity.bind(
      this
    );
    this.handleSubmitFirstCity = this.handleSubmitFirstCity.bind(this);
    this.handleSubmitSecondCity = this.handleSubmitSecondCity.bind(this);
    this.handleListItemClickFirstCity = this.handleListItemClickFirstCity.bind(
      this
    );
    this.handleListItemClickSecondCity = this.handleListItemClickSecondCity.bind(
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

  handleInputChangeSecondCity(event) {
    this.setState({ secondCurrentCity: event.target.value }, () => {
      axios
        .get(
          `https://api.teleport.org/api/cities/?search=${this.state.secondCurrentCity}`
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
          this.setState({ secondCityOptions: arrayOfResults });
        });
    });
  }

  handleSubmitFirstCity(event) {
    event.preventDefault();
    this.setState({ firstCityOptions: [] }, () => {
      axios
        .get("/searchCity", { params: { href: this.state.firstCityHref } })
        .then(data => {
          this.setState({
            firstCityData: data.data
          });
        });
      axios
        .get("/getImage", { params: { href: this.state.firstCityHref } })
        .then(data => this.setState({ firstCityImage: data.data }));
    });
  }

  handleSubmitSecondCity(event) {
    event.preventDefault();
    this.setState({ secondCityOptions: [] }, () => {
      axios
        .get("/searchCity", { params: { href: this.state.secondCityHref } })
        .then(data => {
          this.setState({ secondCityData: data.data });
        });
      axios
        .get("/getImage", { params: { href: this.state.secondCityHref } })
        .then(data => this.setState({ secondCityImage: data.data }));
    });
  }

  handleListItemClickFirstCity(option) {
    this.setState(
      {
        firstCityHref: option[1],
        firstCurrentCity: option[0],
        firstSelectedCity: option[0]
      },
      () => {
        this.handleSubmitFirstCity(event);
      }
    );
  }

  handleListItemClickSecondCity(option) {
    this.setState(
      {
        secondCityHref: option[1],
        secondCurrentCity: option[0],
        secondSelectedCity: option[0]
      },
      () => {
        this.handleSubmitSecondCity(event);
      }
    );
  }

  render() {
    return (
      <div>
        <h2>City Comparison</h2>
        <div className="main-container">
          <div className="left-container">
            <SearchBar
              handleInputChange={this.handleInputChangeFirstCity}
              handleSubmit={this.handleSubmitFirstCity}
              currentCity={this.state.firstCurrentCity}
            />
            <Dropdown
              options={this.state.firstCityOptions}
              handleClick={this.handleListItemClickFirstCity}
            />
            <CityName data={this.state.firstSelectedCity} />
            <TotalScore data={this.state.firstCityData} />
            <Image url={this.state.firstCityImage} />
            <Scores
              data={this.state.firstCityData}
              comparison={this.state.secondCityData}
            />
          </div>
          <div className="right-container">
            <SearchBar
              handleInputChange={this.handleInputChangeSecondCity}
              handleSubmit={this.handleSubmitSecondCity}
              currentCity={this.state.secondCurrentCity}
            />
            <Dropdown
              options={this.state.secondCityOptions}
              handleClick={this.handleListItemClickSecondCity}
            />
            <CityName data={this.state.secondSelectedCity} />
            <TotalScore data={this.state.secondCityData} />
            <Image url={this.state.secondCityImage} />
            <Scores
              data={this.state.secondCityData}
              comparison={this.state.firstCityData}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
