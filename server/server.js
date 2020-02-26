const express = require("express");
const app = express();
const path = require("path");
const axios = require("axios");
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.static(path.join(__dirname, "../client/dist")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/searchCity", (req, res) => {
  const city = req.query.city;
  axios
    .get(`https://api.teleport.org/api/cities/?search=${city}`)
    .then(data => {
      const cityUrl =
        data.data._embedded["city:search-results"][0]._links["city:item"].href;
      return axios.get(cityUrl).then(data => {
        const scoreUrl = data.data._links["city:urban_area"].href;
        return axios.get(scoreUrl).then(data => {
          const finalUrl = data.data._links["ua:scores"].href;
          return axios
            .get(finalUrl)
            .then(data => res.send(data.data.categories));
        });
      });
    });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
