const mongoose = require('mongoose');
const MovieSchema = require('../schemas/movies');
const movie = mongoose.model('Moive', MovieSchema);

module.exports=Movie;