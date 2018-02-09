//Dependency
//===========================
var path = require("path");

//export from friend array
var friendsArray = require("../data/friends.js");
//variable total difference to find friend

//exporting to the server.js file to send two routes
module.exports = function (app) {
    //displays our friendsArray with possible friend matches (array of objects)
    app.get("/api/friends", function(req,res) {
        return res.json(friendsArray); 
    });

    //handle incoming friend obj from survery, push that friend in friendArray
    //send back most compatible match with that friend 
    app.post("/api/friends", function (req,res){
        //business logic to push new friend in array and find most compatiable friend for them
        var bestMatch = {
            name: "",
            photo: "",
            matchDiff: 0
        }
        var newFriend = req.body;
        console.log("New Friend:" + newFriend);

        var friendName = newFriend.name;
        var friendPhoto = newFriend.photo;
        var friendScores = newFriend.scores;

        var totalDiff = 0;
        var currentDiff = 0;

        bestMatch = friendsArray[0];

        console.log("Friends Array:" + friendsArray);

        for (var i=0; i < friendsArray.length; i++) {

            for (var j=0; j < friendsArray[i].scores.length; j++) {
               //reset the totalDiff so that it does not concatenate precious totalDiff from the previous friend
               totalDiff = 0;
               totalDiff += Math.abs(friendScores[j] - friendsArray[i].scores[j]);
               console.log(totalDiff); 
            }

            if (i === 0) {
                currentDiff = totalDiff;
            }           
            else {
                console.log("current diff: ", currentDiff);
                console.log("total diff", totalDiff);
                if (currentDiff > totalDiff) {
                    currentDiff = totalDiff;
                    bestMatch = friendsArray[i];
                }
            }
        }

  
        
        friendsArray.push(newFriend);
        console.log("Best Match:" + bestMatch.name);
        res.json(bestMatch);

        
    });
}
