const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const timeout = require('connect-timeout');


const animeRoutes = require('./routes/animeRoutes');

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
//Anime Routes
app.use(animeRoutes);

// 404 Error
app.use((req,res)=>{
    res.render('404',{title: "404 Page Not Found", season: ""});
});