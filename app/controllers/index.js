const Movie = require('../models/movies');
// index page
exports.index = function(req,res){
	console.log('user in session');
	console.log(req.session.user);

	Movie.fetch((err, movies) => {
		if(err){
			console.log(err);
		}

		res.render('index', { // 返回首页
			title: 'immoc 首页' ,// 传递参数，替代占位符
			movies: movies
			/*movies: [{
				title: '机械战警',
				_id: 1,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title: '机械战警',
				_id: 2,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title: '机械战警',
				_id: 3,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title: '机械战警',
				_id: 4,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title: '机械战警',
				_id: 5,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title: '机械战警',
				_id: 6,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			},
			{
				title: '机械战警',
				_id: 7,
				poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
			}
			]*/
		});
	});
};
// app.get('/', (req, res) => {

// });