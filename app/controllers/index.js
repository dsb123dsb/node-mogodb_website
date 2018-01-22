const Movie = require('../models/movies');
const Category = require('../models/category');
// index page
exports.index = function(req,res){
	// console.log('user in session');
	// console.log(req.session.user);

	Movie.fetch((err, movies) => {
		Category
			.find({})
			.populate({path: 'movies', options: {limit: 5}})
			.exec((err, categories)=>{
				if(err){
					console.log(err);
				}
				res.render('index', { // 返回首页
					title: 'immoc 首页' ,// 传递参数，替代占位符
					categories: categories
					/*movies: [
					{
						title: '机械战警',
						_id: 7,
						poster: 'http://r3.ykimg.com/05160000530EEB63675839160D0B79D5'
					}
					]*/
				});		
			});
	});
};
// app.get('/', (req, res) => {

// });