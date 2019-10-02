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





//// concert-this (Bands in Town API)
//Change to process.argv[3]

// let artist = process.argv[3];

// let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

// axios.get(queryURL).then(
//     function(response) {
//         //name of Venue
//         console.log(response.data[0].venue.name)
//         //location of venue
//         console.log(response.data[0].venue.country)
//         //time of venue
//         console.log(response.data[0].datetime)
//     }
// )
// .catch(function(error) {
//     if (error.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log("---------------Data---------------");
//       console.log(error.response.data);
//       console.log("---------------Status---------------");
//       console.log(error.response.status);
//       console.log("---------------Headers---------------");
//       console.log(error.response.headers);
//     } else if (error.request) {
//       // The request was made but no response was received
//       // `error.request` is an object that comes back with details pertaining to the error that occurred.
//       console.log(error.request);
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       console.log("Error", error.message);
//     }
//     console.log(error.config);
//   });

//// 

// Artist(s)
// The song's name
// A preview link of the song from Spotify
// The album that the song is from





