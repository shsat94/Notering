const mongoose = require('mongoose');

const mongoURI="mongodb+srv://shsat94:Satyarth23$Siri@notering.dig1k.mongodb.net/";

const connectToMongo =async ()=>{
    mongoose.connect(mongoURI);
}

module.exports =connectToMongo