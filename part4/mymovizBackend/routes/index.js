var express = require('express');
var router = express.Router();
var request = require("sync-request")

var movieModel = require('../models/movies')



var myAPIKey = "09896954b2930ba0e46feee3e5e8a660"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Movies from TheMovieDB
router.get('/new-movies', function(req, res, next) {

  var requete = request("GET", "https://api.themoviedb.org/3/discover/movie?api_key="+ myAPIKey + "&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1");
  var dataAPI = JSON.parse(requete.body);
  res.json({movies: dataAPI.results})
})

router.post('/wishlist-movie', async function(req, res , next) {


  // a ajouter avant les liens des images
  // https://image.tmdb.org/t/p/w500

  
  var newMovie = new movieModel({
    movieName: req.body.name,
    movieImg: req.body.img,
  })
  await newMovie.save();


  // var result = false;
  // if(movieSave.movieName){
  //   result = true;
  // }
  // console.log(result)
  
  res.json({result: true, newMovie});
})

router.delete('/wishlist-movie/:name', async function(req, res, next) {
  
  var film = await movieModel.findOne({movieName: req.params.name});
  
  var deleteMovie = await movieModel.deleteOne({movieName: req.params.name});


  res.json({deleteMovie});
})

router.get('/wishlist-movie', async function (req, res, next) {

  var movieList = await movieModel.find();
  
  res.json({movieList});
});


module.exports = router;
