
var db = require("../models");
var cheerio = require("cheerio");
var request = require("request");

module.exports = function (app) {
    app.get("/scrape", function (req, res) {
        var domain = "https://www.ksl.com"

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
            $(".headline").each(function (i, element) {

                var url = $(element).find("h2").find("a").attr("href");
                var title = $(element).find("h2").find("a").text();
                var description = $(element).find("h5").text()

                results.push({
                    title: title,
                    description: description,
                    url: domain + url
                });
            });
            results.forEach(function (result) {
                // console.log(result.title)
                db.ksl.find({ title: result.title }, function (err, data) {
                    console.log(data)
                    if (data.length < 1) {
                        db.ksl.create({ title: result.title, description: result.description, url: result.url })
                            .then(function (dbArticle) {
                            })
                    } else {
                        console.log("there's a duplicate")
                    }
                })

            });

        });
        res.end();

    })



};
