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

  axios.get(href).then(data => {
    const cityUrl = data.data._links["city:urban_area"].href;
    return axios.get(cityUrl).then(data => {
      const scoresUrl = data.data._links["ua:scores"].href;
      return axios.get(scoresUrl).then(data => res.send(data.data.categories));
    });
  });
});

app.get("/getImage", (req, res) => {
  const href = req.query.href;
  axios.get(href).then(data => {
    const cityUrl = data.data._links["city:urban_area"].href;
    return axios.get(cityUrl).then(data => {
      const imageUrl = data.data._links["ua:images"].href;
      return axios.get(imageUrl).then(data => {
        res.send(data.data.photos[0].image.web);
      });
    });
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
