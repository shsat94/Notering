const mongoose = require('mongoose');

const mongoURI="mongodb://localhost:27017/notering";

const connectToMongo =async ()=>{
    mongoose.connect(mongoURI);
}

module.exports =connectToMongo