// Requiring path to so we can use relative routes to our HTML files
// var path = require("path");
var db = require("../models");

module.exports = function (app) {

    app.get("/", function (req, res) {
        db.ksl.find({}, function (err, data) {
            // res.json(data);
            var hbsObject = {
                news: data
            };
            res.render("index", hbsObject);
        })
    });

    // app.get("/adventureDetails/:id", function (req, res) {
    //     db.Adventures.findOne({ where: { id: req.params.id } }).then(function (dbAdventure) {
    //         console.log("Have i hit this line", dbAdventure);

    //         res.render("index", dbAdventure.dataValues);

    //     });

    // });

};

// var db = require("../models");

// module.exports = function(app) {
//   // Load index page
//   app.get("/", function(req, res) {
//     db.Example.findAll({}).then(function(dbExamples) {
//       res.render("index", {
//         msg: "Welcome!",
//         examples: dbExamples
//       });
//     });
//   });

//   // Load example page and pass in an example by id
//   app.get("/example/:id", function(req, res) {
//     db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
//       res.render("example", {
//         example: dbExample
//       });
//     });
//   });

//   // Render 404 page for any unmatched routes
//   app.get("*", function(req, res) {
//     res.render("404");
//   });
// };