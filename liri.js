const dotenv = require("dotenv").config();

var Spotify = require('node-spotify-api');

const keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);


var axios = require("axios");
var moment = require('moment');

var fs = require('fs');

const preset = process.argv[2];
var nodeArgs = process.argv;
var entry = "";

for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      entry = entry + "+" + nodeArgs[i];
    } else {
      entry += nodeArgs[i];
  
    }
  }
  


switch(preset) {
    
    case('concert-this'):
    getBandInfo(entry);
    break;

    case('spotify-this-song'):
    if(entry){
    spotifySong(entry);    
    } 
    else{
        spotifySong("Ace-of-Base");
    }
    break;

    case('movie-this'):
    if(entry){
        movieOMBD(entry);
    }
    else{
        movieOMBD("Mr.Nobody");
    }
    break;

    case('do-what-it-says'):
    doThat();
    break;

    default:
        console.log('Invalid. Try again!');
};

function getBandInfo(entry) {
// concert-this

let queryURL = "https://rest.bandsintown.com/artists/" + entry + "/events?app_id=codingbootcamp";

axios.get(queryURL).then(
    function(response) {   
        //name of Venue
        console.log("Venue name: " + response.data[0].venue.name)
        //location of venue
        console.log("Location of Venue: " + response.data[0].venue.country)
        //time of venue
        var time = response.data[0].datetime
        var date = moment(time).format('MM/DD/YYYY')

        console.log("Venue Time: " + date)
    }
)
.catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Headers---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  });

}

function spotifySong(entry){
//// spotify-this-song

spotify.search({ type: 'track', query: entry, limit: 1}, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // artist's name
    let song = data.tracks.items[0]
    console.log("Artist Name: " + song.artists[0].name)
    // the song's name
    console.log("Name of Song: " + song.name)
    // preview link of the song from Spotify
    console.log("Preview link: " + song.album.external_urls.spotify)
    //Album that the song is playing from
    console.log("Album: " + song.album.name)

})
}

function movieOMBD(entry){
    //movie-this

    var movieURL = "http://www.omdbapi.com/?t=" + entry + "&apikey=trilogy&y=&plot=short&tomatoes=true";

    axios.get(movieURL).then(
        function(response) {
            var movie = response.data;
            
            //title of movie
            console.log("\nTitle: " + movie.Title)
            //Year of movie
            console.log("Year: " + movie.Released)
            //IMDB rating
            console.log("IMDB Rating: " + movie.Ratings[0].Value)
            //Rotten Tomatoes Rating
            console.log("Rotten Tomatoes: " + movie.Ratings[1].Value)
            //Country that movie was produced
            console.log("Produced in: " + movie.Country)
            //plot of the movie
            console.log("Plot: " + movie.Plot)
            //Actors in the movie
            console.log("Actors: " + movie.Actors) 
            
            if(entry === "Mr.Nobody"){
            console.log("\n----------------------------------------------------------------------------------------------------------------")
            console.log("\nIf you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/. \n\nIt's on Netflix!")
        }
        })
    .catch(function(error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("---------------Data---------------");
          console.log(error.response.data);
          console.log("---------------Status---------------");
          console.log(error.response.status);
          console.log("---------------Headers---------------");
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an object that comes back with details pertaining to the error that occurred.
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);

       
      });
}

function doThat(){
    fs.readFile('random.txt', "utf8", function(error,data){
        var text = data.split(',');

        spotifySong(text[1])

    })
}






