/**
 * Created by Administrator on 2017/5/17.
 * 伪造模板数据跑通前后端交互流程
 */

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // 设置路径
const mongoose = require('mongoose');
const _underscore = require('underscore');
const Movie = require('./models/movies');
const port = process.env.PORT || 3000; // 设置端口号，默认3000，process为全局变量，命令PORT=4000 node app.js传入 并启动
const app = express(); //启动一个服务器

mongoose.connect('mongodb://localhost/node-mongodb_website');

app.set('views', './views/pages'); // 设置视图默认目录

app.set('view engine', 'pug'); // 设置默认模板引擎pug, 模板文件后缀保持统一
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));//将表单数据 编码解析,_id 是mongodb的默认主键
//body-parser不在和express打包在一起，要单独安装 app.use(express.bodyParser()); // 表单数据格式化
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件
app.locals.moment = require('moment');
app.listen(port); //监听端口

console.log('website started on port '+ port); // 监听成功打印信息

//路由编写 

// index page
app.get('/', (req, res) => {
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
});

// 详情页
app.get('/movie/:id', (req, res) => {
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
});
//后台录入页admin 
app.get('/admin/movie', (req, res) => {
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
});

// admin update movie
app.get('/admin/update/:id', (req, res) => {
	var id = req.params.id;

	if(id){
		Movie.findById(id, (err, movie) => {
			res.render('admin', {
				titel: 'zhouSite 后台更新页',
				movie: movie
			});
		});
	}
});

// admin post movie
app.post('/admin/movie/new', (req, res) => {
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
});

//列表页list
app.get('/admin/list', (req, res) => {
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
});

// list delete movie
app.delete('/admin/list', (req, res) => {
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
});