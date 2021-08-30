const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
var axios = require("axios").default;
const Anime = require('./models/anime');

require('dotenv').config();

//Middlewares
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));
app.use(timeout('100s'));

//Setting up view engine
app.set('view engine', 'ejs');
//static files
app.use(express.static('public'));

const dbURI='mongodb://migo:test1234@cluster0-shard-00-00.otykp.mongodb.net:27017,cluster0-shard-00-01.otykp.mongodb.net:27017,cluster0-shard-00-02.otykp.mongodb.net:27017/task1?ssl=true&replicaSet=atlas-rwmsgo-shard-0&authSource=admin&retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result =>{
    app.listen(process.env.PORT || 3000);
    console.log("Server Started");
  })
  .catch(err => console.log(err));


app.get('/', (req, res)=>{
    res.redirect('/spring');
});



app.get('/add-anime', (req,res)=>{
    res.render('add', {title: 'Add an Anime', season: "to be added"});
})


app.post('/anime', (req,res)=>{
    const anime= new Anime(req.body);
    anime.save()
    .then((result)=>{
        res.redirect('/anime');
    })
    .catch((error)=>{
        console.log(error);
    });
})

app.get('/anime', (req,res)=>{
    Anime.find()
    .then((result)=> {
        animeList=result;
        res.render('anime', {anime: animeList ,title:"Added Anime", season:"In Database"});
    })
    .catch((error)=> console.log(error));

})

app.get('/spring', (req, res)=>{

    var options = {
    method: 'GET',
    url: 'https://jikan1.p.rapidapi.com/season/2021/spring',
    headers: {
        'x-rapidapi-host': 'jikan1.p.rapidapi.com',
        'x-rapidapi-key': '082c38aeb2msh8e8a8ba6f7442ecp115048jsnf109175c3ec9'
        
    }
    };

    axios.request(options).then(function (response) {
        res.render('index', {anime: response.data.anime, title: "Home", season: "For Spring 2021"});
    }).catch(function (error) {
        console.error(error);
    });

    
    
});

app.get('/summer', (req, res)=>{

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

    
    
});

app.use((req,res)=>{
    res.render('404',{title: "404 Page Not Found", season: ""});
});