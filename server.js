var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Require all models
var db = require("./models");

// Initialize Express
var app = express();

// Configure middleware

// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

var domain = "https://www.reddit.com/"

// Make a request call to grab the HTML body from the site of your choice
request(domain, function (error, response, html) {

    // Load the HTML into cheerio and save it to a variable
    // '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
    var $ = cheerio.load(html);

    // An empty array to save the data that we'll scrape
    var results = [];

    // Select each element in the HTML body from which you want information.
    // NOTE: Cheerio selectors function similarly to jQuery's selectors,
    // but be sure to visit the package's npm page to see how it works
    $("h2.s5kz2p-0").each(function (i, element) {

        var link = $(element).parent().attr("href");
        var title = $(element).text();

        // Save these results in an object that we'll push into the results array we defined earlier
        results.push({
            title: title,
            link: domain + link
        });
    });

    // Log the results once you've looped through each of the elements found with cheerio
    console.log(results);

});

app.get("/notes", function (req, res) {
    // Find all Notes
    db.Note.find({})
        .then(function (dbNote) {
            // If all Notes are successfully found, send them back to the client
            res.json(dbNote);
        })
        .catch(function (err) {
            // If an error occurs, send the error back to the client
            res.json(err);
        });
});

app.listen(3000, function () {
    console.log("App running on port 3000!");
});