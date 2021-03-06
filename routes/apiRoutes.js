
var db = require("../models");
var cheerio = require("cheerio");
var request = require("request");

module.exports = function (app) {
    app.get("/comments/:id", function (req, res) {
        console.log("getting comment's id " + req.params.id)

        db.ksl.find({ _id: req.params.id }, function (err, data) {
            if (err) {
                console.log("Error shows: " + err);
            }
            // console.log(data);
        })
            // ..and populate all of the notes associated with it
            .populate("comment")
            .then(function (kslComment) {
                console.log("kslComment" + kslComment)
                var hbsObject = {
                    comments: kslComment
                };
                return kslComment;
            })
    })


    app.post("/api/addComment/:id", function (req, res) {
        var commentObj = req.body;
        // console.log(req.body);
        // console.log("req.params.id" + req.params.id)
        db.comment.create({ comment_text: commentObj.comment_text }).then(function (result) {
            // console.log("Comment has been added.");
            // console.log("app.post .then comment input" + result)
            // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
            // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
            // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
            db.ksl.update({ _id: req.params.id }, { $push: { comment: result._id } }, { new: true })
                .then(function (results) {
                    // console.log(results);
                })
        })
    })

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
                    // console.log(data)
                    if (data.length < 1) {
                        db.ksl.create({ title: result.title, description: result.description, url: result.url })
                            .then(function (kslComment) {
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
