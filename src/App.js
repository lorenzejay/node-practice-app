const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forecast = require("./utlis/forecast");
const geocode = require("./utlis/geocode");
const { request } = require("http");
const app = express();

//defining paths for express confg
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views"); //customizing the folder name for views
const partialsPath = path.join(__dirname, "../templates/partials");

console.log(partialsPath);

// setup handlebars
app.set("view engine", "hbs"); // setting handlebars up for views folder / default if you used the folder as views
app.set("views", viewsPath); //views path
hbs.registerPartials(partialsPath); // partials path

//setup static directory
app.use(express.static(publicDirectoryPath)); //static site

// configures resources at a specific route
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Lorenze Jay",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Lorenze Jay",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    description: "We are here to help you",
    title: "Help",
    name: "Lorenze Jay",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must put an address",
    });
  } else {
    geocode(address, (error, { latitude, longtitude, location } = {}) => {
      // data is an object

      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longtitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        } else {
          res.send({
            forecast: forecastData,
            location: location,
            address: address,
          });
        }
      });
    });
  }
});

app.get("/products", (req, res) => {
  console.log(req.query.search);
  if (!req.query.search) {
    return res.send({
      errorMessage: "Page not found",
    });
  } else {
    res.send({
      products: [],
    });
  }
});

//creating 404 pages
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Lorenze Jay ",
  });
});

// '*' needs to be the very last app.get
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found.",
    name: "Lorenze Jay ",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
