const Comment = require('../models/comment');
const _underscore = require('underscore');

// comment
exports.save = function(req, res){
	let _comment = req.body.comment;
	let movieId = _comment.movie;
	
	let comment = new Comment(_comment);

	comment.save((err, comment) => {
		if(err){
			console.log(err);
		}

		res.redirect('/movie/' + movieId);
	});
};

