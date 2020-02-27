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
  const href = req.query.href;
  console.log(href);

  //   axios
  //     .get(`https://api.teleport.org/api/cities/?search=${city}`)
  //     .then(data => {
  //       const cityUrl =
  //         data.data._embedded["city:search-results"][0]._links["city:item"].href;
  //       return axios.get(cityUrl).then(data => {
  //         const scoreUrl = data.data._links["city:urban_area"].href;
  //         return axios.get(scoreUrl).then(data => {
  //           const finalUrl = data.data._links["ua:scores"].href;
  //           return axios
  //             .get(finalUrl)
  //             .then(data => res.send(data.data.categories));
  //         });
  //       });
  //     });

  axios.get(href).then(data => {
    const cityUrl = data.data._links["city:urban_area"].href;
    return axios.get(cityUrl).then(data => {
      const scoresUrl = data.data._links["ua:scores"].href;
      return axios.get(scoresUrl).then(data => res.send(data.data.categories));
    });
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
