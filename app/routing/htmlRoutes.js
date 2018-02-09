// two get routes 
//one for survery and one for the home page
//these routes send my static html to the browser 

//Dependencies
//=================================================
var path = require("path");

//exports to module
//===================================================
module.exports = function(app) {

    //HTML routes to send my static HTML to web pages

    //home
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    //survery file
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
}

