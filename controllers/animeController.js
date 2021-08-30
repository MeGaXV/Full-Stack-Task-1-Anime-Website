var axios = require("axios").default;
const Anime = require('../models/anime');



const springAnime= (req,res) =>{
    var options = {
        method: 'GET',
        url: 'https://jikan1.p.rapidapi.com/season/2021/spring',
        headers: {
            'x-rapidapi-host': 'jikan1.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY
    
        }
        };
    
        axios.request(options).then(function (response) {
            res.render('index', {anime: response.data.anime, title: "Home", season: "For Spring 2021"});
        }).catch(function (error) {
            console.error(error);
        });
    
        
}

const summerAnime = (req,res)=>{
    var options = {
        method: 'GET',
        url: 'https://jikan1.p.rapidapi.com/season/2021/summer',
        headers: {
            'x-rapidapi-host': 'jikan1.p.rapidapi.com',
            'x-rapidapi-key': process.env.API_KEY
        }
        };
    
        axios.request(options).then(function (response) {
            res.render('index', {anime: response.data.anime, title: "Home", season: "For Summer 2021"});
        }).catch(function (error) {
            console.error(error);
        });
}

const animeDbFetch = (req, res)=>{
    Anime.find()
    .then((result)=> {
        animeList=result;
        res.render('anime', {anime: animeList ,title:"Added Anime", season:"In Database"});
    })
    .catch((error)=> console.log(error));
}

const addAnime = (req, res)=>{
    const anime= new Anime(req.body);
    anime.save()
    .then((result)=>{
        res.redirect('/anime');
    })
    .catch((error)=>{
        console.log(error);
    });
}

const animeForm = (req,res)=>{
    res.render('add', {title: 'Add an Anime', season: "to be added"});
}


module.exports = {
    springAnime,
    summerAnime,
    animeDbFetch,
    addAnime,
    animeForm
};