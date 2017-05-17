/**
 * Created by Administrator on 2017/5/17.
 * 伪造模板数据跑通前后端交互流程
 */

const express = require('express');
const port = process.env.PORT || 3000; // 设置端口号，默认3000，process为全局变量，命令PORT=4000 node app.js传入 并启动
const app = express(); //启动一个服务器

app.set('views', './views'); // 设置视图默认目录
app.set('view engine', 'pug'); // 设置默认模板引擎pug, 模板文件后缀保持统一
app.listen(port); //监听端口

console.log('website started on port '+ port); // 监听成功打印信息

//路由编写 

// index page
app.get('/', (req, res) => {
	res.render('index', { // 返回首页
		title: 'immoc 首页' // 传递参数，替代占位符
	});
});

// 详情页
app.get('/movie/:id', (req, res) => {
	res.render('detail', {
		title: 'immoc 详情页' 
	});
});
//后台录入页admin 
app.get('/admin/movie', (req, res) => {
	res.render('admin', {
		title: 'immoc 后台录入页'
	});
});
//列表页list
app.get('/admin/list', (req, res) => {
	res.render('list', {
		title: 'immoc 列表页'
	});
});