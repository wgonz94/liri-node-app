const dotenv = require("dotenv").config();

var Spotify = require('node-spotify-api');

const keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var fs = require('fs');

const preset = process.argv[2];
const entry = process.argv[3];

switch(preset) {
    
    case('concert-this'):
    getBandInfo(entry);
    break;

    case('spotify-this-song'):
    if(entry){
    spotifySong(entry);    
    } 
    else{
        spotifySong("The Sign");
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

function getBandInfo() {
// concert-this

let queryURL = "https://rest.bandsintown.com/artists/" + entry + "/events?app_id=codingbootcamp";

axios.get(queryURL).then(
    function(response) {
        //name of Venue
        console.log(response.data[0].venue.name)
        //location of venue
        console.log(response.data[0].venue.country)
        //time of venue
        console.log(response.data[0].datetime)
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

function spotifySong(){
//// spotify-this-song

spotify.search({ type: 'track', query: entry }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    // artist's name
    console.log(data.tracks.items[0].album.artists)
    
    // the song's name
    console.log(data.tracks.items[0].album.name)
    // preview link of the song from Spotify
    console.log(data.tracks.items[0].album.external_urls.spotify)
    //Album that the song is playing from
    console.log(data.tracks.items[0].album.external_urls.name)



})


}

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from




