const express = require("express");
const app = express();
const multer = require("multer");
const fetch = require("node-fetch");
const path = require("path");
const key = "641c328a713ad00d";
const upload = multer();
const redis = require('redis'); 
let host = process.env.REDIS_PORT_6379_TCP_ADDR || '192.168.99.100';
let port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
let client = redis.createClient(port, host);
console.log(process.env.REDIS_PORT_6379_TCP_ADDR + ':' + process.env.REDIS_PORT_6379_TCP_PORT);
app.use(express.static(path.join(__dirname)));
app.use("/scripts", express.static(__dirname + "/public"));
app.get("/weather", (req, res) => {
  res.sendFile(path.join(__dirname, "views/index.html"));
});
app.get('/', (req, res) => {    
    res.status(200).send(`<style>
    a.button {
    -webkit-appearance: button;
    -moz-appearance: button;
    appearance: button;
    padding:5px;
    border-radius:5px;

    text-decoration: none;
    color: initial;
}
.wrapper{
    margin:40px;
}
    </style><div class="wrapper" ><h1 >Last Week's weather micro service Landing Page</h1>
    <p>Get last Week's weather conditions using your browsers geo location</p>
    <a href="/weather" class="button">click here</a></div>`);
});
let date = new Date();
app.post("/weather", upload.fields([]), (req, res) => {
  let formData = JSON.parse(req.body.json);
  console.log(formData.lastWeek);
  console.log("latitude", formData.latitude);
  console.log("logitude", formData.longitude);
  if (formData.type) {
    let urls = [];
    let date = formData.lastWeek;
    let days = +date.substr(6, 7);
    if (days + 5 < 29) {
      date = +date;
      let limit = 6;
      while (--limit) {
        date += 1;
        urls.push(
          `https://api.wunderground.com/api/${key}/history_${date}/geolookup/q/${formData.latitude},${formData.longitude}.json`
        );
      }
    }
    Promise.all(
      urls.map(url => fetch(url).then(resp => resp.json()))
    ).then(formated => {
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(formated, null, 3));
    });
  } else {
    fetch(
      `https://api.wunderground.com/api/${key}/history_${formData.lastWeek}/geolookup/q/${formData.latitude},${formData.longitude}.json`,
      { method: "GET" }
    )
      .then(response => response.json())
      .then(formated => {
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(formated, null, 3));
      });
  }
});

app.listen(process.env.PORT || 8181);
