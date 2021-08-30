const mongoose = require('mongoose');
const { double } = require('webidl-conversions');
const Schema = mongoose.Schema;

const animeSchema = new Schema({
    title:{
        type: String,
        requred: true
    },
    score:{
        type: Number,
        required: true,
    },
    imgUrl: String,
    season:{
        type: String,
        required: true
    }
}, {timestamps: true})

const Anime = mongoose.model('Anime', animeSchema);
module.exports = Anime;