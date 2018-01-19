const Movie = require('../models/movies');
const _underscore = require('underscore');

// 详情页
exports.detail = function(req, res){
	var id = req.params.id;

	Movie.findById(id, (err, movie) => {
		res.render('detail', {
			title: 'zhou\'site: ' + movie.title, // 'Movie ' + movie.title + ' 详情',
			movie: movie
			/*movie: {
				doctor: 'zhou',
				country: 'china',
				title: 'hehhe',
				year: 2014,
				flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
				language: 'chinese',
				summary: 'dwhduwhduwhdwd氮化物氮化物氮化物氮化物'
			}*/
		});
	});
};
//后台录入页admin 
exports.new = function(req, res){
	res.render('admin', {
		title: 'immoc 后台录入页',
		movie: {
			title: '',
			doctor: '',
			country: '',
			year: '',
			poster: '',
			flash: '',
			summary: '',
			language: ''

		}
	});
};

// admin update movie
exports.update = function(req, res){
	var id = req.params.id;

	if(id){
		Movie.findById(id, (err, movie) => {
			res.render('admin', {
				titel: 'zhouSite 后台更新页',
				movie: movie
			});
		});
	}
};

// admin post movie
exports.save = function(req, res){
	console.log('body:', req.body);
	var id = req.body.movie._id;
	console.log('id: ', id);
	var movieObj = req.body.movie;
	var _movie;

	if(id !=='') { // 根据报错排查问题'Cast to ObjectId failed for value "" at path "_id" for model "Movie"'
		Movie.findById(id, (err ,movie) => {
			if(err){
				console.log(err);
			}

			_movie = _underscore.extend(movie, movieObj);
			_movie.save((err, movie) => {
				if(err){
					console.log(err);
				}

				res.redirect('/movie/' + movie._id);
			});
		});
	}else{
		_movie = new Movie({
			doctor: movieObj.doctor,
			title: movieObj.title,
			country: movieObj.country,
			language: movieObj.language,
			year: movieObj.year,
			poster: movieObj.poster,
			summary: movieObj.summary,
			flash: movieObj.flash,
		});

		_movie.save((err, movie) => {
			if(err){
				console.log(err);
			}

			res.redirect('/movie/' + movie._id);
		});
	}
};

//moive列表页list
exports.list = function(req, res){
	Movie.fetch((err ,movies) => {
		if(err){
			console.log(err);
		}
		res.render('list', {
			title: 'zhou\'site 列表页',
			movies: movies
			/*movies: [{
				title: '机械战警',
				_id: 1,
				country: 'china',
				year: 2014,
				doctor: 'zhou'
			}]	*/	
		});

	});
};

// list delete movie
exports.del = function(req, res){
	var id = req.query.id;

	if(id){
		Movie.remove({_id: id}, (err, movie) => {
			if(err){
				console.log(err);
			}else{
				res.json({success: 1});
			}
		});
	}
};	