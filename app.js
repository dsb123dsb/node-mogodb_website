/**
 * Created by Administrator on 2017/5/17.
 * 伪造模板数据跑通前后端交互流程
 */

const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');  // 设置路径
const port = process.env.PORT || 3000; // 设置端口号，默认3000，process为全局变量，命令PORT=4000 node app.js传入 并启动
const app = express(); //启动一个服务器

app.set('views', './views/pages'); // 设置视图默认目录

app.set('view engine', 'pug'); // 设置默认模板引擎pug, 模板文件后缀保持统一
app.use(bodyParser.urlencoded({extended: true}))//将表单数据 编码解析
app.use(bodyParser.json());
//body-parser不在和express打包在一起，要单独安装 app.use(express.bodyParser()); // 表单数据格式化
app.use(express.static(path.join(__dirname, 'bower_components'))); // 静态文件
app.listen(port); //监听端口

console.log('website started on port '+ port); // 监听成功打印信息

//路由编写 

// index page
app.get('/', (req, res) => {
	res.render('index', { // 返回首页
		title: 'immoc 首页' ,// 传递参数，替代占位符
		movies: [{
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
		]
	});
});

// 详情页
app.get('/movie/:id', (req, res) => {
	res.render('detail', {
		title: 'zhou', // 'Movie ' + movie.title + ' 详情',
		movie: {
			doctor: 'zhou',
			country: 'china',
			title: 'hehhe',
			year: 2014,
			flash: 'http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf',
			language: 'chinese',
			summary: 'dwhduwhduwhdwd氮化物氮化物氮化物氮化物'
		}
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
//列表页list
app.get('/admin/list', (req, res) => {
	res.render('list', {
		title: 'immoc 列表页',
		movies: [{
			title: '机械战警',
			_id: 1,
			country: 'china',
			year: 2014,
			doctor: 'zhou'
		}]		
	});
});